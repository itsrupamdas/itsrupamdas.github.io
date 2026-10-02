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
            const submitBtn = document.getElementById('audit-submit-btn');

            if (!name || !page || !contact) return;

            // Show standard loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
            }

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

            // 2. Format exact WhatsApp chat message as requested
            let chatMessage = `Name: ${name}` + (company ? ` (${company})` : '') + `\n` +
                              `📱 Contact: ${contact}\n`;

            if (email) {
                chatMessage += `✉️ Email: ${email}\n`;
            }

            chatMessage += `🔗 Business Social Media Page:  Web: ${page}\n` +
                           `🛠️ Services Interested In: ${services}\n`;

            if (budget) {
                chatMessage += `💰 Monthly Budget: ${budget}\n`;
            }

            chatMessage += `🎯 Primary Goal: ${goal}\n`;

            if (notes) {
                chatMessage += `📝 Notes / Details: ${notes}\n`;
            }

            chatMessage += `\nLooking forward to your audit and growth recommendations!`;

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
                        `<strong>👤 Name / Brand:</strong> ${name} ${company ? `(${company})` : ''}<br>` +
                        `<strong>📱 Contact:</strong> ${contact} ${email ? `&bull; ${email}` : ''}<br>` +
                        `<strong>🔗 Page / Web:</strong> <span style="word-break: break-all;">${page}</span><br>` +
                        `<strong>🛠️ Services:</strong> ${services}<br>` +
                        `<strong>🎯 Goal:</strong> ${goal}`;
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


