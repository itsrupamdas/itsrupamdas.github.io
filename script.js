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

    // --- 4. Interactive Skills & Tools Proof Modal ---
    const proofModal = document.getElementById('proof-modal');
    const modalCloseBtn = document.getElementById('proof-modal-close');
    const modalOverlay = document.getElementById('proof-modal-overlay');
    const modalBadge = document.getElementById('modal-proof-badge');
    const modalTitle = document.getElementById('modal-proof-title');
    const modalWorkflow = document.getElementById('modal-proof-workflow');
    const modalEvidence = document.getElementById('modal-proof-evidence');
    const modalCtaBtn = document.getElementById('modal-proof-cta-btn');
    const modalCtaText = document.getElementById('modal-proof-cta-text');

    const proofData = {
        'campaign-setup': {
            type: 'Skill',
            icon: 'fa-bullseye',
            title: 'Campaign Setup',
            workflow: 'Structuring full-funnel Meta ad sets (Top, Middle, Bottom of Funnel), configuring CBO vs. ABO budgets, selecting high-intent placement strategies, and verifying custom conversion tracking.',
            evidence: [
                { text: 'Case Study 1: Sales Campaign for E-commerce', link: '#projects', icon: 'fa-shopping-cart', tag: 'Case Study' },
                { text: 'Case Study 3: Lead Generation for Service Company', link: '#projects', icon: 'fa-user-tie', tag: 'Case Study' },
                { text: 'LinkedIn Advertising Fundamentals Certification', link: '#certifications', icon: 'fab fa-linkedin', tag: 'Verified Cert' }
            ],
            ctaText: 'View Campaign Case Studies',
            ctaLink: '#projects'
        },
        'ab-testing': {
            type: 'Skill',
            icon: 'fa-flask',
            title: 'A/B Testing & Optimization',
            workflow: 'Running systematic split tests on ad hooks, video vs. static visual creatives, headline hooks, copy angles, and audience segments to systematically lower Cost Per Acquisition (CPA).',
            evidence: [
                { text: 'E-commerce & F-commerce Split Testing Case Studies', link: '#projects', icon: 'fa-chart-line', tag: 'Case Study' },
                { text: 'HubSpot Digital Marketing Certification', link: '#certifications', icon: 'fab fa-hubspot', tag: 'Verified Cert' }
            ],
            ctaText: 'Explore Practical Projects',
            ctaLink: '#projects'
        },
        'audience-research': {
            type: 'Skill',
            icon: 'fa-users',
            title: 'Audience Research & Persona Mapping',
            workflow: 'Analyzing competitor ad creatives via Meta Ad Library, identifying high-affinity customer avatars, and configuring Broad targeting, Detailed Interest stacks, and Custom/Lookalike audiences.',
            evidence: [
                { text: 'Meta Social Media Marketing Course (Coursera Foundation)', link: '#about', icon: 'fa-graduation-cap', tag: 'Foundation' },
                { text: 'Freelance Social Media Management (Client Growth)', link: '#experience', icon: 'fa-share-nodes', tag: 'Experience' }
            ],
            ctaText: 'View Work Experience',
            ctaLink: '#experience'
        },
        'creative-diversification': {
            type: 'Skill',
            icon: 'fa-palette',
            title: 'Creative Diversification',
            workflow: 'Designing multi-format creative variations (UGC vertical reels, product carousels, customer review cards, benefit overlays) to eliminate ad fatigue and maintain scale.',
            evidence: [
                { text: 'Marketing Operations Assistant at AI Byters', link: '#experience', icon: 'fa-robot', tag: 'Work Exp' },
                { text: 'Canva Essentials Certification', link: '#certifications', icon: 'fa-certificate', tag: 'Verified Cert' }
            ],
            ctaText: 'View Experience & Certs',
            ctaLink: '#experience'
        },
        'ad-copywriting': {
            type: 'Skill',
            icon: 'fa-pen-nib',
            title: 'Direct-Response Ad Copywriting',
            workflow: 'Writing hook-driven ad copy and captions utilizing proven direct-response frameworks (PAS, AIDA, Before-After-Bridge), enhanced by prompt-engineered AI copy workflows.',
            evidence: [
                { text: 'British Council English Proficiency (CEFR B1)', link: '#certifications', icon: 'fa-language', tag: 'Verified Cert' },
                { text: 'Client Social Media Content Strategy & Copy', link: '#experience', icon: 'fa-user-check', tag: 'Work Exp' }
            ],
            ctaText: 'View English Credential',
            ctaLink: '#certifications'
        },
        'reporting-retargeting': {
            type: 'Skill',
            icon: 'fa-chart-pie',
            title: 'Reporting & Retargeting',
            workflow: 'Building structured Excel sales performance sheets, tracking ROAS/CPA, and building 30-day website visitors & social engagement retargeting funnels.',
            evidence: [
                { text: 'Microsoft Office 365 (MS Excel) Certification (EDGE Project)', link: '#certifications', icon: 'fab fa-microsoft', tag: 'Verified Cert' },
                { text: 'Sales Reporting & Task Coordination at AI Byters', link: '#experience', icon: 'fa-building', tag: 'Work Exp' }
            ],
            ctaText: 'View Excel Credential',
            ctaLink: '#certifications'
        },
        'tool-claude': {
            type: 'Tool',
            icon: 'fa-brain',
            title: 'Claude (AI Strategy & Copy)',
            workflow: 'Utilized for rapid persona mapping, brainstorming multi-angle marketing hooks, drafting direct-response copy, and automating content workflow pipelines.',
            evidence: [
                { text: 'Marketing Operations Automation at AI Byters', link: '#experience', icon: 'fa-robot', tag: 'Work Exp' },
                { text: 'AI Content Production Methodology', link: '#about', icon: 'fa-user', tag: 'About Me' }
            ],
            ctaText: 'View AI Work Experience',
            ctaLink: '#experience'
        },
        'tool-meta': {
            type: 'Tool',
            icon: 'fab fa-facebook-f',
            title: 'Meta Ads Manager',
            workflow: 'End-to-end setup and scaling of conversion, message, and lead campaigns, managing pixel events, evaluating real-time ROAS, and configuring ABO/CBO budget allocations.',
            evidence: [
                { text: 'Case Study 1: E-commerce Sales Campaign', link: '#projects', icon: 'fa-shopping-cart', tag: 'Case Study' },
                { text: 'Case Study 2: F-commerce Messaging Campaign', link: '#projects', icon: 'fa-comments', tag: 'Case Study' },
                { text: 'LinkedIn Advertising Fundamentals Credential', link: '#certifications', icon: 'fab fa-linkedin', tag: 'Verified Cert' }
            ],
            ctaText: 'Explore Case Studies',
            ctaLink: '#projects'
        },
        'tool-ai-video': {
            type: 'Tool',
            icon: 'fa-video',
            title: 'AI Video & Image Pipelines',
            workflow: 'Developing AI-generated visual assets, realistic video scripts, voiceovers, and marketing collateral using cutting-edge generative AI models and automation workflows.',
            evidence: [
                { text: 'Marketing Operations Assistant at AI Byters', link: '#experience', icon: 'fa-robot', tag: 'Work Exp' },
                { text: 'AI-driven Content Strategy', link: '#about', icon: 'fa-magic', tag: 'Philosophy' }
            ],
            ctaText: 'View AI Byters Experience',
            ctaLink: '#experience'
        },
        'tool-canva': {
            type: 'Tool',
            icon: 'fa-palette',
            title: 'Canva & Video Editing',
            workflow: 'Designing branded ad creatives, presentation pitch decks, and editing high-retention vertical short-form video reels with CapCut.',
            evidence: [
                { text: 'Official Canva Essentials Certification (c4e654)', link: '#certifications', icon: 'fa-certificate', tag: 'Verified Cert' },
                { text: 'Freelance Social Media Visual Design', link: '#experience', icon: 'fa-paint-brush', tag: 'Work Exp' }
            ],
            ctaText: 'View Canva Credential',
            ctaLink: '#certifications'
        },
        'tool-gtm': {
            type: 'Tool',
            icon: 'fa-tags',
            title: 'GTM (Pixel & CAPI Setup)',
            workflow: 'Setting up Google Tag Manager web containers, Meta Pixel tracking code, custom trigger events (Purchase, Lead, ViewContent), and Conversions API (CAPI) for accurate attribution.',
            evidence: [
                { text: 'Conversion Tracking Setup in Practical Projects', link: '#projects', icon: 'fa-chart-line', tag: 'Projects' },
                { text: 'HubSpot Digital Marketing Certification', link: '#certifications', icon: 'fab fa-hubspot', tag: 'Verified Cert' }
            ],
            ctaText: 'View Practical Projects',
            ctaLink: '#projects'
        },
        'tool-ga4': {
            type: 'Tool',
            icon: 'fa-chart-bar',
            title: 'GA4 & Google Sheets',
            workflow: 'Tracking visitor journeys, evaluating traffic source attribution, setting up conversion goals in GA4, and preparing clean executive reporting sheets in Excel/Google Sheets.',
            evidence: [
                { text: 'Microsoft Office 365 (MS Excel) Certification', link: '#certifications', icon: 'fab fa-microsoft', tag: 'Verified Cert' },
                { text: 'Sales Performance Reporting at AI Byters', link: '#experience', icon: 'fa-building', tag: 'Work Exp' }
            ],
            ctaText: 'View Excel Credential',
            ctaLink: '#certifications'
        }
    };

    function openProofModal(proofId) {
        const item = proofData[proofId];
        if (!item || !proofModal) return;

        // Set badge & title
        if (modalBadge) {
            modalBadge.innerHTML = `<i class="fas ${item.icon}"></i> ${item.type} Proof`;
        }
        if (modalTitle) {
            modalTitle.textContent = item.title;
        }
        if (modalWorkflow) {
            modalWorkflow.textContent = item.workflow;
        }

        // Render Evidence Chips
        if (modalEvidence) {
            modalEvidence.innerHTML = '';
            item.evidence.forEach(ev => {
                const chip = document.createElement('a');
                chip.href = ev.link;
                chip.className = 'proof-evidence-chip';
                chip.innerHTML = `
                    <div class="proof-evidence-chip-left">
                        <i class="fas ${ev.icon}"></i>
                        <span>${ev.text}</span>
                    </div>
                    <span class="proof-evidence-chip-right">${ev.tag} &rarr;</span>
                `;
                chip.addEventListener('click', () => {
                    closeProofModal();
                });
                modalEvidence.appendChild(chip);
            });
        }

        // Set CTA
        if (modalCtaBtn && modalCtaText) {
            modalCtaBtn.href = item.ctaLink;
            modalCtaText.textContent = item.ctaText;
            modalCtaBtn.onclick = () => {
                closeProofModal();
            };
        }

        // Open modal
        proofModal.classList.add('active');
        proofModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProofModal() {
        if (!proofModal) return;
        proofModal.classList.remove('active');
        proofModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click listeners to all skill & tool interactive buttons
    const interactiveProofButtons = document.querySelectorAll('[data-proof-id]');
    interactiveProofButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const proofId = btn.getAttribute('data-proof-id');
            openProofModal(proofId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProofModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProofModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && proofModal && proofModal.classList.contains('active')) {
            closeProofModal();
        }
    });
});

