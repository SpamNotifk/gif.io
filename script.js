// المصفوفة الخاصة بمحافظات العراق
const provinces = [
    "بغداد", "البصرة", "نينوى", "اربيل", "كركوك", "النجف", 
    "كربلاء", "الأنبار", "ذي قار", "ديالى", "صلاح الدين", 
    "بابل", "المثنى", "القادسية", "ميسان", "واسط"
];

// تحميل المحافظات في القائمة
const provinceSelect = document.getElementById("province");
provinces.forEach(province => {
    const option = document.createElement("option");
    option.value = province;
    option.textContent = province;
    provinceSelect.appendChild(option);
});

// عرض الشاشة التالية
const showScreen = (screenId) => {
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
    document.getElementById(screenId).classList.remove("hidden");
};

// بدء التطبيق
setTimeout(() => showScreen("form-screen"), 2000);

// تخزين المعلومات
const form = document.getElementById("user-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInfo = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        province: document.getElementById("province").value,
        beauty: parseInt(document.getElementById("beauty").value),
        telegram: document.getElementById("telegram").value,
        instagram: document.getElementById("instagram").value,
        phone: document.getElementById("phone").value,
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    alert("تم حفظ بياناتك بنجاح!");
    showScreen("search-screen");
});

// البحث عن الشريك
document.getElementById("search-btn").addEventListener("click", () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) return alert("يرجى إدخال بياناتك أولاً.");

    const results = `شريك محتمل من محافظة ${userInfo.province} مطابقة للمعايير.`;
    document.getElementById("search-results").textContent = results;
});
