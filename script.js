// المتغيرات
const welcomeScreen = document.getElementById('welcome-screen');
const formScreen = document.getElementById('form-screen');
const searchScreen = document.getElementById('search-screen');
const saveBtn = document.getElementById('save-btn');
const searchBtn = document.getElementById('search-btn');
const resultsDiv = document.getElementById('search-results');

// التحقق إذا كان المستخدم قد سجل الدخول من قبل
if (localStorage.getItem('isLoggedIn')) {
  // تخطي شاشة الترحيب وشاشة تسجيل البيانات
  welcomeScreen.classList.add('hidden');
  formScreen.classList.add('hidden');
  searchScreen.classList.remove('hidden');
} else {
  // عرض شاشة الترحيب ثم الانتقال لشاشة تسجيل البيانات
  setTimeout(() => {
    welcomeScreen.classList.add('hidden');
    formScreen.classList.remove('hidden');
  }, 3000);
}

// تخزين البيانات عند الضغط على "حفظ"
saveBtn.addEventListener('click', () => {
  const userData = {
    name: document.getElementById('name').value,
    age: parseInt(document.getElementById('age').value, 10),
    gender: document.getElementById('gender').value,
    province: document.getElementById('province').value,
    beauty: parseInt(document.getElementById('beauty').value, 10),
    telegram: document.getElementById('telegram').value,
    instagram: document.getElementById('instagram').value,
    phone: document.getElementById('phone').value,
  };

  // إنشاء ملف JSON وحفظه
  const dataStr = JSON.stringify(userData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // إنشاء رابط للتنزيل
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user_data.json';
  a.click();

  // تحرير الموارد
  URL.revokeObjectURL(url);

  // تسجيل الدخول
  localStorage.setItem('isLoggedIn', true);
  formScreen.classList.add('hidden');
  searchScreen.classList.remove('hidden');
});

  // تخزين بيانات المستخدم وحالة تسجيل الدخول
  localStorage.setItem('userData', JSON.stringify(userData));
  localStorage.setItem('isLoggedIn', true);

  // الانتقال لشاشة البحث
  formScreen.classList.add('hidden');
  searchScreen.classList.remove('hidden');
});

// البحث عن مستخدم مشابه
searchBtn.addEventListener('click', () => {
  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
  let matchedUser = allUsers.find(user => {
    return (
      user.province === currentUser.province &&
      user.gender !== currentUser.gender &&
      ((currentUser.gender === 'ذكر' && user.age <= currentUser.age) ||
        (currentUser.gender === 'أنثى' && user.age >= currentUser.age))
    );
  });

  if (!matchedUser) {
    resultsDiv.innerText = 'لا يوجد مستخدم مطابق حاليًا.';
  } else {
    resultsDiv.innerHTML = `
      <p>الاسم: ${matchedUser.name}</p>
      <p>العمر: ${matchedUser.age}</p>
      <p>الجنس: ${matchedUser.gender}</p>
      <p>تلجرام: ${matchedUser.telegram}</p>
      <p>انستقرام: ${matchedUser.instagram}</p>
    `;
  }

  allUsers.push(currentUser);
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
});
