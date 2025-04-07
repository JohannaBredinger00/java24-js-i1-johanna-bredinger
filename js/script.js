document.addEventListener("DOMContentLoaded", () => {
    let playerName = "";
    let totalScore = 0;
    let roundScore = 0;
    let roundsPlayed = 0;

    const nameInput = document.getElementById("playerName");
    const nameDisplay = document.getElementById("nameDisplay");
    const totalScoreDisplay = document.getElementById("totalScore");
    const roundScoreDisplay = document.getElementById("roundScore");
    const roundsDisplay = document.getElementById("rounds");
    const diceDisplay = document.getElementById("dice");
    const rollButton = document.getElementById("roll");
    const holdButton = document.getElementById("hold");
    const messageDisplay = document.getElementById("message");


    document.getElementById("startGame").addEventListener("click", () => {
        playerName = nameInput.value.trim();
        if(playerName === "")  {
            messageDisplay.textContent = "Vänligen ange ditt namn" 
            return;
        }
    
    messageDisplay.textContent = "";
    nameDisplay.textContent = playerName;

    nameInput.style.display = "none";
    document.getElementById("nameLabel").style.display = "none";
    document.getElementById("startGame").style.display = "none";
    });

    rollButton.addEventListener("click", () => {
        if(!playerName) return alert("Starta spelet först!");
        let roll = Math.floor(Math.random() * 6) + 1;

        //  diceDisplay.textContent = roll;
        const diceImg = document.getElementById("diceImage");

        diceImg.classList.remove("shake");
        void diceImg.offsetWidth;
        diceImg.classList.add("shake");

         diceImg.src = `./img/dice${roll}.png`;

        // document.getElementById("diceImage").src = `./img/dice${roll}.png`;

        if(roll === 1) {
            roundScore = 0;
            roundsPlayed++;
            roundScoreDisplay.textContent = roundScore;
            roundsDisplay.textContent = roundsPlayed;
        }else {
            roundScore += roll;
            roundScoreDisplay.textContent = roundScore;
        }
    });

    holdButton.addEventListener("click", () => {
        if(!playerName) return("Starta spelet först!");
        totalScore += roundScore;
        roundsPlayed++;
        totalScoreDisplay.textContent = totalScore;
        roundsDisplay.textContent = roundsPlayed;
        roundScore = 0;
        roundScoreDisplay.textContent = roundScore;

        if(totalScore >= 100){
            messageDisplay.textContent = `${playerName} har vunnit spelet på ${roundsPlayed} omgångar!`;

            
            rollButton.disabled = true;
            holdButton.disabled = true;

            showsimpleConfetti();

            document.getElementById("resetGame").style.display = "block";
        }

        document.getElementById("resetGame").addEventListener("click", () => {
            totalScore = 0;
            roundScore = 0;
            roundsPlayed = 0;

            totalScoreDisplay.textContent = totalScore;
            roundScoreDisplay.textContent = roundScore;
            roundsDisplay.textContent = roundsPlayed;
            diceDisplay.textContent = "-";
            messageDisplay.textContent = "";

            rollButton.disabled = false;
            holdButton.disabled = false;

            document.getElementById("resetGame").style.display = "none";
        })

        function showsimpleConfetti(){
            const confettiContainer = document.getElementById("simpleConfetti");
            confettiContainer.innerHTML = "";

            for(let i = 0; i < 100; i++){
                const confetti = document.createElement("div");
                confetti.classList.add("confetti");

                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 60%)`;
                confetti.style.animationDelay = Math.random() * 2 + "s";

                confettiContainer.appendChild(confetti);
            }

            confettiContainer.style.display = "block";

            setTimeout(() => {
                confettiContainer.style.display = "none";
                confettiContainer.innerHTML = "";
            }, 5000);
        }

    
    });
});