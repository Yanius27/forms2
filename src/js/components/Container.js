export default class Container {
  constructor() {
    this._element;
    this.createElements();
  }

  createElements() {
    const container = document.createElement('div');
    container.classList.add('container');

    const productsTitle = document.createElement('span');
    productsTitle.textContent = 'Товары';

    const addIcon = document.createElement('button');
    addIcon.classList.add('addIcon');
    addIcon.textContent = '+';

    const containerHeader = document.createElement('div');
    containerHeader.classList.add('header');

    containerHeader.appendChild(productsTitle);
    containerHeader.appendChild(addIcon);
    container.appendChild(containerHeader);

    this.containerMask = document.createElement('div');
    this.containerMask.classList.add('container_mask');
    document.body.appendChild(this.containerMask);

    this._element = container;
  }

  // Обработчик клика по кнопке добавления продукта
  listener(popOver) {
    this._element.querySelector('.addIcon').addEventListener('click', () => {
      this.containerMask.classList.add('mask_active');
      popOver.classList.remove('popOver_inactive');
      popOver.classList.add('popOver_active');
    });
  }

  get element() {
    return this._element;
  }
}
