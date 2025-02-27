function validateChoice() {
    let choices = document.getElementsByName("option");
    let selectedOption = null;

    for (let choice of choices) {
        if (choice.checked) {
            selectedOption = choice.value;
            break;
        }
    }

    if (!selectedOption) {
        alert("Tu dois choisir une option avant de valider.");
        return;
    }

    document.getElementById("choiceForm").style.display = "none";

    let suspenseDiv = document.getElementById("suspense");
    suspenseDiv.classList.remove("hidden");

    let count = 3;
    suspenseDiv.innerText = count;

    let countdown = setInterval(() => {
        count--;
        suspenseDiv.innerText = count;

        if (count === 0) {
            clearInterval(countdown);
            suspenseDiv.classList.add("hidden");
            showResult(selectedOption);
        }
    }, 1000);
}

function showResult(option) {
    let resultDiv = document.getElementById("result");
    let body = document.body;

    let messages = {
        "1": "🌸 Une pluie de fleurs pour toi !",
        "2": "🎆 Pétards et feux d'artifice !",
        "3": "😞 Dommage, mauvais choix...",
        "4": "🔄 Seconde chance ! Essaye encore."
    };

    if (option === "4") {
        body.style.backgroundColor = "red";
        setTimeout(() => {
            location.reload();
        }, 3000);
        return;
    }

    let displayMessage = `<p><strong>Résultats :</strong></p>`;
    for (let i = 1; i <= 4; i++) {
        if (i == option) {
            displayMessage += `<p style="color:green; font-weight:bold;">✔ Option ${i} : ${messages[i]}</p>`;
        } else {
            displayMessage += `<p style="color:red;">❌ Option ${i} : ${messages[i]}</p>`;
        }
    }

    displayMessage += `<p class="large-text">${messages[option]}</p>`;
    resultDiv.innerHTML = displayMessage;

    if (option === "1") {
        startBackgroundAnimation();
        startFlowersAnimation();
    } else if (option === "2") {
        body.style.backgroundColor = "blue";
        startFireworksAnimation();
    } else if (option === "3") {
        resultDiv.innerHTML += `<p class="large-text">😞</p>`;
        body.style.backgroundColor = "gray";
    }
}

// 🌈 Fond qui change de couleur toutes les 700ms
let colors = ["white", "red", "blue", "pink"];
let colorIndex = 0;

function startBackgroundAnimation() {
    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 700);
}

// 🌸 10 fleurs en même temps
function startFlowersAnimation() {
    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            let flower = document.createElement("div");
            flower.classList.add("flower");
            document.body.appendChild(flower);

            flower.style.left = Math.random() * window.innerWidth + "px";
            flower.style.top = Math.random() * window.innerHeight + "px";

            setTimeout(() => {
                flower.remove();
            }, 2000);
        }
    }, 500);
}

// 🎆 10 pétards en même temps
function startFireworksAnimation() {
    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            let firework = document.createElement("div");
            firework.classList.add("firework");
            document.body.appendChild(firework);

            firework.style.left = Math.random() * window.innerWidth + "px";
            firework.style.top = Math.random() * window.innerHeight + "px";

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }
    }, 300);
}

// 🎛 Changer le fond du texte en blanc quand on appuie sur le bouton
function startReading() {
    document.getElementById("result").style.backgroundColor = "white";
}
function stopReading() {
    document.getElementById("result").style.backgroundColor = "transparent";
}
function sendChoice(option) {
	fetch("save_choice.php", {
		method: "POST"
		headers: {"content-type":"application/x-www-form-urlencded"},
	body: "option=" + option});
}