describe('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  after(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
  it('should open a modal when clicking on the ingredient', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
  });
  it('should close the modal when clicking on the close button', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').first().click();
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('should have the same data on the modal as the ingredient card', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-name]').should('contain', 'Краторная булка N-200i');
  });
  it('should be able to add an ingredient to the burger using DnD', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').first()
      .trigger('mousedown', { which: 1 });
    cy.get('.dropZone')
      .trigger('mousemove', { clientX: 600, clientY: 600 })
      .trigger('mouseup', { force: true });
    cy.get('[data-cy=drop-target]')
      .should('contain', 'Краторная булка N-200i');
  });
  it('should create an order and open a modal when clicking on the order button', () => {
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').first()
      .trigger('mousedown', { which: 1 });
    cy.get('.dropZone')
      .trigger('mousemove', { clientX: 600, clientY: 600 })
      .trigger('mouseup', { force: true });
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=modal]').should('be.visible');
  });
});