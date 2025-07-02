// Typing Animation Script
const phrases = [
    "Aspiring Researcher",
    "Lecturer in Computer Science",
    "Software Engineer"
    
    
];
let phraseIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const typingElement = document.getElementById("typing");

function type() {
    if (!typingElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        currentText = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    typingElement.innerHTML = currentText + '<span class="typing-cursor">|</span>'; // Added a simple cursor

    let typeSpeed = 75; // Speed of typing

    if (isDeleting) {
        typeSpeed /= 1.5; // Speed up deleting
    }

    // If word is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 500; // Pause at end of word
        isDeleting = true;
    }
    // If word is deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        // Reset to first phrase if it's the end of the array
        if (phraseIndex === phrases.length) {
            phraseIndex = 0;
        }
        typeSpeed = 500; // Pause before starting new word
    }
    setTimeout(type, typeSpeed);
}

// Navigation Link Active State on Scroll Script and Project Card Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Typing Animation
    if (typingElement) {
        setTimeout(type, 250); // Start typing after a short delay
    }

    // Navigation Link Active State Logic
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    function changeNavActiveState() {
        let currentSectionId = 'hero'; // Default to hero
        const navbarHeight = navbar ? navbar.offsetHeight : 56; // Fallback navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop - (navbarHeight + 20); // Adjusted offset for better accuracy
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    // Initial check for active nav link and on scroll
    changeNavActiveState();
    window.addEventListener('scroll', changeNavActiveState);

    // --- Project Card GitHub Button Logic ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const repoUrl = card.dataset.repo;

        // Dynamically create the GitHub button
        const githubButton = document.createElement('a');
        githubButton.classList.add('btn', 'btn-dark', 'github-button'); // Using Bootstrap button styles
        githubButton.textContent = 'View on GitHub';
        githubButton.style.display = 'none'; // Initially hidden
        githubButton.href = '#'; // Placeholder href, will be updated

        if (repoUrl && repoUrl.trim() !== "") { // Only add button if repoUrl is valid
            card.appendChild(githubButton);
        } else {
            // Optional: Add a visual cue or log if a card is missing a repo URL
            // console.warn("Project card is missing a 'data-repo' URL:", card.querySelector('.card-title')?.textContent.trim());
        }


        card.addEventListener('click', function (event) {
            // If the click is on the button itself, let the button's listener handle it
            if (event.target.classList.contains('github-button')) {
                return;
            }

            // Hide all other GitHub buttons
            document.querySelectorAll('.project-card .github-button').forEach(btn => {
                if (btn !== githubButton) { // Don't hide the button we might be about to show
                    btn.style.display = 'none';
                    btn.classList.remove('visible');
                }
            });

            // Toggle visibility of this card's button
            if (repoUrl && repoUrl.trim() !== "") { // Only proceed if there's a valid repo URL
                if (githubButton.style.display === 'none' || !githubButton.classList.contains('visible')) {
                    githubButton.href = repoUrl; // Set the correct URL when showing
                    githubButton.style.display = 'inline-block';
                    githubButton.classList.add('visible');
                } else {
                    githubButton.style.display = 'none';
                    githubButton.classList.remove('visible');
                }
            }
        });

        // Event listener for the GitHub button itself (only if it was added)
        if (repoUrl && repoUrl.trim() !== "" && card.contains(githubButton)) {
            githubButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default anchor action (e.g., if href is '#')
                event.stopPropagation(); // Stop the click from bubbling up to the card (which would hide it)

                const finalRepoUrl = this.href; // Get URL from button's href
                if (finalRepoUrl && finalRepoUrl !== '#') {
                    window.open(finalRepoUrl, '_blank'); // Open in a new tab
                } else {
                    console.error('GitHub repository URL not found or is invalid for this button.');
                }
            });
        }
    });

    // Optional: Click anywhere else on the document to hide any open GitHub button
    document.addEventListener('click', function(event) {
        // Check if the click is outside a project card AND outside a github button
        // (The stopPropagation on the button click should prevent this for direct button clicks)
        if (!event.target.closest('.project-card')) {
            document.querySelectorAll('.project-card .github-button.visible').forEach(btn => {
                btn.style.display = 'none';
                btn.classList.remove('visible');
            });
        }
    });
    // --- End of Project Card GitHub Button Logic ---
});
