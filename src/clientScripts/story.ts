const modal = document.getElementById("describe-modal") as HTMLElement;
const showModal = document.getElementById("show-modal") as HTMLElement;
const hideModal = document.getElementById("hide-modal") as HTMLElement;
const fireModal = document.getElementById("fire-modal") as HTMLElement;
const failureTypography = document.getElementById("modal-response") as HTMLElement;
const keywordTypography = document.getElementById("keyword") as HTMLElement;
const selectModals = document.querySelectorAll(".select-modal") as NodeListOf<HTMLElement>;

showModal.addEventListener("click", () => {
    modal.style.display = "initial";
});

hideModal.addEventListener("click", () => (modal.style.display = "none"));

let selectedDescriptor: string;
selectModals.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.textContent != null) {
            selectedDescriptor = btn.textContent;
        }
    });
});

fireModal.addEventListener("click", () => {
    if (!selectedDescriptor) {
        failureTypography.textContent = "no descriptor has been selected";
        return;
    }

    fetch("/api/descriptor", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
            id: parseInt(document.getElementsByTagName("meta")[0].content),
            key: keywordTypography.textContent,
            descriptor: selectedDescriptor,
        }),
    })
        .then((response) => {
            if (response.status === 201) {
                modal.style.display = "none";
            } else if (response.status === 500) {
                failureTypography.textContent =
                    "Either too soon to react to story or API error";
            } else {
                failureTypography.textContent = "Network error";
            }
        })
        .catch((err) => {
            console.error(err);
            failureTypography.textContent = `${err} :/`;
        });
});
