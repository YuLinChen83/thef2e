describe('bike: Badge component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=badge--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to Badge!');
    });
});
