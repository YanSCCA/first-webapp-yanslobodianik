const accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion.length; i++) {
    const acc = accordion[i];
    acc.addEventListener("click", () => {
        acc.classList.toggle("active");
        const panel = acc.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}