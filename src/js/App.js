import Container from './components/Container';
import Table from './components/Table';
import PopOver from './components/PopOver';
import DeleteMessage from './components/DeleteMessage';

// Это альтернативный варинт вывода сообщения об ошибке при валидации
// import Tooltip from './components/Tooltip';

export default class App {
  constructor() {
    this.container = new Container();
    this.table = new Table();
    this.popOver = new PopOver();
    this.deleteMessage = new DeleteMessage();
    // this.tooltip = new Tooltip();
    this.storage = localStorage;

    this.errors = {
      productName: {
        valueMissing: 'Введите наименование товара',
      },
      productPrice: {
        valueMissing: 'Введите стоимость товара',
        patternMismatch: 'Введите положительное натуральное число',
      },
    };

    this.init();
  }

  // Инициализация проекта, доьавление обработчиков событий
  init() {
    this.drawElements();
    this.products = this.getStorage() ? this.getStorage() : [];
    if (this.products.length) {
      this.drawProducts();
    }
  }

  // Отрисовка контейнера и таблицы
  drawElements() {
    this.container.element.appendChild(this.table.element);
    document.body.appendChild(this.container.element);
    document.querySelector('.container').appendChild(this.popOver.element);
    this.form = Array.from(document.forms[0]);
    this.container.listener(this.popOver.element);
    this.formListeners();
    document.querySelector('.container').appendChild(this.deleteMessage.element);
  }

  // Обрабочтик событий для иконок редактирования и удаления продуктов
  editAndRemoveButtonsListeners() {
    this.productsIcons = Array.from(this.table.element.querySelectorAll('.productIcon'));
    if (this.productsIcons.length) {
      this.productsIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
          this.editOrDeleteProduct.bind(this)(e.target);
        });
      });
    }
  }

  // Обрабочтики событий формы
  formListeners() {
    const form = document.querySelector('.popOver_form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const { elements } = form;
      const invalid = [...elements].some((el) => {
        if (!el.validity.valueMissing && !el.validity.patternMismatch) {
          el.setCustomValidity('');
        }
        return Object.keys(ValidityState.prototype).some((key) => {
          if (!el.name) return;
          if (key === 'valid') return;
          if (key === 'customError') return;
          if (el.validity[key]) {
            // console.dir(el);
            // this.tooltip.element = this.errors[el.name][key];
            // el.after(this.tooltip.element);
            el.setCustomValidity(this.errors[el.name][key]);
            return true;
          }
        });
      });

      if (invalid) {
        console.dir(elements);
        form.reportValidity();
        return;
      }
      this.addOrEditProduct.bind(this)(e.type);
    });
    form.querySelector('.abortButton').addEventListener('click', this.addOrEditProduct.bind(this));
  }

  // Обработчик событий для всплывающего сообщения с подтверждением удаления продукта
  deleteMessageListener(product) {
    const buttons = Array.from(this.deleteMessage.element.querySelectorAll('.btn'));
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('ok')) {
          this.products = this.products.filter((el) => el.id !== product.id);
          this.setStorage();
          this.drawProducts();
        }
        this.deleteMessage.element.classList.remove('messageContainer_active');
        this.deleteMessage.element.classList.add('messageContainer_inactive');
      });
    });
  }

  // Добавление нового продукта в массив
  addOrEditProduct(e) {
    const productIcons = Array.from(document.querySelectorAll('.productIcon'));
    const editIconActive = productIcons.find((el) => el.classList.contains('editIcon_active'));
    let editProduct;
    if (editIconActive) {
      editProduct = editIconActive.parentNode.parentNode;
    }
    if (editIconActive && e === 'click') {
      editProduct.childNodes[2].childNodes[0].classList.remove('editIcon_active');
    } else if (editIconActive && e === 'submit') {
      const editElementofArr = this.products.find((el) => el.id === editProduct.id);
      editElementofArr.name = this.form[0].value;
      editElementofArr.price = this.form[1].value;
      editProduct.childNodes[2].childNodes[0].classList.remove('editIcon_active');
      this.setStorage();
      this.drawProducts();
    } else if (!editIconActive && e === 'submit') {
      const id = `${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}${Math.floor(Math.random() * 10000)}`;
      this.products.push({
        name: this.form[0].value,
        price: this.form[1].value,
        id,
      });
      this.setStorage();
      this.drawProducts();
    }
    this.container.containerMask.classList.remove('mask_active');
    this.popOver.element.classList.remove('popOver_active');
    this.popOver.element.classList.add('popOver_inactive');
    this.form.forEach((el) => el.value = '');
  }

  // Отрисовка всех продуктов
  drawProducts() {
    document.querySelector('.tBody').innerHTML = '';
    this.products.forEach((el) => {
      this.table.createProduct(el.name, el.price, el.id);
    });
    this.editAndRemoveButtonsListeners();
  }

  // Сохранение всех продуктов из массива в localStorage
  setStorage() {
    this.storage.setItem('products', JSON.stringify(this.products));
  }

  // Извлечение данных из localStorage
  getStorage() {
    return JSON.parse(this.storage.getItem('products'));
  }

  // Редактирование или удаление продукта
  editOrDeleteProduct(icon) {
    if (icon.classList.contains('editIcon')) {
      icon.classList.add('editIcon_active');
      this.container.containerMask.classList.add('mask_active');
      this.popOver.element.classList.remove('popOver_inactive');
      this.popOver.element.classList.add('popOver_active');
      document.forms[0][0].value = icon.parentNode.parentNode.childNodes[0].textContent;
      document.forms[0][1].value = icon.parentNode.parentNode.childNodes[1].textContent;
    } else {
      this.deleteMessage.element.classList.remove('messageContainer_inactive');
      this.deleteMessage.element.classList.add('messageContainer_active');
      this.deleteMessageListener(icon.parentNode.parentNode);
    }
  }
}
