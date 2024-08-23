import "@hotwired/turbo-rails";
import "controllers";

window.openModal = function (modalId) {
  document.getElementById(modalId).style.display = "block";
}

window.closeModal = function (modalId) {
  var myDocument = document.getElementById(modalId).style.display = "none"
  console.log(myDocument)
}

window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    window.closeModal(event.target.id);
  }
}

