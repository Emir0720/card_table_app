import "@hotwired/turbo-rails";
import "controllers";

window.openModal = function (modalId) {
  document.getElementById(modalId).style.display = "block";
}

window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    window.closeModal(event.target.id);
  }
}

