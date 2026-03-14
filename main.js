document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Specific trigger for the 80/20 bar infographic animation
                if (entry.target.id === 'work') {
                    const bar = document.getElementById('bar-80');
                    if (bar) {
                        // Small delay to ensure smooth loading as section fades in
                        setTimeout(() => {
                            bar.style.width = '80%';
                        }, 500);
                    }
                }

                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Initial load animations (hero section)
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .reveal-mask');
    fadeElements.forEach((el, index) => {
        // If it's in the hero, trigger immediately. Otherwise, observe it.
        if (el.closest('#hero')) {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, 100);
        } else {
            observer.observe(el);
        }
    });

    // Also observe the work section itself to trigger the bar
    const workSection = document.getElementById('work');
    if (workSection) {
        observer.observe(workSection);
    }
});
