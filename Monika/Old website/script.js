
document.addEventListener("DOMContentLoaded", function() {
    let elements = document.querySelectorAll(".fade-in");
    function fadeInOnScroll() {
        elements.forEach((element) => {
            let position = element.getBoundingClientRect().top;
            let screenHeight = window.innerHeight;
            if (position < screenHeight - 100) {
                element.classList.add("visible");
            }
        });
    }
    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll();
    
});
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let contactForm = document.getElementById("contactForm");

    // Moves the form slightly up and down while scrolling
    contactForm.style.transform = `translateY(${scrollPosition * 0.1 - 50}%)`;
});
document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.createElement("span");
    yearSpan.textContent = new Date().getFullYear();

    const footerText = document.querySelector(".footer-bottom p");
    footerText.innerHTML = `&copy; ${yearSpan.textContent} Smart Waste Management. All rights reserved.`;
});


