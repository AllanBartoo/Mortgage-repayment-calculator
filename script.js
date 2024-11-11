const radios = document.querySelectorAll('input[name="type"]');

radios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    console.log("Selected Mortgage Type:", event.target.value);
    radio.parentElement.style.background;
  });
});
