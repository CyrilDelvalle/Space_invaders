import showMessage from "./showMessage";

const scoreMessage = (score: number) => {
  return (
    score.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ") +
    " points !"
  );
};

const displayScore = (messageElement: HTMLElement | null, score: number) => {
  switch (score) {
    case 1000:
      showMessage(messageElement, scoreMessage(score));
      break;
    case 2000:
      showMessage(messageElement, scoreMessage(score));
      break;
    case 5000:
      showMessage(messageElement, scoreMessage(score));
      break;
    case 10000:
      showMessage(messageElement, scoreMessage(score));
      break;
  }
};

export default displayScore;
