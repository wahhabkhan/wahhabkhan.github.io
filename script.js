const phrases = [
    "Software Engineer / Lecturer Computer Science",
    "Developer",
    "Aspiring Researcher"
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
const typingElement = document.getElementById("typing");

function loop() {
    typingElement.innerHTML = currentPhrase.join("");
    if (i < phrases.length) {
        if (!isDeleting && j <= phrases[i].length) {
            currentPhrase.push(phrases[i][j]);
            j++;
        }
        if (isDeleting && j > 0) {
            currentPhrase.pop();
            j--;
        }
        if (j === phrases[i].length) isDeleting = true;
        if (isDeleting && j === 0) {
            currentPhrase = [];
            isDeleting = false;
            i++;
        }
    } else {
        i = 0;
    }
    setTimeout(loop, isDeleting ? 50 : 150);
}
loop();