import drawAliens from "./drawAliens";
import createSquares from "./createSquares";
import remove from "./remove";
import getScore from "./getScore";

const script = () => {
  const grid = document.querySelector(".grid");
  const currentResultsDisplay = document.querySelector(".results");
  const groundSize = 500;
  let currentShooterIndex = 462;
  let width = 25;
  let direction = 1;
  let invadersId: any;
  let goingRight = true;
  let aliensRemoved: any[] = [];
  let currentResults = 0;

  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 26,
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 50, 51,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,
  ];
  const squares = createSquares(grid, groundSize);

  drawAliens(alienInvaders, aliensRemoved, squares);

  squares[currentShooterIndex].classList.add("shooter");

  function moveShooter(e: any) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
      case "ArrowLeft":
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        break;
      case "ArrowRight":
        if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
        break;
    }
    squares[currentShooterIndex].classList.add("shooter");
  }

  document.addEventListener("keydown", moveShooter);

  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;
    remove(alienInvaders, squares);

    if (rightEdge && goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width + 1;
        direction = -1;
        goingRight = false;
      }
    }

    if (leftEdge && !goingRight) {
      for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += width - 1;
        direction = 1;
        goingRight = true;
      }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }

    drawAliens(alienInvaders, aliensRemoved, squares);

    if (squares[currentShooterIndex].classList.contains("invader")) {
      if (currentResultsDisplay !== null) {
        currentResultsDisplay.innerHTML = "GAME OVER";
      }
      clearInterval(invadersId);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > squares.length) {
        if (currentResultsDisplay !== null) {
          currentResultsDisplay.innerHTML = "GAME OVER";
          clearInterval(invadersId);
        }
      }
    }
    if (aliensRemoved.length === alienInvaders.length) {
      if (currentResultsDisplay !== null) {
        currentResultsDisplay.innerHTML = "YOU WIN";
        clearInterval(invadersId);
      }
    }
  }
  // invadersId = setInterval(moveInvaders, 600);

  function shoot(e: any) {
    let laserId: any;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      console.log(currentLaserIndex);
      squares[currentLaserIndex].classList.add("laser");

      if (squares[currentLaserIndex].classList.contains("invader")) {
        squares[currentLaserIndex].classList.remove("laser");
        squares[currentLaserIndex].classList.remove("invader");
        squares[currentLaserIndex].classList.add("boom");

        setTimeout(
          () => squares[currentLaserIndex].classList.remove("boom"),
          300
        );
        clearInterval(laserId);

        if (currentResultsDisplay !== null) {
          currentResults++;
          currentResultsDisplay.innerHTML = getScore(
            alienInvaders,
            aliensRemoved,
            currentResults,
            currentLaserIndex,
            currentResultsDisplay
          );
        }
      }
    }
    switch (e.key) {
      case "ArrowUp":
        laserId = setInterval(moveLaser, 10);
    }
  }

  document.addEventListener("keydown", shoot);
};

export default script;
