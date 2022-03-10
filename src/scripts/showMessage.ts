const showMessage = (messageElement: HTMLElement | null, message: string) => {
  if (messageElement) {
    setTimeout(() => {
      return (messageElement.innerHTML = "");
    }, 3000);

    return (messageElement.innerHTML = message);
  }
};

export default showMessage;
