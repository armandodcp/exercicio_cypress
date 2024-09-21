/// <reference types="cypress" />

describe('Testes para utilizar a agenda de contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app/')
  })
  it('Deve renderizar os componentes da agenda de contatos', () => {
    cy.get('h1').contains('Agenda de contatos').should('have.length', 1)
    cy.get('h2').contains('contatos na agenda').should('have.length', 1)
    cy.get('[type="text"]').should('have.length', 1)
    cy.get('[type="email"]').should('have.length', 1)
    cy.get('[type="tel"]').should('have.length', 1)
    cy.get('.adicionar').should('have.length', 1)
    cy.screenshot('tela-carregada')
  })
  it('Deve incluir um contato na agenda', () => {
    cy.get('[type="text"]').type('_teste José Silva')
    cy.get('[type="email"]').type('josesilva@email.com')
    cy.get('[type="tel"]').type('987654321')
    cy.get('.adicionar').click()
    cy.get('.sc-iAEyYk').contains('_teste José Silva').should('exist')
    cy.screenshot('contato-incluido')
  })
  it('Deve alterar um contato na agenda', () => {
    cy.get('.sc-iAEyYk').contains('_teste José Silva').parents('div').next().first().find('.edit').click()
    cy.get('[type="text"]').clear()
    cy.get('[type="text"]').type('_teste José da Silva')
    cy.get('[type="email"]').clear()
    cy.get('[type="email"]').type('jose.silva@email.com')
    cy.get('[type="tel"]').clear()
    cy.get('[type="tel"]').type('11 987654321')
    cy.get('.alterar').click()
    cy.get('.sc-iAEyYk').contains('_teste José da Silva').should('exist')
    cy.screenshot('contato-atualizado')
  })
  it('Deve remover um contato na agenda', () => {
    cy.get('.sc-iAEyYk').contains('_teste José da Silva').parents('div').next().first().find('.delete').click()
    cy.get('.sc-iAEyYk').contains('_teste José da Silva').should('not.exist')
    cy.screenshot('contato-removido')
  })
})
