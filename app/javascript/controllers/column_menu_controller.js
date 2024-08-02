import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="column-menu"
export default class extends Controller {
  static targets = ["menu"];

  // Menü açma/kapatma işlevi
  toggleMenu(event) {
    event.preventDefault();

    // Tüm menüleri gizle
    this.menuTargets.forEach((menu) => {
      if (menu !== event.currentTarget.nextElementSibling) {
        menu.classList.remove("visible");
      }
    });

    // Tıklanan menüyü göster/gizle
    const targetMenu = event.currentTarget.nextElementSibling;
    if (targetMenu) {
      targetMenu.classList.toggle("visible");
    }
  }

  // Kart ekleme işlevi
  addCard(event) {
    const columnId = event.target.closest('.list').dataset.id;
    const modal = document.getElementById('add-card-modal');
    const columnIdInput = document.getElementById('card_column_id');
  
    if (modal && columnIdInput) {
      modal.classList.remove('hidden');
      columnIdInput.value = columnId;
    } else {
      console.error('Required elements for adding card not found');
    }
  }
  

  // Kolon adını yeniden adlandırma işlevi
  rename(event) {
    const columnId = event.target.closest('.list').dataset.id;
    const columnName = event.target.closest('.list').querySelector('h2 a').textContent;
  
    const modal = document.getElementById('add-column-modal');
    const columnNameInput = modal.querySelector('#column_name');
    const columnIdInput = modal.querySelector('#column_id');
    const form = modal.querySelector('form');
  
    if (columnNameInput && columnIdInput && form) {
      columnNameInput.value = columnName;
      columnIdInput.value = columnId;
      form.action = `/columns/${columnId}`;
      modal.classList.remove('hidden');
    } else {
      console.error('Required elements for renaming column not found');
    }
  }
  

  // Kolonu silme işlevi
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