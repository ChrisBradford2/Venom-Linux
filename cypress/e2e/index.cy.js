describe('The homepage', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:8000')
  })
  it('should create a new file', () => {
    cy.get('body').rightclick()
    cy.contains('New file').click()
    cy.get('#new-file-name').type('Test{enter}')
  })
})