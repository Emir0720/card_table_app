import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["menu", "renameForm", "column"];

  connect() {
    document.addEventListener("click", this.closeMenuOnClickOutside.bind(this));
  }

  disconnect() {
    document.removeEventListener("click", this.closeMenuOnClickOutside.bind(this));
  }

  toggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    // Toggle menü açma/kapama
    const targetMenu = event.currentTarget.nextElementSibling;
    if (targetMenu) {
      targetMenu.classList.toggle("visible");
    }
  }

  closeMenuOnClickOutside(event) {
    // Menülerin her birini kontrol et
    this.menuTargets.forEach((menu) => {
      if (!menu.contains(event.target) && !event.target.closest("[data-action*='toggleMenu']")) {
        menu.classList.remove("visible");
      }
    });
  }

 changeColor(event) {
    const color = event.target.dataset.color;
    const columnId = this.element.closest('[data-id]').dataset.id;

    const form = document.createElement("form");
    form.action = `/columns/${columnId}/update_color`;
    form.method = "POST";
    form.style.display = "none"; // Formun sayfada görünmemesi için

    // Renk inputu oluştur
    const inputColor = document.createElement("input");
    inputColor.type = "hidden";
    inputColor.name = "column[color]";
    inputColor.value = color;
    form.appendChild(inputColor);

    // CSRF token inputu oluştur
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const inputCsrf = document.createElement("input");
    inputCsrf.type = "hidden";
    inputCsrf.name = "authenticity_token";
    inputCsrf.value = csrfToken;
    form.appendChild(inputCsrf);

    // Formu body'ye ekle ve submit et
    document.body.appendChild(form);
    form.submit();
  }

  
  
  
  
  
  
  
  addCard(event) {
    event.preventDefault(); 

    const columnId = event.currentTarget.dataset.columnId;
    const url = `/columns/${columnId}/cards/new`;
    Turbo.visit(url, { frame: "new_card" });

    // Modal'ı aç
    const modal = document.querySelector("#add-card-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("visible");
      const form = modal.querySelector("#new-card-form");
      if (form) {
        form.action = url;
      } else {
        console.error("Form not found");
      }
    } else {
      console.error("Modal not found");
    }
  }

  
  toggleRenameForm(event) {
    event.preventDefault();
    
    
    const form = this.renameFormTarget;
    if (form) {
      form.classList.toggle("hidden");
    } else {
      console.error("Rename form not found");
    }
  }

  
  rename(event) {
    event.preventDefault();

    
    const form = this.renameFormTarget.querySelector('form');

    if (form) {
      form.submit();
    } else {
      console.error("Form not found for renaming");
    }
  }

  
  delete(event) {
    const columnId = event.target.closest('.list').dataset.id;
    const deleteForm = document.getElementById(`delete-column-${columnId}`);
    
    if (deleteForm) {
      deleteForm.submit();
    } else {
      console.error(`Delete form for column ID ${columnId} not found`);
    }
  }

  
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('visible');
    } else {
      console.error(`Modal with ID ${modalId} not found`);
    }
  }

  
  closeModal(event) {
    const modal = event.target.closest('.modal');
    if (modal) {
      modal.classList.remove('visible');
      modal.classList.add('hidden');
    } else {
      console.error('Modal not found when trying to close');
    }
  }
}
