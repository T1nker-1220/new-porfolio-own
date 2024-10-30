async function sendMessage(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

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
}

// Add this function to your script.js or a new JavaScript file
async function getContacts() {
    const response = await fetch('http://localhost:5000/api/contacts');
    const contacts = await response.json();
    // Display the contacts on your page
    console.log(contacts); // For testing, you can view results in browser console
}

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

$(document).ready(function(){
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
});