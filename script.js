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

    } else if (name === "лера") {

        resultImage.src = "images/lera1.png";
        resultImage2.src = "images/lera2.jpg";

        resultImage.style.display = "block";
        resultImage2.style.display = "block";

        resultText.textContent = "ВЫ АЛЬТУШКА 10 ЛЕТ (ЖИРНАЯ)";

        modal.style.display = "flex";

    } else if (
        name === "владик" ||
        name === "владислав" ||
        name === "влад"
    ) {

        resultImage.src = "images/vlad.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        } else if (
        name === "глеб"
    ) {

        resultImage.src = "images/gleb.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        } else if (
        name === "артур"
    ) {

        resultImage.src = "images/artur.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        } else if (
        name === "денис"
    ) {

        resultImage.src = "images/denis.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        } else if (
        name === "лев"
    ) {

        resultImage.src = "images/lev.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";
        } else if (
        name === "рита"
    ) {

        resultImage.src = "images/rita.png";
        resultImage.style.display = "block";

        resultImage2.style.display = "none";

        resultText.textContent = "";

        modal.style.display = "flex";

    } else {

        alert("пока иди нахуй😎");

    }
});

closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});