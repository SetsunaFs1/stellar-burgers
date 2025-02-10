import Cypress from 'cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      modalShouldBeEmpty(): Chainable<JQuery<HTMLElement>>;
      modalShouldNotBeEmpty(): Chainable<JQuery<HTMLElement>>;
      modalIngredient(): Chainable<JQuery<HTMLAnchorElement>>;
    }
  }
}
