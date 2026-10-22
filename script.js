// Grab every element we want to animate in
const revealEls = document.querySelectorAll('.reveal, .reveal-heading');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); // only animate once
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

const cursor = document.querySelector('.cursor-dot');
if (cursor && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .cell, .cs-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
    });
}
