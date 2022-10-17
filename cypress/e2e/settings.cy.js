describe('The settings modal', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8000')
    cy.get('#settings-application').click()
  })
})