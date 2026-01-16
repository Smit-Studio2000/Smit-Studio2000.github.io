// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// BOOKING FORM SUBMISSION
// ============================================
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        message: document.getElementById('message').value
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.date || !formData.location) {
        showError('Please fill all required fields');
        return;
    }

    // Create mailto link with form data
    const mailtoLink = `mailto:smeetstudio288@gmail.com?subject=Booking Request from ${formData.name}&body=`;
    
    const emailBody = `Booking Request Details:\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Contact Number: ${formData.phone}\n` +
        `Service Type: ${formData.service}\n` +
        `Preferred Date: ${formData.date}\n` +
        `Location/Venue: ${formData.location}\n\n` +
        `Additional Details:\n${formData.message}\n\n` +
        `Note: Please contact the customer at ${formData.phone} or ${formData.email} to confirm their booking.`;

    // Encode the email body
    const encodedBody = encodeURIComponent(emailBody);
    
    // Open default email client
    window.location.href = `mailto:smeetstudio288@gmail.com?subject=Booking Request from ${formData.name}&body=${encodedBody}`;

    // Show success message
    showSuccess('Booking request prepared! Your default email client will open. Please send it to confirm your request.');
    
    // Reset form
    bookingForm.reset();

    // Clear success message after 5 seconds
    setTimeout(() => {
        clearMessage();
    }, 5000);
});

// ============================================
// MESSAGE FUNCTIONS
// ============================================
function showSuccess(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message show';
    messageDiv.textContent = message;
    
    const form = document.querySelector('.booking-form');
    form.insertBefore(messageDiv, form.firstChild);
}

function showError(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message show';
    messageDiv.textContent = message;
    
    const form = document.querySelector('.booking-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

function clearMessage() {
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
        successMsg.remove();
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--box-shadow)';
    }
});

// ============================================
// FORM VALIDATION - PHONE NUMBER
// ============================================
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function() {
    // Remove non-digit characters
    this.value = this.value.replace(/[^\d]/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// ============================================
// DATE VALIDATION
// ============================================
const dateInput = document.getElementById('date');
const today = new Date();
const minDate = new Date(today);
minDate.setDate(minDate.getDate() + 7); // Minimum 7 days from today

const maxDate = new Date(today);
maxDate.setFullYear(maxDate.getFullYear() + 1); // Maximum 1 year from today

dateInput.min = minDate.toISOString().split('T')[0];
dateInput.max = maxDate.toISOString().split('T')[0];

// ============================================
// SCROLL ANIMATION FOR ELEMENTS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ============================================
// ENHANCED FORM SUBMISSION WITH BACKEND
// ============================================
// Uncomment below if you have a backend service (like Node.js/Express)
// that can send emails programmatically

/*
bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/submit-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showSuccess('Booking request submitted successfully! We will contact you soon.');
            bookingForm.reset();
            setTimeout(() => {
                clearMessage();
            }, 5000);
        } else {
            showError('Failed to submit booking. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred. Please try again later.');
    }
});
*/

