const getScore = (
  alienInvaders: number[],
  aliensRemoved: number[],
  currentResults: number,
  currentLaserIndex: number,
  currentResultsDisplay: Element | null
) => {
  const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
  aliensRemoved.push(alienRemoved);
  //   currentResults++;
  if (currentResultsDisplay !== null) {
    // currentResultsDisplay.innerHTML = currentResults + "points";
    return currentResults + " points";
  }
  return "";
};

export default getScore;
