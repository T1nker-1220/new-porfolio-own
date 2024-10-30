// Function to send a message
async function sendMessage(event) {
    event.preventDefault(); // Prevent the default form submission

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
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset(); // Reset the form
        } else {
            alert('Error sending message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
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
document.addEventListener('DOMContentLoaded', initializeComponents);