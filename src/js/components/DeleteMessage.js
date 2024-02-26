export default class DeleteMessage {
  constructor() {
    this.createElement();
  }

  createElement() {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer_inactive');

    const messageSpan = document.createElement('span');
    messageSpan.classList.add('messageSpan');
    messageSpan.textContent = 'Вы уверены, что хотите удалить этот товар?';

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttonsContainer');

    const okButton = document.createElement('button');
    okButton.classList.add('btn');
    okButton.classList.add('ok');
    okButton.textContent = 'Ok';

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('btn');
    cancelButton.classList.add('cancel');
    cancelButton.textContent = 'Cancel';

    buttonsContainer.appendChild(okButton);
    buttonsContainer.appendChild(cancelButton);

    messageContainer.appendChild(messageSpan);
    messageContainer.appendChild(buttonsContainer);

    this._element = messageContainer;
  }

  get element() {
    return this._element;
  }
}
