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
        diceDisplay.textContent = roll;
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
        }
    });
});