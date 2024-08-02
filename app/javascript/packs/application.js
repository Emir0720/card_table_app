import 'stylesheets/application'

document.addEventListener('turbolinks:load', () => {
  const addCardBtn = document.getElementById('add-card-btn');
  const addCardForm = document.getElementById('add-card-form');
  const cancelAddCard = document.getElementById('cancel-add-card');
  const addColumnBtn = document.getElementById('add-column-btn');
  const additionalColumns = document.getElementById('additional-columns');

  if (addCardBtn && addCardForm && cancelAddCard) {
    addCardBtn.addEventListener('click', () => {
      addCardForm.classList.remove('hidden');
    });

    cancelAddCard.addEventListener('click', (event) => {
      event.preventDefault();
      addCardForm.classList.add('hidden');
    });
  }

  const newCardForm = document.getElementById('new-card-form');
  if (newCardForm) {
    newCardForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(newCardForm);

      Rails.ajax({
        url: newCardForm.action,
        type: 'POST',
        data: formData,
        success: (data) => {
          const triageColumn = document.querySelector('.cards[data-column-name="Triage"]');
          if (triageColumn) {
            const cardHtml = `
              <div class="card bg-white p-2 rounded mb-2 border border-gray-300" id="card_${data.id}">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <p><strong>Assigned to:</strong> ${data.assigned_to}</p>
                <p><strong>Due on:</strong> ${data.due_on}</p>
              </div>
            `;
            triageColumn.insertAdjacentHTML('beforeend', cardHtml);
            addCardForm.classList.add('hidden');
            newCardForm.reset();
            enableDragAndDrop();
          }
        },
        error: () => {
          alert('Error creating card');
        }
      });
    });
  }

  if (addColumnBtn) {
    addColumnBtn.addEventListener('click', () => {
      const columnName = prompt('Enter column name:');
      if (columnName) {
        const columnHtml = `
          <div class="flex-1 bg-gray-200 p-4 rounded mt-4 list" data-column-name="${columnName}">
            <h2>${columnName}</h2>
            <div class="cards" data-column-name="${columnName}"></div>
          </div>
        `;
        additionalColumns.insertAdjacentHTML('beforeend', columnHtml);
        enableDragAndDrop();
      }
    });
  }

  const enableDragAndDrop = () => {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.cards');

    cards.forEach(card => {
      card.draggable = true;

      card.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.id);
      });
    });

    columns.forEach(column => {
      column.addEventListener('dragover', event => {
        event.preventDefault();
      });

      column.addEventListener('drop', event => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData('text/plain');
        const card = document.getElementById(cardId);
        event.target.appendChild(card);
      });
    });
  };

  enableDragAndDrop();

  document.addEventListener('DOMNodeInserted', enableDragAndDrop);
});
