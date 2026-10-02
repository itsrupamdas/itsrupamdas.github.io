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

    // --- 3. Interactive Social Media Audit Lead Form (Khalid Farhan Style) ---
    // Google Apps Script Web App URL for direct Google Sheet lead storage:
    // Once deployed in your Google Sheet (Extensions > Apps Script > Deploy as Web App), paste the URL below:
    const GOOGLE_SHEET_WEBAPP_URL = ''; 

    // Service Pills Selection Handling
    const servicePills = document.querySelectorAll('.service-pill');
    servicePills.forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('selected');
        });
    });

    const auditForm = document.getElementById('social-audit-form');
    const emailBtn = document.getElementById('email-submit-btn');

    function getSelectedServices() {
        const selected = [];
        document.querySelectorAll('.service-pill.selected').forEach(pill => {
            selected.push(pill.getAttribute('data-service') || pill.textContent.trim());
        });
        return selected.length > 0 ? selected.join(', ') : 'Full Social Media & Meta Ads Audit';
    }

    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('audit-name').value.trim();
            const company = document.getElementById('audit-company').value.trim();
            const contact = document.getElementById('audit-contact').value.trim();
            const email = document.getElementById('audit-email') ? document.getElementById('audit-email').value.trim() : '';
            const page = document.getElementById('audit-page').value.trim();
            const services = getSelectedServices();
            const budget = document.getElementById('audit-budget') ? document.getElementById('audit-budget').value : '';
            const goal = document.getElementById('audit-goal').value;
            const notes = document.getElementById('audit-notes') ? document.getElementById('audit-notes').value.trim() : '';

            if (!name || !page || !contact) return;

            // 1. Send data directly to Google Sheet (if Web App URL is configured)
            const leadData = {
                timestamp: new Date().toISOString(),
                name: name,
                company: company,
                contact: contact,
                email: email,
                page: page,
                services: services,
                budget: budget,
                goal: goal,
                notes: notes
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

            // 2. Format optimized message for WhatsApp chat
            let chatMessage = `👋 *Hi Rupam! I'd like to claim my Free Social Media Audit:*\n\n` +
                              `👤 *Name:* ${name}` + (company ? ` (${company})` : '') + `\n` +
                              `📱 *Contact:* ${contact}\n`;

            if (email) {
                chatMessage += `✉️ *Email:* ${email}\n`;
            }

            chatMessage += `🔗 *Social Page / Web:* ${page}\n` +
                           `🛠️ *Services Needed:* ${services}\n`;

            if (budget) {
                chatMessage += `💰 *Monthly Budget:* ${budget}\n`;
            }

            chatMessage += `🎯 *Primary Goal:* ${goal}\n`;

            if (notes) {
                chatMessage += `📝 *Notes & Challenges:* ${notes}\n`;
            }

            chatMessage += `\n_Looking forward to your audit and growth recommendations!_`;

            const whatsappUrl = `https://wa.me/8801715999862?text=${encodeURIComponent(chatMessage)}`;
            
            const feedback = document.getElementById('form-feedback');
            if (feedback) {
                feedback.style.display = 'block';
                feedback.className = 'form-feedback success';
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> <strong>Audit Request Saved!</strong> Opening WhatsApp to start our chat...';
            }

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 600);
        });
    }

    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const name = document.getElementById('audit-name').value.trim();
            const company = document.getElementById('audit-company').value.trim();
            const contact = document.getElementById('audit-contact').value.trim();
            const email = document.getElementById('audit-email') ? document.getElementById('audit-email').value.trim() : '';
            const page = document.getElementById('audit-page').value.trim();
            const services = getSelectedServices();
            const budget = document.getElementById('audit-budget') ? document.getElementById('audit-budget').value : '';
            const goal = document.getElementById('audit-goal').value;
            const notes = document.getElementById('audit-notes') ? document.getElementById('audit-notes').value.trim() : '';

            if (!name || !page || !contact) {
                alert('Please fill in your Name, Page Link, and WhatsApp/Phone contact details first.');
                return;
            }

            const subject = encodeURIComponent(`Free Social Media Audit Request - ${name}${company ? ` (${company})` : ''}`);
            let emailBody = `Hi Rupam,\n\nI would like to request a Free Social Media Account Audit for my business.\n\n` +
                            `Name: ${name}\n` +
                            (company ? `Company / Brand: ${company}\n` : '') +
                            `Contact: ${contact}\n` +
                            (email ? `Email: ${email}\n` : '') +
                            `Page Link: ${page}\n` +
                            `Services Interested In: ${services}\n` +
                            (budget ? `Monthly Budget: ${budget}\n` : '') +
                            `Primary Goal: ${goal}\n` +
                            (notes ? `Notes / Challenges: ${notes}\n` : '') +
                            `\nThank you!`;

            window.location.href = `mailto:mail.dasrupam@gmail.com?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
        });
    }
});


