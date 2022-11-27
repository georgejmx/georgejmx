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
    document.getElementById("modal-response").textContent =
      "no descriptor has been selected";
    return;
  }

  fetch("/api/descriptor", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({
      id: parseInt(document.getElementsByTagName("meta")[0].content),
      key: document.getElementById("keyword").textContent,
      descriptor: selectedDescriptor,
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        modal.style.display = "none";
      } else {
        throw "failure HTTP response";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("modal-response").textContent = `${err} :(`;
    });
});
