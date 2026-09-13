console.log("НОВЫЙ SCRIPT ЗАГРУЖЕН");

document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // FIREBASE ЛИДЕРЫ
    // =========================

    const leadersRef = firebase.database().ref("leaders");


    // =========================
    // СЛУЧАЙНЫЕ КАРТИНКИ
    // =========================

    const randomImages = [];

    for (let i = 1; i <= 50; i++) {
        randomImages.push("images/" + i + ".png");
    }


    // =========================
    // TELEGRAM ЛЮДИ
    // =========================

    const telegramPeople = {
        "егор": "Raivisor",
        "леша": "gucdebooo",
        "влад": "vlad48_68",
        "глеб": "CrazyBoy_2007",
        "артур": "Fr1z_btw",
        "денис": "kl0ndaik",
        "лев": "smokeymonke",
        "вадим": "vad1m22",
        "андрей": "Bananoviysochok"
    };


    const sendPersonButton =
        document.getElementById("sendPersonButton");


    // =========================
    // ОСОБЫЕ ИМЕНА
    // =========================

    const specialNames = [
        "никита",
        "лера",
        "рита",
        "макс",
        "максим",
        "артем",
        "артём"
    ];


    // =========================
    // ДОБАВИТЬ +1 В ЛИДЕРЫ
    // =========================

    function addLeaderPoint(name) {

        if (!name || name === "__unknown__") {
            return;
        }

        const leaderRef =
            firebase.database().ref(
                "leaders/" + name
            );

        leaderRef.transaction(function (currentValue) {

            return (currentValue || 0) + 1;

        }).catch(function (error) {

            console.error(
                "Ошибка Firebase:",
                error
            );

        });
    }


    // =========================
    // ОТОБРАЖЕНИЕ ЛИДЕРОВ
    // =========================

    const leadersList =
        document.querySelector(".leaders-list");


    const leaderDisplayNames = {
        "егор": "Егор",
        "леша": "Леша",
        "влад": "Влад",
        "глеб": "Глеб",
        "артур": "Артур",
        "денис": "Денис",
        "лев": "Лев",
        "вадим": "Вадим",
        "андрей": "Андрей",

        "никита": "Никита",
        "лера": "Лера",
        "рита": "Рита",
        "макс": "Макс",
        "артем": "Артем"
    };


    leadersRef.on("value", function (snapshot) {

        if (!leadersList) {
            return;
        }

        const data =
            snapshot.val() || {};


        const entries =
            Object.entries(data);


        entries.sort(function (a, b) {
            return b[1] - a[1];
        });


        leadersList.innerHTML = "";


        entries.forEach(function (entry, index) {

            const name = entry[0];
            const count = entry[1];

            const row =
                document.createElement("div");

            row.className =
                "leader-row";


            const displayName =
                leaderDisplayNames[name] || name;


            row.innerHTML =
                "<span>" +
                (index + 1) +
                ". " +
                displayName +
                "</span>" +

                "<span>" +
                count +
                "</span>";


            leadersList.appendChild(row);
        });


        if (entries.length === 0) {

            leadersList.innerHTML =
                "<div class=\"leader-row\">" +
                "<span>Пока никто</span>" +
                "<span>0</span>" +
                "</div>";
        }

    });


    // =========================
    // КНОПКА ПОСЛАТЬ НАХУЙ
    // =========================

    function setupPersonButton(name) {

        if (!sendPersonButton) {
            return;
        }


        // =========================
        // СПЕЦИАЛЬНАЯ КНОПКА
        // =========================

        if (
            specialNames.includes(name) ||
            name === "__unknown__"
        ) {

            sendPersonButton.textContent =
                "ПОСЛАТЬ НАХУЙ";

            sendPersonButton.style.display =
                "block";


            sendPersonButton.onclick =
                function () {

                    // Если это настоящее имя —
                    // добавляем +1

                    if (name !== "__unknown__") {
                        addLeaderPoint(name);
                    }


                    let fuckImage =
                        document.getElementById(
                            "fuckImage"
                        );


                    if (!fuckImage) {

                        fuckImage =
                            document.createElement(
                                "img"
                            );

                        fuckImage.id =
                            "fuckImage";

                        fuckImage.src =
                            "images/fuck.png";

                        fuckImage.alt =
                            "FUCK";


                        const resultImages =
                            document.querySelector(
                                ".resultImages"
                            );


                        if (resultImages) {

                            resultImages.appendChild(
                                fuckImage
                            );
                        }
                    }


                    fuckImage.style.display =
                        "block";


                    const fuckSound =
                        new Audio(
                            "sounds/FUCK.mp3"
                        );


                    fuckSound.currentTime =
                        0;


                    fuckSound.play().catch(
                        function (error) {

                            console.log(
                                "Звук заблокирован браузером:",
                                error
                            );

                        }
                    );

                };


            return;
        }


        // =========================
        // TELEGRAM-КНОПКА
        // =========================

        const username =
            telegramPeople[name];


        if (!username) {

            sendPersonButton.style.display =
                "none";

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
            "послать " +
            displayNames[name] +
            " нахуй";


        sendPersonButton.style.display =
            "block";


        sendPersonButton.onclick =
            function () {

                // Сначала +1 в Firebase

                addLeaderPoint(name);


                const message =
                    encodeURIComponent(
                        "иди нахуй!!!"
                    );


                window.location.href =
                    "https://t.me/" +
                    username +
                    "?text=" +
                    message;

            };

    }


    // =========================
    // ФЕЙЕРВЕРК
    // =========================

    const canvas =
        document.getElementById("fireworks");

    const ctx =
        canvas.getContext("2d");


    const celebrationSound =
        document.getElementById(
            "celebrationSound"
        );


    let particles = [];
    let fireworksRunning = false;


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }


    resizeCanvas();


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    function createFirework() {

        const x =
            Math.random() *
            canvas.width;


        const y =
            Math.random() *
            canvas.height *
            0.55;


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
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        for (let i = 0; i < 80; i++) {

            const angle =
                Math.random() *
                Math.PI *
                2;


            const speed =
                Math.random() *
                7 +
                2;


            particles.push({

                x: x,
                y: y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed,

                life: 100,

                color: color,

                size:
                    Math.random() *
                    3 +
                    1

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


        particles.forEach(
            function (particle, index) {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    0.05;

                particle.life--;


                ctx.globalAlpha =
                    particle.life / 100;


                ctx.fillStyle =
                    particle.color;


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

                    particles.splice(
                        index,
                        1
                    );

                }

            }
        );


        ctx.globalAlpha = 1;


        requestAnimationFrame(
            animateFireworks
        );

    }


    function startCelebration() {

        fireworksRunning = true;

        particles = [];


        animateFireworks();


        if (celebrationSound) {

            celebrationSound.currentTime =
                0;


            celebrationSound.play().catch(
                function (error) {

                    console.log(
                        "Звук заблокирован браузером:",
                        error
                    );

                }
            );

        }


        setTimeout(
            function () {

                fireworksRunning =
                    false;

                particles = [];


                ctx.clearRect(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            },
            5000
        );

    }


    // =========================
    // ОСНОВНЫЕ ЭЛЕМЕНТЫ
    // =========================

    const checkButton =
        document.getElementById(
            "checkButton"
        );


    const nameInput =
        document.getElementById(
            "nameInput"
        );


    const modal =
        document.getElementById(
            "resultModal"
        );


    const closeModal =
        document.getElementById(
            "closeModal"
        );


    const resultImage =
        document.getElementById(
            "resultImage"
        );


    const resultImage2 =
        document.getElementById(
            "resultImage2"
        );


    const resultText =
        document.getElementById(
            "resultText"
        );


    // =========================
    // FUCK IMAGE
    // =========================

    function hideFuckImage() {

        const fuckImage =
            document.getElementById(
                "fuckImage"
            );


        if (fuckImage) {

            fuckImage.style.display =
                "none";

        }

    }


    // =========================
    // ОБЫЧНЫЕ ВИДЕО
    // =========================

    function showSpecialVideo(videoFile) {

        resultImage.style.display =
            "none";

        resultImage2.style.display =
            "none";


        let specialVideo =
            document.getElementById(
                "specialVideo"
            );


        if (!specialVideo) {

            specialVideo =
                document.createElement(
                    "video"
                );


            specialVideo.id =
                "specialVideo";


            specialVideo.controls =
                true;


            specialVideo.autoplay =
                true;


            specialVideo.playsInline =
                true;


            specialVideo.style.width =
                "100%";


            specialVideo.style.maxWidth =
                "700px";


            specialVideo.style.maxHeight =
                "70vh";


            specialVideo.style.display =
                "block";


            specialVideo.style.margin =
                "0 auto";


            const resultImages =
                document.querySelector(
                    ".resultImages"
                );


            resultImages.appendChild(
                specialVideo
            );

        }


        specialVideo.src =
            videoFile;


        specialVideo.style.display =
            "block";


        specialVideo.currentTime =
            0;


        specialVideo.play().catch(
            function (error) {

                console.log(
                    "Видео не запустилось автоматически:",
                    error
                );

            }
        );

    }


    function hideSpecialVideo() {

        const specialVideo =
            document.getElementById(
                "specialVideo"
            );


        if (specialVideo) {

            specialVideo.pause();

            specialVideo.currentTime =
                0;

            specialVideo.style.display =
                "none";

        }

    }


    // =========================
    // ИРИСКА
    // =========================

    function hideIriskVideo() {

        const iriskaVideo =
            document.getElementById(
                "iriskaVideo"
            );


        if (iriskaVideo) {

            iriskaVideo.pause();

            iriskaVideo.currentTime =
                0;

            iriskaVideo.style.display =
                "none";

        }

    }


    function playIriskSound(file) {

        const sound =
            new Audio(file);


        sound.currentTime =
            0;


        sound.play().catch(
            function (error) {

                console.log(
                    "Звук Ириски не запустился:",
                    error
                );

            }
        );


        return sound;

    }


    // =========================
    // ПРОВЕРКА
    // =========================

    checkButton.addEventListener(
        "click",
        function () {

            const name =
                nameInput.value
                    .trim()
                    .toLowerCase();


            resultText.classList.remove(
                "eblanText"
            );


            hideFuckImage();

            hideSpecialVideo();

            hideIriskVideo();


            console.log(
                "Введено:",
                name
            );


            // =========================
            // 67
            // =========================

            if (name === "67") {

                resultText.textContent =
                    "";


                setupPersonButton(
                    "__unknown__"
                );


                showSpecialVideo(
                    "videos/video1.mp4"
                );


                modal.style.display =
                    "flex";


                return;

            }


            // =========================
            // 1488
            // =========================

            if (name === "1488") {

                resultText.textContent =
                    "";


                setupPersonButton(
                    "__unknown__"
                );


                showSpecialVideo(
                    "videos/video2.mp4"
                );


                modal.style.display =
                    "flex";


                return;

            }


            // =========================
            // ПУСТОЙ ВВОД
            // =========================

            if (name === "") {

                resultText.textContent =
                    "Еблан?";


                resultText.classList.add(
                    "eblanText"
                );


                resultImage.style.display =
                    "none";


                resultImage2.style.display =
                    "none";


                sendPersonButton.style.display =
                    "none";


                modal.style.display =
                    "flex";


                return;

            }


            // =========================
            // ЗЛАЯ ИРИСКА
            // =========================

            if (name === "злая ириска") {

                resultImage.src =
                    "images/iriska.png";


                resultImage.style.display =
                    "block";


                resultImage2.style.display =
                    "none";


                resultText.textContent =
                    "";


                playIriskSound(
                    "sounds/iriska1.mp3"
                );


                sendPersonButton.textContent =
                    "ПОГЛАДИТЬ";


                sendPersonButton.style.display =
                    "block";


                sendPersonButton.onclick =
                    function () {

                        playIriskSound(
                            "sounds/iriska2.mp3"
                        );


                        resultImage.style.display =
                            "none";


                        resultImage2.style.display =
                            "none";


                        let iriskaVideo =
                            document.getElementById(
                                "iriskaVideo"
                            );


                        if (!iriskaVideo) {

                            iriskaVideo =
                                document.createElement(
                                    "video"
                                );


                            iriskaVideo.id =
                                "iriskaVideo";


                            iriskaVideo.src =
                                "videos/iriska.mp4";


                            iriskaVideo.controls =
                                true;


                            iriskaVideo.autoplay =
                                true;


                            iriskaVideo.playsInline =
                                true;


                            iriskaVideo.style.width =
                                "100%";


                            iriskaVideo.style.maxWidth =
                                "700px";


                            iriskaVideo.style.maxHeight =
                                "70vh";


                            iriskaVideo.style.display =
                                "block";


                            iriskaVideo.style.margin =
                                "0 auto";


                            const resultImages =
                                document.querySelector(
                                    ".resultImages"
                                );


                            if (resultImages) {

                                resultImages.appendChild(
                                    iriskaVideo
                                );

                            }

                        }


                        iriskaVideo.src =
                            "videos/iriska.mp4";


                        iriskaVideo.style.display =
                            "block";


                        iriskaVideo.currentTime =
                            0;


                        iriskaVideo.play().catch(
                            function (error) {

                                console.log(
                                    "Видео Ириски не запустилось:",
                                    error
                                );

                            }
                        );


                        sendPersonButton.style.display =
                            "none";

                    };


                modal.style.display =
                    "flex";


                return;

            }


            // =========================
            // ПРОВЕРКА ВВОДА
            // =========================

            if (!/^[а-яё]+$/i.test(name)) {

                resultText.textContent =
                    "Еблан?";


                resultText.classList.add(
                    "eblanText"
                );


                resultImage.style.display =
                    "none";


                resultImage2.style.display =
                    "none";


                sendPersonButton.style.display =
                    "none";


                modal.style.display =
                    "flex";


                return;

            }


            // =========================
            // НИКИТА
            // =========================

            if (name === "никита") {

                resultImage.src =
                    "images/nikita.jpg";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "ВЫ ЖИРНЫЙ СВИНКА";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ЛЕРА
            // =========================

            else if (name === "лера") {

                resultImage.src =
                    "images/lera1.png";

                resultImage2.src =
                    "images/lera2.jpg";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "block";

                resultText.textContent =
                    "ВЫ АЛЬТУШКА 10 ЛЕТ (ЖИРНАЯ)";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ВЛАД
            // =========================

            else if (
                name === "владик" ||
                name === "владислав" ||
                name === "влад"
            ) {

                resultImage.src =
                    "images/vlad.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(
                    "влад"
                );

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ГЛЕБ
            // =========================

            else if (name === "глеб") {

                resultImage.src =
                    "images/gleb.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // АРТУР
            // =========================

            else if (name === "артур") {

                resultImage.src =
                    "images/artur.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ДЕНИС
            // =========================

            else if (name === "денис") {

                resultImage.src =
                    "images/denis.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ЛЕВ
            // =========================

            else if (name === "лев") {

                resultImage.src =
                    "images/lev.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // РИТА
            // =========================

            else if (name === "рита") {

                resultImage.src =
                    "images/rita.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ЕГОР
            // =========================

            else if (name === "егор") {

                resultImage.src =
                    "images/egor.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ЛЕША / АЛЕКСЕЙ
            // =========================

            else if (
                name === "леша" ||
                name === "алексей" ||
                name === "лёша"
            ) {

                resultImage.src =
                    "images/lesha.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(
                    "леша"
                );

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // ВАДИМ
            // =========================

            else if (name === "вадим") {

                resultImage.src =
                    "images/vadim.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // АНДРЕЙ
            // =========================

            else if (name === "андрей") {

                resultImage.src =
                    "images/andrey.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(name);

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // АРТЕМ
            // =========================

            else if (
                name === "артем" ||
                name === "артём"
            ) {

                resultImage.src =
                    "images/artem.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                // Для обоих вариантов
                // записываем в одного Артема

                setupPersonButton(
                    "артем"
                );

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // МАКС
            // =========================

            else if (
                name === "макс" ||
                name === "максим"
            ) {

                resultImage.src =
                    "images/maks.png";

                resultImage.style.display =
                    "block";

                resultImage2.style.display =
                    "none";

                resultText.textContent =
                    "";

                setupPersonButton(
                    "макс"
                );

                modal.style.display =
                    "flex";

                startCelebration();

            }


            // =========================
            // НЕИЗВЕСТНОЕ РУССКОЕ ИМЯ
            // =========================

            else {

                const randomImage =
                    randomImages[
                        Math.floor(
                            Math.random() *
                            randomImages.length
                        )
                    ];


                resultImage.src =
                    randomImage;


                resultImage.style.display =
                    "block";


                resultImage2.style.display =
                    "none";


                resultText.textContent =
                    "";


                setupPersonButton(
                    "__unknown__"
                );


                // Для неизвестного имени
                // тоже будем считать его,
                // но именно под введенным именем

                sendPersonButton.onclick =
                    function () {

                        addLeaderPoint(name);


                        let fuckImage =
                            document.getElementById(
                                "fuckImage"
                            );


                        if (!fuckImage) {

                            fuckImage =
                                document.createElement(
                                    "img"
                                );


                            fuckImage.id =
                                "fuckImage";


                            fuckImage.src =
                                "images/fuck.png";


                            fuckImage.alt =
                                "FUCK";


                            const resultImages =
                                document.querySelector(
                                    ".resultImages"
                                );


                            if (resultImages) {

                                resultImages.appendChild(
                                    fuckImage
                                );

                            }

                        }


                        fuckImage.style.display =
                            "block";


                        const fuckSound =
                            new Audio(
                                "sounds/FUCK.mp3"
                            );


                        fuckSound.play().catch(
                            function (error) {

                                console.log(
                                    "Звук заблокирован:",
                                    error
                                );

                            }
                        );

                    };


                modal.style.display =
                    "flex";


                startCelebration();

            }

        }
    );


    // =========================
    // ЗАКРЫТИЕ МОДАЛКИ
    // =========================

    closeModal.addEventListener(
        "click",
        function () {

            modal.style.display =
                "none";


            hideSpecialVideo();

            hideIriskVideo();

        }
    );


    // =========================
    // СВИНКА
    // =========================

    const secondButton =
        document.getElementById(
            "secondButton"
        );


    secondButton.addEventListener("click", function () {
    hideSpecialVideo();
    hideIriskVideo();

    resultImage.src = "images/pig1.jpg";
    resultImage.style.display = "block";
    resultImage2.style.display = "none";

    resultText.textContent = "";

    // Убираем FUCK, если он остался от предыдущего результата
    const fuckImage = document.getElementById("fuckImage");
    if (fuckImage) {
        fuckImage.style.display = "none";
    }

    if (sendPersonButton) {
        sendPersonButton.style.display = "none";
    }

    modal.style.display = "flex";

    // ВАЖНО: тут больше нет startCelebration()
});


    // =========================
    // TELEGRAM СОЗДАТЕЛЯ
    // =========================

    const telegramButton =
        document.getElementById(
            "telegramButton"
        );


    telegramButton.addEventListener(
        "click",
        function () {

            const message =
                encodeURIComponent(
                    "иди нахуй!!!"
                );


            window.location.href =
                "https://t.me/kl0ndaik?text=" +
                message;

        }
    );


    // =========================
    // МУРИНО FM
    // =========================

    const musicAudio =
        document.getElementById(
            "musicAudio"
        );


    const musicPlayButton =
        document.getElementById(
            "musicPlayButton"
        );


    const musicPlayIcon =
        document.getElementById(
            "musicPlayIcon"
        );


    const musicVolume =
        document.getElementById(
            "musicVolume"
        );


    const MUSIC_TRACK_COUNT = 20;

    const musicTracks = [];


    for (
        let i = 1;
        i <= MUSIC_TRACK_COUNT;
        i++
    ) {

        musicTracks.push(
            "music/" + i + ".mp3"
        );

    }


    let currentMusicTrack = -1;

    let musicStarted = false;


    function getRandomMusicTrack() {

        let randomIndex;


        do {

            randomIndex =
                Math.floor(
                    Math.random() *
                    musicTracks.length
                );

        } while (
            musicTracks.length > 1 &&
            randomIndex ===
            currentMusicTrack
        );


        return randomIndex;

    }


    function playRandomMusic() {

        if (
            musicTracks.length === 0
        ) {

            return;

        }


        const trackIndex =
            getRandomMusicTrack();


        currentMusicTrack =
            trackIndex;


        musicAudio.src =
            musicTracks[trackIndex];


        musicAudio.volume =
            musicVolume.value;


        musicAudio.play()
            .then(
                function () {

                    musicStarted =
                        true;


                    musicPlayIcon.textContent =
                        "Ⅱ";

                }
            )
            .catch(
                function (error) {

                    console.log(
                        "Музыка не запустилась:",
                        error
                    );

                }
            );

    }


    musicPlayButton.addEventListener(
        "click",
        function () {

            if (!musicStarted) {

                playRandomMusic();

                return;

            }


            if (musicAudio.paused) {

                musicAudio.play()
                    .then(
                        function () {

                            musicPlayIcon.textContent =
                                "Ⅱ";

                        }
                    )
                    .catch(
                        function (error) {

                            console.log(
                                "Не удалось продолжить:",
                                error
                            );

                        }
                    );

            }


            else {

                musicAudio.pause();

                musicPlayIcon.textContent =
                    "▶";

            }

        }
    );


    musicVolume.addEventListener(
        "input",
        function () {

            musicAudio.volume =
                musicVolume.value;

        }
    );


    musicAudio.addEventListener(
        "ended",
        function () {

            playRandomMusic();

        }
    );


    // =========================
    // ЛИДЕРЫ — ОТКРЫТИЕ
    // =========================

    const leadersButton =
        document.getElementById(
            "leadersButton"
        );


    const leadersModal =
        document.getElementById(
            "leadersModal"
        );


    const closeLeaders =
        document.getElementById(
            "closeLeaders"
        );


    if (leadersButton) {

        leadersButton.addEventListener(
            "click",
            function () {

                leadersModal.style.display =
                    "flex";

            }
        );

    }


    if (closeLeaders) {

        closeLeaders.addEventListener(
            "click",
            function () {

                leadersModal.style.display =
                    "none";

            }
        );

    }


    if (leadersModal) {

        leadersModal.addEventListener(
            "click",
            function (e) {

                if (
                    e.target === leadersModal
                ) {

                    leadersModal.style.display =
                        "none";

                }

            }
        );

    }

});