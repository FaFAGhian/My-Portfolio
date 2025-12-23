// Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 1000); // 1s minimal load time
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
});

// Copy Functionality
const copyBtns = document.querySelectorAll('.copy-btn');
copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card clicks if nested
        const textToCopy = btn.getAttribute('data-copy');
        const originalText = btn.innerHTML;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.classList.add('copied');
            btn.innerHTML = '<span class="copy-icon">✅</span> <span class="copy-text">Copied!</span>';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy class text: ', err);
        });
    });
});

// Contact Form Animation Logic Removed
// Custom Cursor Logic Removed per request

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Intro Text Typing Animation Removed per request

// Start typing when intro comes into view
// Logic removed for static text

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-width');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
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
