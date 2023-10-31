export function showSpinner(show) {
  const spinnerContainer = document.querySelector(".spinner-container");

  if (show) {
    if (!spinnerContainer.classList.contains("visible"))
      spinnerContainer.classList.add("visible");
  } else {
    if (spinnerContainer.classList.contains("visible"))
      spinnerContainer.classList.remove("visible");
  }
}
