import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["list"];

  connect() {
    this.initializeDragAndDrop();
  }

  initializeDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.list');

    cards.forEach(card => {
      card.draggable = true;

      card.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.dataset.id);
        event.target.classList.add('dragging'); 
      });

      card.addEventListener('dragend', event => {
        event.target.classList.remove('dragging'); 
      });
    });

    columns.forEach(column => {
      column.addEventListener('dragover', this.handleDragOver);
      column.addEventListener('dragleave', this.handleDragLeave);
      column.addEventListener('drop', this.handleDrop.bind(this));
    });
  }

  handleDragOver(event) {
    event.preventDefault();
    event.target.classList.add('drag-over'); 
  }

  handleDragLeave(event) {
    event.target.classList.remove('drag-over'); 
  }

  handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    event.target.classList.remove('drag-over');

    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.querySelector(`.card[data-id="${cardId}"]`);

    if (card) {
      const column = event.target.closest('.list'); 

      if (column) {
        column.appendChild(card);

        
        this.updateCardColumn(cardId, column.dataset.id);
      }
    }
  }

  updateCardColumn(cardId, columnId) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `/cards/${cardId}`;

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'card[column_id]';
    input.value = columnId;
    form.appendChild(input);

    const methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'patch';
    form.appendChild(methodInput);

    document.body.appendChild(form);
    form.requestSubmit();
  }
}
