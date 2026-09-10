document.addEventListener("DOMContentLoaded", function () {
    const telegramPeople = {
    "егор": "Raivisor",
    "леша": "gucdebooo",
    "влад": "vlad48_68",
    "глеб": "CrazyBoy_2007",
    "артур": "Fr1z_btw",
    "денис": "kl0ndaik",
    "лев": "smokeymonke",
    "вадим": "vad1m22",
    "андрей": "Bananoviysochok",
};

const sendPersonButton =
    document.getElementById("sendPersonButton");

function setupPersonButton(name) {
    const username = telegramPeople[name];

    if (!username) {
        sendPersonButton.style.display = "none";
        return;
    }

    const displayNames = {
        "егор": "Егора",
        "леша": "Лешу",
        "влад": "Влада",
        "глеб": "Глеба",
        "артур": "Артура",
        "денис": "Дениса",
        "лев": "Льва",
        "вадим": "Вадима",
        "андрей": "Андрея"
    };

    sendPersonButton.textContent =
        "послать " + displayNames[name] + " нахуй";

    sendPersonButton.style.display = "block";

    sendPersonButton.onclick = function () {
        const message = encodeURIComponent("иди нахуй!!!");

        window.location.href =
            "https://t.me/" + username + "?text=" + message;
    };
}


    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    const celebrationSound =
        document.getElementById("celebrationSound");

    let particles = [];
    let fireworksRunning = false;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function createFirework() {

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.55;

        const colors = [
            "#ff0000",
            "#00ff00",
            "#00aaff",
            "#ffff00",
            "#ff00ff",
            "#ffffff",
            "#ff8800"
        ];

        const color =
            colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 80; i++) {

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 2;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 100,
                color: color,
                size: Math.random() * 3 + 1
            });
        }
    }

    function animateFireworks() {

        if (!fireworksRunning) {
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );
            return;
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        if (Math.random() < 0.12) {
            createFirework();
        }

        particles.forEach((particle, index) => {

            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vy += 0.05;
            particle.life--;

            ctx.globalAlpha = particle.life / 100;
            ctx.fillStyle = particle.color;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            if (particle.life <= 0) {
                particles.splice(index, 1);
            }
        });

        ctx.globalAlpha = 1;

        requestAnimationFrame(animateFireworks);
    }

    function startCelebration() {

        fireworksRunning = true;
        particles = [];

        animateFireworks();

        if (celebrationSound) {

            celebrationSound.currentTime = 0;

            celebrationSound.play().catch(function (error) {
                console.log("Звук заблокирован браузером:", error);
            });
        }

        setTimeout(function () {

            fireworksRunning = false;
            particles = [];

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

        }, 5000);
    }
const specialNames = [
    "никита"
];

const checkButton = document.getElementById("checkButton");
const nameInput = document.getElementById("nameInput");

const modal = document.getElementById("resultModal");
const closeModal = document.getElementById("closeModal");

const resultImage = document.getElementById("resultImage");
const resultImage2 = document.getElementById("resultImage2");
const resultText = document.getElementById("resultText");

checkButton.addEventListener("click", function () {

    const name = nameInput.value.trim().toLowerCase();

    console.log("Введено имя:", name);

    if (name === "никита") {

        resultImage.src = "images/nikita.jpg";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "ВЫ ЖИРНЫЙ СВИНКА";

        modal.style.display = "flex";
        startCelebration();

    } else if (name === "лера") {

        resultImage.src = "images/lera1.png";
        resultImage2.src = "images/lera2.jpg";

        resultImage.style.display = "block";
        resultImage2.style.display = "block";

        resultText.textContent = "ВЫ АЛЬТУШКА 10 ЛЕТ (ЖИРНАЯ)";

        modal.style.display = "flex";
        startCelebration();

    } else if (
        name === "владик" ||
        name === "владислав" ||
        name === "влад"
    ) {

        resultImage.src = "images/vlad.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
        } else if (
        name === "глеб"
    ) {

        resultImage.src = "images/gleb.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
        } else if (
        name === "артур"
    ) {

        resultImage.src = "images/artur.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
        } else if (
        name === "денис"
    ) {

        resultImage.src = "images/denis.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
        } else if (
        name === "лев"
    ) {

        resultImage.src = "images/lev.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        
        startCelebration();
        } else if (
        name === "рита"
    ) {

        resultImage.src = "images/rita.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        

        modal.style.display = "flex";
        startCelebration();
        } else if (
        name === "егор"
    ) {

        resultImage.src = "images/egor.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";
        setupPersonButton(name);

        resultText.textContent = "";

        modal.style.display = "flex";
        startCelebration();
} else if (
        name === "леша" ||
        name === "алексей" ||
        name === "лёша"
    ) {

        resultImage.src = "images/lesha.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
} else if (
        name === "вадим"
    ) {

        resultImage.src = "images/vadim.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();
 } else if (
        name === "андрей" 
        
    ) {

        resultImage.src = "images/andrey.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        setupPersonButton(name);

        modal.style.display = "flex";
        startCelebration();       
} else if (
        name === "артем" ||
        name === "артём" 
    ) {

        resultImage.src = "images/artem.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";
        

        modal.style.display = "flex";
        startCelebration();
} else if (
        name === "макс" ||
        name === "максим" 
    ) {

        resultImage.src = "images/maks.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        startCelebration();
    } else {

        alert("пока иди нахуй😎");

    }
});

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});
const secondButton = document.getElementById("secondButton");

secondButton.addEventListener("click", function () {

    resultImage.src = "images/pig1.jpg";

    resultImage.style.display = "block";
    resultImage2.style.display = "none";

    resultText.textContent = "";

    modal.style.display = "flex";

});
const telegramButton = document.getElementById("telegramButton");

telegramButton.addEventListener("click", function () {
    const message = encodeURIComponent("иди нахуй!!! ");

    window.location.href = "https://t.me/kl0ndaik?=&text=" + message;
});
});