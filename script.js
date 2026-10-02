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

    // --- 3. Social Media Audit Lead Form (Direct Email Delivery) ---
    const NOTIFICATION_EMAIL = 'mail.dasrupam@gmail.com';
    const auditForm = document.getElementById('social-audit-form');

    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('audit-name').value.trim();
            const company = document.getElementById('audit-company') ? document.getElementById('audit-company').value.trim() : '';
            const contact = document.getElementById('audit-contact').value.trim();
            const email = document.getElementById('audit-email').value.trim();
            const page = document.getElementById('audit-page').value.trim();
            const submitBtn = document.getElementById('audit-submit-btn');

            if (!name || !page || !contact || !email) return;

            // Show standard loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
            }

            const fullNameBrand = name + (company ? ` (${company})` : '');

            // 1. Send lead details directly to your email (mail.dasrupam@gmail.com) via FormSubmit AJAX
            fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `🚨 New Audit Request: ${fullNameBrand}`,
                    _template: 'table',
                    _captcha: 'false',
                    'Name': fullNameBrand,
                    'Phone / WhatsApp': contact,
                    'Email Address': email,
                    'Business Social Media Page': page,
                    'Submitted At': new Date().toLocaleString()
                })
            }).catch(err => {
                console.warn('Email dispatch notice:', err);
            });

            // 2. Prepare WhatsApp direct message in case client wants to chat right away
            const chatMessage = `Name: ${fullNameBrand}\n` +
                                `📱 Contact: ${contact}\n` +
                                `✉️ Email: ${email}\n` +
                                `🔗 Business Social Media Page:  Web: ${page}`;

            const whatsappUrl = `https://wa.me/8801715999862?text=${encodeURIComponent(chatMessage)}`;

            // 3. Display Standard Thank You / Confirmation Screen
            setTimeout(() => {
                auditForm.style.display = 'none';

                const successCard = document.getElementById('audit-success-card');
                const successTitle = document.getElementById('success-title');
                const successSummary = document.getElementById('success-lead-summary');
                const whatsappBtn = document.getElementById('success-whatsapp-btn');

                if (successTitle) {
                    successTitle.textContent = `Thank You, ${name}! Your Audit Request is Received.`;
                }

                if (successSummary) {
                    successSummary.innerHTML = 
                        `<strong>Name:</strong> ${fullNameBrand}<br>` +
                        `<strong>📱 Contact:</strong> ${contact}<br>` +
                        `<strong>✉️ Email:</strong> ${email}<br>` +
                        `<strong>🔗 Business Social Media Page:</strong> <span style="word-break: break-all;">${page}</span>`;
                }

                const calendlyBtn = document.getElementById('success-calendly-btn');
                if (calendlyBtn) {
                    calendlyBtn.href = 'https://calendly.com/rupamdas/coffee-chat';
                }

                if (successCard) {
                    successCard.style.display = 'block';
                }
            }, 600);
        });
    }
});


