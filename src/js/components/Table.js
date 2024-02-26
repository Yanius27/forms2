export default class Table {
  constructor() {
    this._element;
    this.createTable();
  }

  createTable() {
    const table = document.createElement('table');
    table.classList.add('table');
    const tHead = document.createElement('thead');
    tHead.classList.add('tHead');
    const tBody = document.createElement('tbody');
    tBody.classList.add('tBody');

    const headRow = document.createElement('tr');

    const nameTh = document.createElement('th');
    nameTh.textContent = 'Название';
    const priceTh = document.createElement('th');
    priceTh.textContent = 'Стоимость';
    const actionTh = document.createElement('th');
    actionTh.textContent = 'Действия';

    headRow.appendChild(nameTh);
    headRow.appendChild(priceTh);
    headRow.appendChild(actionTh);

    tHead.appendChild(headRow);
    table.appendChild(tHead);
    table.appendChild(tBody);

    this._element = table;
  }

  createProduct(name, price, id) {
    const tr = document.createElement('tr');
    tr.classList.add('product');
    tr.setAttribute('id', id);

    const nameTd = document.createElement('td');
    nameTd.textContent = name;

    const priceTd = document.createElement('td');
    priceTd.textContent = price;

    const actionTd = document.createElement('td');
    actionTd.classList.add('actionTd');

    const editIcon = document.createElement('div');
    editIcon.classList.add('productIcon');
    editIcon.classList.add('editIcon');

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add('productIcon');
    deleteIcon.classList.add('deleteIcon');

    actionTd.appendChild(editIcon);
    actionTd.appendChild(deleteIcon);

    tr.appendChild(nameTd);
    tr.appendChild(priceTd);
    tr.appendChild(actionTd);
    document.querySelector('.tBody').appendChild(tr);
  }

  get element() {
    return this._element;
  }
}
