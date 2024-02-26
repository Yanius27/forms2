/**
 * @jest-environment jsdom
 */

import App from '../App';

const app = new App();

describe('Testing methods of app', () => {
  test('drawElements append three elements on the page', () => {
    const container = document.querySelector('.container');
    const popOver = document.querySelector('.popOver_inactive');
    const deleteMessage = document.querySelector('.messageContainer_inactive');

    expect(container).not.toBe(null);
    expect(popOver).not.toBe(null);
    expect(deleteMessage).not.toBe(null);
  });

  test('addOrEditProduct add new product to array and table', () => {
    const nameInput = document.querySelector('#productNameInput');
    nameInput.value = 'iphone 12pro';
    const priceInput = document.querySelector('#productPriceInput');
    priceInput.value = '170000';

    app.form = [nameInput, priceInput];

    app.addOrEditProduct('submit');
    const products = document.querySelectorAll('.product');
    expect(app.products.length > 0).toBe(true);
    expect([...products].length > 0).toBe(true);
  });

  test('addOrEditProduct not add new product to array and table if abortButton is clicked', () => {
    const productEditIcon = document.querySelector('.editIcon');
    productEditIcon.classList.add('editIcon_active');

    app.addOrEditProduct('click');

    const products = document.querySelectorAll('.product');
    expect(app.products.length === 1).toBe(true);
    expect([...products].length === 1).toBe(true);
  });

  test('addOrEditProduct should edit value of product\'s poles if editIcon is active and saveButton is clicked', () => {
    const productEditIcon = document.querySelector('.editIcon');
    productEditIcon.classList.add('editIcon_active');

    const nameInput = document.querySelector('#productNameInput');
    nameInput.value = document.querySelector('.product').childNodes[0].textContent;
    const priceInput = document.querySelector('#productPriceInput');
    priceInput.value = '165000';

    app.addOrEditProduct('submit');

    const products = document.querySelectorAll('.product');
    expect(app.products.length === 1).toBe(true);
    expect([...products].length === 1).toBe(true);
    expect([...products][0].childNodes[0].textContent).toBe('iphone 12pro');
    expect([...products][0].childNodes[1].textContent).toBe('165000');
  });

  test('editOrDeleteProduct should delete product', () => {
    const productDeleteIcon = document.querySelector('.deleteIcon');

    app.editOrDeleteProduct(productDeleteIcon);
    document.querySelector('.ok').click();

    const products = document.querySelectorAll('.product');

    expect(app.products.length === 0).toBe(true);
    expect([...products].length === 0).toBe(true);
  });
});
