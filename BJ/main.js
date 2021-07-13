const start = document.getElementById("start");

start.addEventListener("click", (event) => {
  const cardContainer = document.getElementById("cardContainer");
  const appCardContainer = document.getElementById("marcador");
  const buttons = document
    .getElementById("buttons")
    .getElementsByTagName("div");
  buttons[2].id = "hit";
  buttons[3].id = "stay";

  //Hide start button and show restart buttons
  let restartBtn = document.getElementById("restart");
  restartBtn.style.display = "block";
  start.style.display = "none";

  const hit = document.getElementById("hit");
  const stay = document.getElementById("stay");

  const userCount = document.getElementById("userHand");
  const appCount = document.getElementById("appHand");
  let appTotal = [];
  let userTotal = [];

  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const cardsInfo = JSON.parse(xhttp.responseText);

      for (let i = 0; i < 2; i++) {
        //Choose a random value for user card
        let randomValue = Math.floor(Math.random() * 13);
        let randomShape = Math.floor(Math.random() * 4);
        let shape = ["♥", "♦", "♣", "♠"];

        //create the user card
        let userCard = document.createElement("div");
        userCard.classList.add("card");

        //Add value to the user card
        let value = document.createElement("p");
        value.innerHTML = cardsInfo[randomValue].name;
        userCard.appendChild(value);

        //Add shape to the user card
        let shapeContainer = document.createElement("p");
        shapeContainer.innerHTML = shape[randomShape];
        userCard.appendChild(shapeContainer);
        //Append card to the user card container
        cardContainer.appendChild(userCard);

        let valueDown = document.createElement("p");
        valueDown.innerHTML = cardsInfo[randomValue].name;
        userCard.appendChild(valueDown);

        //Set the initial user value
        userTotal[i] = cardsInfo[randomValue].value;
      }
      //display the initial app value
      let userInn = userTotal[0] + userTotal[1];
      userCount.innerHTML = userInn;

      ///APP FIRST 2 CARDS

      //Choose a random value for app card
      let randomAppValue = Math.floor(Math.random() * 13);
      let randomAppShape = Math.floor(Math.random() * 4);
      let appShape = ["♥", "♦", "♣", "♠"];

      //create the app card
      let appCard = document.createElement("div");
      appCard.classList.add("card");

      //Add value to the app card
      let appValue = document.createElement("p");
      appValue.innerHTML = cardsInfo[randomAppValue].name;
      appCard.appendChild(appValue);

      //Add shape to the app card
      let appShapeContainer = document.createElement("p");
      appShapeContainer.innerHTML = appShape[randomAppShape];
      appCard.appendChild(appShapeContainer);

      let valueDown = document.createElement("p");
      valueDown.innerHTML = cardsInfo[randomAppValue].name;
      appCard.appendChild(valueDown);
      //Append card to the app card container
      appCardContainer.appendChild(appCard);

      //Set the initial app value
      appTotal = cardsInfo[randomAppValue].value;

      let appHidenCard = document.createElement("div");
      appHidenCard.classList.add("card");
      appHidenCard.classList.add("hidenCard");
      appCardContainer.appendChild(appHidenCard);

      let appInn = appTotal;
      appCount.innerHTML = appInn;

      const message = document.getElementById("message");
      const gameEnding = document.getElementById("gameEnding");
      let cards = cardContainer.getElementsByTagName("div");

      function hideBtns() {
        hit.style.display = "none";
        stay.style.display = "none";
        restart.style.display = "none";
      }

      if (userInn == 21) {
        message.style.display = "grid";
        gameEnding.innerHTML = "Has obtenido un BlackJack! has ganado.";

        hideBtns();
      } else {
        //HIT
        hit.addEventListener("click", (event) => {
          let randomShape = Math.floor(Math.random() * 4);
          let randomValue = Math.floor(Math.random() * 13);
          let shape = ["♥", "♦", "♣", "♠"];

          let a = document.createElement("div");
          a.classList.add("card");

          let cValue = document.createElement("p");
          let cShape = document.createElement("p");
          cValue.innerHTML = cardsInfo[randomValue].name;
          cShape.innerHTML = shape[randomShape];

          a.appendChild(cValue);
          a.appendChild(cShape);
          cardContainer.appendChild(a);
          let valueDown = document.createElement("p");
          valueDown.innerHTML = cardsInfo[randomValue].name;
          a.appendChild(valueDown);

          let userValue = (userInn += cardsInfo[randomValue].value2);
          userCount.innerHTML = userValue;

          if (userValue > 21) {
            message.style.display = "grid";
            gameEnding.innerHTML = "Has sobrepasado 21, has perdido.";

            hit.style.display = "none";
            stay.style.display = "none";
            restartBtn.style.display = "none";
          }
        });
      }

      function reset() {
        window.location.reload();
      }

      let retry = document.getElementById("playAgain");

      retry.addEventListener("click", reset);
      restartBtn.addEventListener("click", reset);

      stay.addEventListener("click", (event) => {
        let randomShape = Math.floor(Math.random() * 4);
        let randomValue = Math.floor(Math.random() * 13);
        let shape = ["♥", "♦", "♣", "♠"];

        appHidenCard.style.display = "none";

        let appCard = document.createElement("div");
        appCard.classList.add("card");

        //Add value to the app card
        let appValue = document.createElement("p");
        appValue.innerHTML = cardsInfo[randomValue].name;
        appCard.appendChild(appValue);

        //Add shape to the app card
        let appShapeContainer = document.createElement("p");
        appShapeContainer.innerHTML = shape[randomShape];
        appCard.appendChild(appShapeContainer);
        //Append card to the app card container
        appCardContainer.appendChild(appCard);

        let appCountTotal = appInn + cardsInfo[randomValue].value;
        appCount.innerHTML = appCountTotal;

        if (userInn < appCountTotal) {
          message.style.display = "grid";
          gameEnding.innerHTML = "El crupier ha ganado!";
          hideBtns();
        } else if (userInn > appCountTotal) {
          message.style.display = "grid";
          gameEnding.innerHTML = "Has ganado!";
          hideBtns();
        } else if (userInn == appCountTotal) {
          message.style.display = "grid";
          gameEnding.innerHTML = "Es un empate.";
          hideBtns();
        }
      });
    }
  };
  xhttp.open("GET", "cards.json", true);
  xhttp.send();
});
