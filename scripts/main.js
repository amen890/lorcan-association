// Default configuration
const defaultConfig = {
    site_title: 'Lorcan Leader Boards',
    hero_tagline: 'Empowering Future Healthcare Leaders Across Africa',
    contact_email: 'info@lorcan.org'
};

let config = { ...defaultConfig };

// Contact form handler
function handleContactSubmit(event) {
    event.preventDefault();
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('contact-success');
    
    if (contactForm && successMessage) {
        contactForm.reset();
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Membership form handler
function handleMembershipSubmit(event) {
    event.preventDefault();
    const membershipForm = document.getElementById('membership-form');
    const successMessage = document.getElementById('membership-success');
    
    if (membershipForm && successMessage) {
        membershipForm.reset();
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Update UI based on config
async function onConfigChange(cfg) {
    config = { ...defaultConfig, ...cfg };
    
    // Update site title
    const navTitle = document.getElementById('nav-title');
    if (navTitle) navTitle.textContent = config.site_title || defaultConfig.site_title;
    
    // Update hero tagline
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline) heroTagline.textContent = config.hero_tagline || defaultConfig.hero_tagline;
    
    // Update contact email
    const displayEmail = document.getElementById('display-email');
    if (displayEmail) displayEmail.textContent = config.contact_email || defaultConfig.contact_email;
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (cfg) => ({
            recolorables: [],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (cfg) => new Map([
            ['site_title', cfg.site_title || defaultConfig.site_title],
            ['hero_tagline', cfg.hero_tagline || defaultConfig.hero_tagline],
            ['contact_email', cfg.contact_email || defaultConfig.contact_email]
        ])
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);

    const clubForm = document.getElementById('club-join-form');
    if (clubForm) {
        clubForm.addEventListener('submit', handleClubJoinSubmit);
    }
});

function handleClubJoinSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const errorMessage = document.getElementById('club-form-error');
    const successMessage = document.getElementById('club-form-success');
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const department = form.querySelector('[name="department"]').value.trim();
    const year = form.querySelector('[name="year"]').value;
    const essay = form.querySelector('[name="essay"]').value.trim();
    const proofInput = form.querySelector('[name="payment_proof"]');
    const proofFile = proofInput.files[0];

    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');

    if (!name || !email || !phone || !department || !year || !essay || !proofFile) {
        errorMessage.textContent = 'Please complete every field and upload the payment proof image.';
        errorMessage.classList.remove('hidden');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        errorMessage.classList.remove('hidden');
        return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(proofFile.type)) {
        errorMessage.textContent = 'Payment proof must be a JPG or PNG image.';
        errorMessage.classList.remove('hidden');
        return;
    }

    const payload = new FormData();
    payload.append('club', form.dataset.club || 'Club');
    payload.append('name', name);
    payload.append('email', email);
    payload.append('phone', phone);
    payload.append('department', department);
    payload.append('year', year);
    payload.append('essay', essay);
    payload.append('payment_proof', proofFile);

    // Point explicitly to the Flask server port (5000)
    const apiUrl = 'http://127.0.0.1:5000/api/club-join';

    fetch(apiUrl, {
        method: 'POST',
        body: payload
    })
    .then(async response => {
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Submission failed.');
        }
        return response.json();
    })
    .then(data => {
        successMessage.textContent = data.message || 'Your application has been submitted successfully. We will contact you soon.';
        successMessage.classList.remove('hidden');
        form.reset();
    })
    .catch(error => {
        console.error('Club join submit error:', error);
        errorMessage.textContent = error.message || 'Unable to submit the form at this time. Please try again later.';
        errorMessage.classList.remove('hidden');
    });
}