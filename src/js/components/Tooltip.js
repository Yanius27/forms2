// Aльтернативный варинт вывода сообщения об ошибке при валидации

export default class Tooltip {
  constructor() {
    this.createElement();
  }

  createElement() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    this._element = tooltip;
  }

  set element(message) {
    this._element.textContent = message;
  }

  get element() {
    return this._element;
  }
}
