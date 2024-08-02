import { Turbo } from "@hotwired/turbo-rails";
import * as ActiveStorage from "@rails/activestorage";
import "controllers";
import { Application } from "@hotwired/stimulus";


window.openModal = function(modalId) {
  document.getElementById(modalId).style.display = "block";
}

window.closeModal = function(modalId) {
  document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    window.closeModal(event.target.id);
  }
}


// window.openModal = function(modalId) {
//     var modal = document.getElementById(modalId);
//     modal.style.display = "block";
//   }
  
//   window.closeModal = function(modalId) {
//     var modal = document.getElementById(modalId);
//     modal.style.display = "none";
//   }
  
//   
//   window.onclick = function(event) {
//     if (event.target.classList.contains('modal')) {
//       window.closeModal(event.target.id);
//     }
//   }
  