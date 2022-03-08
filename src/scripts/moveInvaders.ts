import remove from "./remove";
import draw from "./drawAliens";

const moveInvaders = (
  alienInvaders: number[],
  aliensRemoved: number[],
  width: number,
  squares: Element[],
  goingRight: boolean,
  direction: number,
  currentShooterIndex: number,
  resultsDisplay: Element | null,
  invadersId: any
) => {
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

  draw(alienInvaders, aliensRemoved, squares);

  if (squares[currentShooterIndex].classList.contains("invader")) {
    if (resultsDisplay !== null) {
      resultsDisplay.innerHTML = "GAME OVER";
    }
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      if (resultsDisplay !== null) {
        resultsDisplay.innerHTML = "GAME OVER";
        clearInterval(invadersId);
      }
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    if (resultsDisplay !== null) {
      resultsDisplay.innerHTML = "YOU WIN";
      clearInterval(invadersId);
    }
  }
};

export default moveInvaders;
