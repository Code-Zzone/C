
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

// ضبط حجم الكانفاس
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;
const maxDistance = 200;

// إنشاء جسيمات عشوائية
for (let i = 0; i < numParticles; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,  // حجم الجسيم
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 1)`
    });
}

// رسم الشبكة
function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // توصيل الجسيمات القريبة
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
            if (dist < maxDistance) {
                const opacity = 1 - dist / maxDistance;
                ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5 + opacity * 0.5;  // زيادة سمك الخط بناءً على القرب
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    // رسم الجسيمات مع تأثير اللمعان
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fill();
    });
}

// تحديث مواقع الجسيمات
function updateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // منع الجسيمات من الخروج من الكانفاس
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
    });
}

// حلقة الرسم
function animate() {
    updateParticles();
    drawNetwork();
    requestAnimationFrame(animate);
}

// تعديل حجم الكانفاس عند تغيير حجم النافذة
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
