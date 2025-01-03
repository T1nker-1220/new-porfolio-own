// Function to send a message
const submitButton = document.querySelector('button[type="submit"]');

async function sendMessage(event) {
    event.preventDefault(); // Prevent the default form submission
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            showSuccessNotification('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Reset the form
        } else {
            showErrorNotification('Error sending message. Please try again.');
        }
    } catch (error) {
        showErrorNotification(error.message);
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

// Function to fetch contacts
async function getContacts() {
    try {
        const response = await fetch('http://localhost:5000/api/contacts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const contacts = await response.json();
        console.log(contacts); // For testing, you can view results in browser console
    } catch (error) {
        console.error('Error fetching contacts:', error);
    }
}

// Function to initialize AOS (Animate On Scroll)
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Function to initialize form submission
function initializeFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendMessage);
    }
}

// Function to ensure the contact section is visible
function ensureContactSectionVisible() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.style.display = 'block';
    }
}

// Function to initialize the Slick slider
function initializeSlickSlider() {
    $('.project-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });
}

// Function to initialize particles
function initializeParticles(selector, particleCount = 100) {
    const section = document.querySelector(selector);
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.opacity = Math.random();
        section.appendChild(particle);
    }
}

// Function to initialize all components
function initializeComponents() {
    initializeAOS();
    initializeFormSubmission();
    ensureContactSectionVisible();
    initializeSlickSlider();
    initializeParticles('body');
    initializeParticles('#projects');
    initializeParticles('#contact');
}

// Initialize components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();

    // Sticky navbar
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.onscroll = function() {
        // Add sticky class on scroll
        if (window.pageYOffset > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Update active section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-current', 'false');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Add tilt effect to project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5
    });

    // Progressive image loading
    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Custom cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Sticky Navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Custom notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animate');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Animated skill bars
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-progress');
    
    skills.forEach(skill => {
        const percentage = skill.getAttribute('data-percentage');
        skill.style.width = `${percentage}%`;
    });
}