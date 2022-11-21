const modal = document.getElementById("describe-modal");

const showModal = document.getElementById("show-modal");
showModal.addEventListener("click", () => {
  modal.style.display = "initial";
});

const hideModal = document.getElementById("hide-modal");
hideModal.addEventListener("click", () => (modal.style.display = "none"));

const selectModals = document.querySelectorAll(".select-modal");
let selectedDescriptor;
selectModals.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent != null) {
      selectedDescriptor = btn.textContent;
    }
  });
});

const fireModal = document.getElementById("fire-modal");
fireModal.addEventListener("click", () => {
  if (!selectedDescriptor) {
    console.log("We actually need to display an error message");
    return;
  }
  console.log("We actually need to send this to backend: ", selectedDescriptor);
  modal.style.display = "none";
});
