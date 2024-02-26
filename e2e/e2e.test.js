import puppeteer from 'puppeteer';
import { fork } from 'child_process';

let browser = null;
let page = null;
let server = null;

jest.setTimeout(40000);

beforeAll(async () => {
  server = fork(`${__dirname}/e2e.server.js`);
  await new Promise((resolve, reject) => {
    server.on('error', reject);
    server.on('message', (message) => {
      if (message === 'ok') {
        resolve();
      }
    });
  });

  browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  page = await browser.newPage();
});

describe('We can create, edit and remove products', () => {
  let addIcon;
  let saveButton;
  let abortButton;
  let nameInput;
  let priceInput;
  let editIcon;
  let deleteIcon;
  let okButton;
  let cancelButton;

  test('Clicking the "+" icon open the popover', async () => {
    await page.goto('http://localhost:8090/');
    await page.waitForSelector('.addIcon');
    addIcon = await page.$('.addIcon');
    await addIcon.click();
    await page.waitForSelector('.popOver_active');
  }, 20000);

  test('If the input fields have correct values and the Save key is pressed, the popOver is closed and a product is created', async () => {
    await page.waitForSelector('.saveButton');
    saveButton = await page.$('.saveButton');

    await page.waitForSelector('#productNameInput');
    nameInput = await page.$('#productNameInput');
    await nameInput.type('iphone');

    await page.waitForSelector('#productPriceInput');
    priceInput = await page.$('#productPriceInput');
    await priceInput.type('135320');

    await saveButton.click();
    await page.waitForSelector('.popOver_inactive');
    await page.waitForSelector('.product');
  }, 30000);

  test('Clicking the editIcon open the popover', async () => {
    await page.waitForSelector('.editIcon');
    editIcon = await page.$('.editIcon');

    await editIcon.click();
    await page.waitForSelector('.popOver_active');
  }, 20000);

  test('Clicking the abortButton close the popover', async () => {
    await page.waitForSelector('.abortButton');
    abortButton = await page.$('.abortButton');
    await abortButton.click();
    await page.waitForSelector('.popOver_inactive');
  }, 20000);

  test('Clicking the cancel button close the deleteMessageContainer', async () => {
    await page.waitForSelector('.deleteIcon');
    deleteIcon = await page.$('.deleteIcon');

    await deleteIcon.click();
    await page.waitForSelector('.messageContainer_active');
    await page.waitForSelector('.cancel');
    cancelButton = await page.$('.cancel');
    await cancelButton.click();
    await page.waitForSelector('.messageContainer_inactive');
  }, 20000);

  test('Clicking the deleteIcon open the deleteMessageContainer and clicking okButton delete the product and close the deleteMessageContainer', async () => {
    await page.waitForSelector('.deleteIcon');
    deleteIcon = await page.$('.deleteIcon');

    await deleteIcon.click();
    await page.waitForSelector('.messageContainer_active');
    await page.waitForSelector('.ok');
    okButton = await page.$('.ok');
    await okButton.click();
    await page.waitForSelector('.messageContainer_inactive');
  }, 20000);
});

afterAll(async () => {
  if (browser) await browser.close();
  if (server) server.kill();
});
