
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور لتحسين الأداء
            }
        });
    }, { threshold: 0.1 }); // يتم تفعيل الرصد عندما يظهر 10% من القسم

    sections.forEach(section => {
        observer.observe(section);
    });
});
