const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
const BUN_ID = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const BURGER_FILLING_ID = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;
const HOST = 'http://localhost:4000';

Cypress.Commands.add('modalShouldBeEmpty', () =>
  cy.get('#modals').should('be.empty')
);
Cypress.Commands.add('modalShouldNotBeEmpty', () =>
  cy.get('#modals').should('not.be.empty')
);

Cypress.Commands.add('modalIngredient', () =>
  cy.get(BURGER_FILLING_ID).children('a').click()
);

beforeEach(() => {
  cy.intercept('GET', `${BURGER_API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  });
  cy.intercept('GET', `${BURGER_API_URL}/orders`, {
    fixture: 'orders.json'
  });
  cy.intercept('POST', `${BURGER_API_URL}/auth/login`, {
    fixture: 'user.json'
  });
  cy.visit(HOST);
});

describe('Добавление ингредиентов', () => {
  it('Добавление булок в бургер', () => {
    cy.get(BUN_ID).children('button').click();
    cy.get(BUN_ID).find('.counter__num').contains('2');
  });

  it('Добавление начинки в бургер', () => {
    cy.get(BURGER_FILLING_ID).children('button').click();
    cy.get(BURGER_FILLING_ID).find('.counter__num').contains('1');
  });
});

describe('Открытие/закрытие модальных окон', () => {
  it('Открытие модального окна', () => {
    cy.modalShouldBeEmpty();
    cy.modalIngredient();
    cy.modalShouldNotBeEmpty();
    cy.url().should('include', '1');
  });
  it('Закрытие модального окна нажатием на кнопку крестика', () => {
    cy.modalShouldBeEmpty();
    cy.modalIngredient();
    cy.modalShouldNotBeEmpty();
    cy.get('#modals').find('button').click();
    cy.modalShouldBeEmpty();
  });
  it('Закрытие модального окна нажатием на кнопку esc', () => {
    cy.modalShouldBeEmpty();
    cy.modalIngredient();
    cy.modalShouldNotBeEmpty();
    cy.get('body').click(0, 0);
    cy.modalShouldBeEmpty();
  });
});

describe('Оформление заказа для авторизированного пользователя', () => {
  const email = 'input[name=email]';
  const password = 'input[name=password]';
  const user = {
    email: 'angel_vozh@mail.ru',
    password: '123123'
  };
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'token');
    cy.setCookie('accessToken', 'token');
    cy.getAllLocalStorage().should((localStorage) => {
      expect(localStorage).to.not.be.empty;
    });
    cy.getCookie('accessToken').should((cookies) => {
      expect(cookies).to.not.be.empty;
    });
    cy.visit(HOST);
  });
  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearCookie('accessToken');
    cy.getCookie('accessToken').should('not.exist');
    cy.getAllLocalStorage().should((localStorage) => {
      expect(localStorage).to.be.empty;
    });
  });
  it('Оформление заказа на главной странице после авторизации', () => {
    cy.visit(`${HOST}/login`);
    cy.get(email).click().type(user.email);
    cy.get(password).click().type(user.password);
    cy.get('button').contains('Войти').click();
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    cy.get(BUN_ID).children('button').click();
    cy.get(BURGER_FILLING_ID).children('button').click();
    cy.contains('Оформить заказ').as('orderButton');
    cy.get('@orderButton').should('be.enabled').click();
    cy.get('#modals').should('exist');
    cy.wait(3000);
    cy.get('[data-cy=close-button]').click();
    cy.get('#modals')
      .should('not.be.visible')
      .children('')
      .should('have.length', 0);
    cy.get('ul.HEJ0tV35JHL7iuHL89vk').children('div').should('have.length', 1);
  });
});
