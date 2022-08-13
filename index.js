let scoreDiv = document.getElementById("scoreDiv");
let selectedStr = document.getElementById("selectedStr");
let totleTilesDiv = document.getElementById("totleTilesDiv");
let completed = document.getElementById("rightSide");
let obj = {};
let wordScore = 0;
let totalScore = 0;
let counter = 10;
let isGameOver = false;
let selectedLatters ="";
let totleTiles = 0;
let scors = 0;





// generate random Alphabet
function generateAlphabet(length) {
  var result = [];
  var characters = "BCDFGHJKLMNPQRSTVWXYZ";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    let temp = characters.charAt(Math.floor(Math.random() * charactersLength));
    result.push(temp);
  }
  return result;
}

function latterBoard() {
  const latters = generateAlphabet(15);
  const board = document.getElementById("board");
  let vowel = "UOIEA";
  for (let i = 0; i < 5; i++) {
    latters.unshift(vowel[i]);
  }
  let specialChar = generateSpacilTilePossition();
  let DL = specialChar[0];
  let TL = specialChar[1];
  let DW = specialChar[2];
  let TW = specialChar[3];

  
  board.innerHTML = "";
  latters.map((item, index) => {
    let scoreValue = null;
    if (
      item === "A" ||
      item === "E" ||
      item == "I" ||
      item == "O" ||
      item == "U" ||
      item == "L" ||
      item == "N" ||
      item == "S" ||
      item == "T" ||
      item == "R"
    ) {
      scoreValue = 1;
    } else if (item == "D" || item == "G") {
      scoreValue = 2;
    } else if (item == "B" || item == "C" || item == "M" || item == "P") {
      scoreValue = 3;
    } else if (
      item == "F" ||
      item == "H" ||
      item == "V" ||
      item == "W" ||
      item == "Y"
    ) {
      scoreValue = 4;
    } else if (item == "K") {
      scoreValue = 5;
    } else if (item == "J" || item == "X") {
      scoreValue = 8;
    } else if (item === "Q" || "Z") {
      scoreValue = 10;
    }
    let main = document.createElement("div");
    let numberOfOccure = Math.floor(Math.random() * 5);
    totleTiles += numberOfOccure+1;
    totleTilesDiv.innerText = totleTiles;

    let div = document.createElement("div");
    div.setAttribute("class", "latter");
    let char = document.createElement("p");
    char.innerText = item;
    let special = document.createElement("p");
    special.setAttribute("class", "special");
    if (index == DL) {
      special.innerText = "DL";
      div.style.backgroundColor = "green";
    } else if (index == TL) {
      special.innerText = "TL";
      div.style.backgroundColor = "orange";
    } else if (index == DW) {
      special.innerText = "DW";
      div.style.backgroundColor = "#086e7a";
    } else if (index == TW) {
      special.innerText = "TW";
      div.style.backgroundColor = "rgb(53, 53, 255)";
    }

    let score = document.createElement("p");
    score.setAttribute("class", "score");
    score.innerText = scoreValue;
    div.append(char, score, special);
    main.append(div);

    let numDiv = document.createElement("div");
    main.addEventListener("click", handleClick);
    generateNums(main, numberOfOccure, numDiv);
    console.log("numberOf", numberOfOccure);

    board.append(main);
    function handleClick() {
      numberOfOccure--;

      !isGameOver && numberOfOccure < 0
        ? (main.style.visibility = "hidden")
        : "";
      if (!isGameOver) {
        updateTiles()
        generateNums(main, numberOfOccure, numDiv);
        if (index == DL) {
          totalScore += scoreValue * 2;
        } else if (index == TL) {
          totalScore += scoreValue * 3;
        }
        else if (index == DW) {
          totalScore=totalScore*2
        }
        else if (index == TW) {
          totalScore=totalScore*3
          }
        else totalScore += scoreValue;

       
      }
 
      
      isGameOver ? main.removeEventListener("click", handleClick) : "";
      !isGameOver ? (selectedLatters += item) : selectedLatters;
      selectedStr.innerText = selectedLatters;
    }
    completed.addEventListener("click", () => {
      scors = scors + totalScore
      
      scoreDiv.innerHTML=null
      scoreDiv.innerText = scors;
      selectedLatters.length > 0 ? obj[selectedLatters] = totalScore : null
      selectedStr.innerText=""
      selectedLatters = ""
      totalScore = 0;
      console.log("handleCompleted",scors)
      
    })
    
  });
}

latterBoard();

function generateNums(main, numberOfOccure, numDiv) {
  numDiv.innerHTML = "";
  for (let i = 0; i < numberOfOccure; i++) {
    let num = document.createElement("div");
    num.setAttribute("class", "nums");
    numDiv.append(num);
  }
  main.append(numDiv);
}

function generateSpacilTilePossition() {
  let i = 0;
  let n = 4;
  let arr = [];
  while (i < n) {
    let randomNum = Math.floor(Math.random() * 20);
    if (!arr.includes(randomNum)) {
      arr.push(randomNum);
      i++;
    }
  }

  return arr;
}

function gameTimer(counter) {
  let timerDiv = document.getElementById("timer");
  let timer = setInterval(timerStart, 1000);
  function timerStart() {
    timerDiv.innerText = counter - 1;
    
    counter--;
    if (counter == 0) {
      localStorage.setItem("totleScore", scors)
      localStorage.setItem("words",JSON.stringify(obj))
      console.log("game over");
      clearInterval(timer);
      isGameOver = true;
      setTimeout(() => {
        window.location.href = "/gavmeOver.html";
        console.log(obj,"-------")
      },0)
    }
  }
}
gameTimer(counter);

function updateTiles() {
  totleTiles--
  totleTilesDiv.innerHTML = "";
  totleTilesDiv.innerText=totleTiles
}


