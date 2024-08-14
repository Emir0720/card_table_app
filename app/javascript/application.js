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


document.addEventListener("DOMContentLoaded", () => {
  const triageColumn = document.querySelector(".list[data-id='9']");
  const notNowColumn = document.getElementById("not-now-column");

  if (triageColumn && notNowColumn) {
    const updateNotNowHeight = () => {
      
      if (triageColumn.offsetHeight) {
        notNowColumn.style.height = `${triageColumn.offsetHeight}px`;
      }
    };
    updateNotNowHeight();
    window.addEventListener("resize", updateNotNowHeight);
    document.addEventListener("card:updated", updateNotNowHeight);
  }
});

  