document.addEventListener("DOMContentLoaded", function () {
    const galleryImages = document.querySelectorAll(".gallery-img");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = '<span class="modal-close">&times;</span><img src="">';
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector("img");
    const closeModal = modal.querySelector(".modal-close");

    galleryImages.forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.src;
        });
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});