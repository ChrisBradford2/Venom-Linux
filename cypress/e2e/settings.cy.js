describe('The settings modal', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8000')
    cy.get('#settings-application').click()
  })
  it('should hide the time', () => {
    cy.get('#checkbox-hour').check({ force: true })
    cy.get('#checkbox-minutes').check({ force: true })
    cy.get('#checkbox-seconds').check({ force: true })
    cy.get('#hours').should('have.css', 'display').should('eq', 'none')
  })
  it('should show the time', () => {
    cy.get('#checkbox-hour').uncheck({ force: true })
    cy.get('#checkbox-minutes').uncheck({ force: true })
    cy.get('#checkbox-seconds').uncheck({ force: true })
    cy.get('#hours').should('have.css', 'display').should('eq', 'inline')
  })
  it('should hide the date', () => {
    cy.get('#checkbox-day').check({ force: true })
    cy.get('#checkbox-date').check({ force: true })
    cy.get('#checkbox-month').check({ force: true })
    cy.get('#checkbox-year').check({ force: true })
    cy.get('#day').should('have.css', 'display').should('eq', 'none')
  })
  it('should show the date', () => {
    cy.get('#checkbox-day').uncheck({ force: true })
    cy.get('#checkbox-date').uncheck({ force: true })
    cy.get('#checkbox-month').uncheck({ force: true })
    cy.get('#checkbox-year').uncheck({ force: true })
    cy.get('#day').should('have.css', 'display').should('eq', 'inline')
  })
  it('should disallow vibration', () => {
    cy.get('.tablink').check({ force: true })
    cy.get('#checkbox-vibration').should('be.checked')
  })
})