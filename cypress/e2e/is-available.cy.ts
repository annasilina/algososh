/// <reference types="cypress" />

describe('algorithms-project', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('/');
  });

  it('should be available string revers page on route /recursion', () => {
    cy.visit('/recursion');
  });

  it('should be available fibonacci page on route /fibonacci', () => {
    cy.visit('/fibonacci');
  });

  it('should be available sorting page on route /sorting', () => {
    cy.visit('/sorting');
  });

  it('should be available stack page on route /stack', () => {
    cy.visit('/stack');
  });

  it('should be available queue page on route /queue', () => {
    cy.visit('/queue');
  });

  it('should be available list page on route /list', () => {
    cy.visit('/list');
  });
})

export {}
