const drawAliens = (
  alienInvaders: number[],
  aliensRemoved: number[],
  squares: Element[]
) => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
};

export default drawAliens;
