const createSquares = (grid: Element | null, groundSize: number) => {
  for (let i = 0; i < groundSize; i++) {
    const square = document.createElement("div");

    grid !== null && grid.appendChild(square);
  }

  return Array.from(document.querySelectorAll(".grid div"));
};

export default createSquares;
