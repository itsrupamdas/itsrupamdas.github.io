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

    // --- 3. Social Media Audit Lead Form ---
    // Google Apps Script Web App URL for direct Google Sheet lead storage:
    // Once deployed in your Google Sheet (Extensions > Apps Script > Deploy as Web App), paste the URL below:
    const GOOGLE_SHEET_WEBAPP_URL = ''; 

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

            // 1. Send data directly to Google Sheet (if Web App URL is configured)
            const leadData = {
                timestamp: new Date().toISOString(),
                name: name + (company ? ` (${company})` : ''),
                contact: contact,
                email: email,
                page: page
            };

            if (GOOGLE_SHEET_WEBAPP_URL) {
                try {
                    fetch(GOOGLE_SHEET_WEBAPP_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(leadData)
                    });
                } catch (err) {
                    console.warn('Google Sheet submission note:', err);
                }
            }

            // 2. Format exact WhatsApp chat message as requested
            const chatMessage = `Name: ${name}` + (company ? ` (${company})` : '') + `\n` +
                                `📱 Contact: ${contact}\n` +
                                `✉️ Email: ${email}\n` +
                                `🔗 Business Social Media Page:  Web: ${page}`;

            const whatsappUrl = `https://wa.me/8801715999862?text=${encodeURIComponent(chatMessage)}`;

            // 3. Standard In-Page Confirmation Screen
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
                        `<strong>Name:</strong> ${name} ${company ? `(${company})` : ''}<br>` +
                        `<strong>📱 Contact:</strong> ${contact}<br>` +
                        `<strong>✉️ Email:</strong> ${email}<br>` +
                        `<strong>🔗 Business Social Media Page:</strong> <span style="word-break: break-all;">${page}</span>`;
                }

                if (whatsappBtn) {
                    whatsappBtn.href = whatsappUrl;
                }

                if (successCard) {
                    successCard.style.display = 'block';
                }
            }, 600);
        });
    }
});


