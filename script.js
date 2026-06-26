// ============================================
// Rahul Chanchlani — Executive Portfolio Controller
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initSkillTabs();
    initSkillBars();
    initStatsCounter();
    initSmoothScroll();
    initContactForm();
    initCertificateModal();
});

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 600);
        }, 500);
    });
    setTimeout(() => { if (preloader) preloader.style.display = 'none'; }, 3000);
}

function initNavigation() {
    const nav = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('nav-overlay');
    const links = document.querySelectorAll('#nav-overlay .nav-link');

    if (hamburger && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            overlay.classList.toggle('open');
        });
    }

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            overlay.classList.remove('open');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    const phrases = [
        'Business & Management Consultant',
        'Operations & Service Delivery Leader',
        'Trust & Safety | Fraud Prevention Lead',
        'Data Analytics Specialist'
    ];
    let i = 0, j = 0, isDeleting = false;
    function type() {
        let curr = phrases[i];
        if (isDeleting) {
            el.textContent = curr.substring(0, j - 1);
            j--;
        } else {
            el.textContent = curr.substring(0, j + 1);
            j++;
        }
        let speed = isDeleting ? 30 : 60;
        if (!isDeleting && j === curr.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % phrases.length; speed = 400; }
        setTimeout(type, speed);
    }
    setTimeout(type, 1000);
}

function initScrollAnimations() {
    const items = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
        items.forEach(i => obs.observe(i));
    } else {
        items.forEach(i => i.classList.add('visible'));
    }
}

function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panes = document.querySelectorAll('.skill-tab-content');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetedPane = document.getElementById(tab.getAttribute('data-tab'));
            if (targetedPane) {
                targetedPane.classList.add('active');
                const fills = targetedPane.querySelectorAll('.skill-fill');
                fills.forEach(f => {
                    f.classList.add('animate');
                    f.style.width = f.getAttribute('data-percentage') + '%';
                });
            }
        });
    });
}

function initSkillBars() {
    const sec = document.getElementById('skills');
    if (!sec) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const activePane = sec.querySelector('.skill-tab-content.active');
                if (activePane) {
                    activePane.querySelectorAll('.skill-fill').forEach(f => {
                        f.classList.add('animate');
                        f.style.width = f.getAttribute('data-percentage') + '%';
                    });
                }
                obs.unobserve(sec);
            }
        });
    }, { threshold: 0.1 });
    obs.observe(sec);
}

function initStatsCounter() {
    const nums = document.querySelectorAll('.stats-number');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suff = entry.target.getAttribute('data-suffix') || '';
                let curr = 0;
                const step = target / 30;
                const interval = setInterval(() => {
                    curr += step;
                    if (curr >= target) {
                        entry.target.textContent = target + suff;
                        clearInterval(interval);
                    } else {
                        entry.target.textContent = Math.floor(curr) + suff;
                    }
                }, 40);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    nums.forEach(n => obs.observe(n));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const tgt = document.querySelector(this.getAttribute('href'));
            if (tgt) {
                e.preventDefault();
                window.scrollTo({ top: tgt.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const msg = document.getElementById('form-success-msg');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        if (msg) msg.classList.add('show');
    });
}

function initCertificateModal() {
    const trigger = document.getElementById('cert-image');
    const modal = document.getElementById('cert-modal');
    if (!trigger || !modal) return;
    
    trigger.addEventListener('click', () => {
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.style.opacity = '0';
            setTimeout(() => modal.style.display = 'none', 400);
        }
    });
}

// Back to top button visibility management
window.addEventListener('scroll', () => {
    const btt = document.getElementById('back-to-top');
    if (!btt) return;
    if (window.scrollY > 400) btt.style.display = 'block';
    else btt.style.display = 'none';
});
document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Function to copy email or phone number automatically when clicked
function copyTextToClipboard(textValue, element) {
    navigator.clipboard.writeText(textValue).then(() => {
        // Find the inner text field to show a brief visual confirmation 
        const targetTextElement = element.querySelector('.copyable-text');
        const originalText = targetTextElement.innerText;
        
        // Provide visual feedback
        targetTextElement.innerText = "Copied to Clipboard!";
        targetTextElement.style.color = "#c9a84c";
        
        // Reset the text back to normal after 1.5 seconds
        setTimeout(() => {
            targetTextElement.innerText = originalText;
            targetTextElement.style.color = "#fff";
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}