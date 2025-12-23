// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, .contact-card');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Smooth delay for follower
    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 50);
});

// Ripple Effect (Works on Click/Touch)
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    });

    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Copy to Clipboard
const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
    card.addEventListener('click', async () => {
        const textToCopy = card.getAttribute('data-copy');

        try {
            await navigator.clipboard.writeText(textToCopy);

            const hint = card.querySelector('.copy-hint');
            const originalText = hint.textContent;

            hint.textContent = 'Copied!';
            hint.style.color = '#d4af37';

            setTimeout(() => {
                hint.textContent = originalText;
                hint.style.color = '';
            }, 2000);

        } catch (err) {
            console.error('Failed to copy courtesy of browser permissions', err);
        }
    });
});

// Smooth Scroll for Anchor Links (Backup only, CSS handles sticky nav usually)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Easter Egg: Konami Code (Up, Up, Down, Down, Left, Right, Left, Right, b, a)
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let inputSequence = [];

document.addEventListener('keydown', (e) => {
    inputSequence.push(e.key);
    inputSequence.splice(-secretCode.length - 1, inputSequence.length - secretCode.length);
    if (inputSequence.join('').includes(secretCode.join(''))) {
        document.body.classList.toggle('party-mode');
        alert("🎉 SECRET UNLOCKED: PARTY MODE! 🎉");
        inputSequence = [];
    }
});
