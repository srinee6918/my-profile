// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll to sections with smooth animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation and Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        if (name.value.trim() === '') {
            highlightError(name);
            isValid = false;
        } else {
            removeError(name);
        }
        
        if (email.value.trim() === '' || !isValidEmail(email.value)) {
            highlightError(email);
            isValid = false;
        } else {
            removeError(email);
        }
        
        if (message.value.trim() === '') {
            highlightError(message);
            isValid = false;
        } else {
            removeError(message);
        }
        
        if (isValid) {
            // In a real application, you would send the form data to a server
            // For this example, we'll just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
                successMessage.remove();
            }, 3000);
        }
    });
}

// Helper Functions
function highlightError(input) {
    input.style.borderColor = '#ff6b6b';
    
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = `${input.previousElementSibling.textContent} is required`;
        
        if (input.id === 'email' && input.value.trim() !== '' && !isValidEmail(input.value)) {
            errorMessage.textContent = 'Please enter a valid email address';
        }
        
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }
}

function removeError(input) {
    input.style.borderColor = '';
    
    if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
        input.nextElementSibling.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animation on scroll
window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add animated class to elements initially in viewport
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('animated');
        }
    }, 100);
});