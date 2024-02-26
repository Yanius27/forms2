export default class PopOver {
  constructor() {
    this._element;
    this.createElement();
  }

  createElement() {
    const popOver = document.createElement('div');
    popOver.classList.add('popOver_inactive');

    const popOverForm = document.createElement('form');
    popOverForm.classList.add('popOver_form');
    popOverForm.setAttribute('novalidate', '');

    const inputsContainer = document.createElement('div');
    inputsContainer.classList.add('inputsContainer');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Название';
    nameLabel.classList.add('nameLabel');
    nameLabel.setAttribute('for', 'productNameInput');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'productName');
    nameInput.setAttribute('id', 'productNameInput');
    nameInput.setAttribute('required', '');

    const priceLabel = document.createElement('label');
    priceLabel.textContent = 'Стоимость';
    priceLabel.classList.add('priceLabel');
    priceLabel.setAttribute('for', 'productPriceInput');

    const priceInput = document.createElement('input');
    priceInput.setAttribute('name', 'productPrice');
    priceInput.setAttribute('id', 'productPriceInput');
    priceInput.setAttribute('pattern', '^[1-9][0-9]+$');
    priceInput.setAttribute('required', '');

    inputsContainer.appendChild(nameLabel);
    inputsContainer.appendChild(nameInput);
    inputsContainer.appendChild(priceLabel);
    inputsContainer.appendChild(priceInput);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.classList.add('saveButton');
    saveButton.classList.add('btn');
    saveButton.setAttribute('type', 'submit');

    const abortButton = document.createElement('button');
    abortButton.textContent = 'Отмена';
    abortButton.classList.add('abortButton');
    abortButton.classList.add('btn');
    abortButton.setAttribute('type', 'button');

    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(abortButton);

    popOverForm.appendChild(inputsContainer);
    popOverForm.appendChild(buttonsContainer);

    popOver.appendChild(popOverForm);

    this._element = popOver;
  }

  get element() {
    return this._element;
  }
}
