// ==========================================================================
// Rupam Das - Digital Marketing Portfolio Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Live Digital Clock Widget ---
    const clockElement = document.getElementById('live-clock');
    
    function updateClock() {
        if (!clockElement) return;
        const now = new Date();
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        clockElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    updateClock();
    setInterval(updateClock, 1000);

    // --- 2. Active Nav Link on Scroll Spy ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 3. Interactive Social Media Audit Lead Form ---
    const auditForm = document.getElementById('social-audit-form');
    const emailBtn = document.getElementById('email-submit-btn');

    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('audit-name').value.trim();
            const page = document.getElementById('audit-page').value.trim();
            const contact = document.getElementById('audit-contact').value.trim();
            const goal = document.getElementById('audit-goal').value;

            if (!name || !page || !contact) return;

            const message = `Hi Rupam! I would like to claim a Free Social Media Account Audit for my business:\n\n` +
                            `👤 Business / Name: ${name}\n` +
                            `🔗 Page Link: ${page}\n` +
                            `📱 Contact: ${contact}\n` +
                            `🎯 Primary Goal: ${goal}`;

            const whatsappUrl = `https://wa.me/8801715999862?text=${encodeURIComponent(message)}`;
            
            const feedback = document.getElementById('form-feedback');
            if (feedback) {
                feedback.style.display = 'block';
                feedback.className = 'form-feedback success';
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> Opening WhatsApp to send your audit details to Rupam...';
            }

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 600);
        });
    }

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const name = document.getElementById('audit-name').value.trim();
            const page = document.getElementById('audit-page').value.trim();
            const contact = document.getElementById('audit-contact').value.trim();
            const goal = document.getElementById('audit-goal').value;

            if (!name || !page || !contact) {
                alert('Please fill in your Name, Page Link, and Contact details first.');
                return;
            }

            const subject = encodeURIComponent(`Free Social Media Audit Request - ${name}`);
            const body = encodeURIComponent(
                `Hi Rupam,\n\nI would like to request a Free Social Media Account Audit for my business.\n\n` +
                `Business / Name: ${name}\n` +
                `Page Link: ${page}\n` +
                `Contact (WhatsApp/Phone): ${contact}\n` +
                `Primary Goal / Bottleneck: ${goal}\n\nThank you!`
            );

            window.location.href = `mailto:mail.dasrupam@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
