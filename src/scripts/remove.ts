const remove = (alienInvaders: number[], squares: Element[]) => {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
};

export default remove;
