describe('Landing Page', () => {
  beforeEach(() => {
    cy.visit('/') // Adjust the URL if necessary
  })

  it('successfully loads', () => {
    cy.get('.Landing').should('be.visible')
  })

  it('contains the main elements', () => {
    cy.get('.Landing-header').should('be.visible')
    cy.get('.Landing-main').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('navigates to the login page when Log In button is clicked', () => {
    cy.get('.log-in-button').click()
    cy.url().should('include', '/login')
  })

  it('navigates to the signup page when Sign Up button is clicked', () => {
    cy.get('.signup-button').click()
    cy.url().should('include', '/signup')
  })

  it('toggles accordion items', () => {
    cy.get('.accordion-header').eq(0).click()
    cy.get('.accordion-content').eq(0).should('have.class', 'active')

    cy.get('.accordion-header').eq(1).click()
    cy.get('.accordion-content').eq(1).should('have.class', 'active')

    cy.get('.accordion-header').eq(2).click()
    cy.get('.accordion-content').eq(2).should('have.class', 'active')
  })

  it('displays statistics correctly', () => {
    cy.get('.statistics .statistic').should('have.length', 3)
    cy.get('.statistics .statistic').eq(0).contains('97.4%')
    cy.get('.statistics .statistic').eq(1).contains('2 million')
    cy.get('.statistics .statistic').eq(2).contains('30-35%')
  })

  it('displays features correctly', () => {
    cy.get('.features .feature-list .feature-item').should('have.length', 6)
    cy.get('.features .feature-list .feature-item').eq(0).contains('Real-time health monitoring')
    cy.get('.features .feature-list .feature-item').eq(1).contains('AI chatbot support')
    cy.get('.features .feature-list .feature-item').eq(2).contains('Emergency nurse connections')
    cy.get('.features .feature-list .feature-item').eq(3).contains('VR/AR experiences')
    cy.get('.features .feature-list .feature-item').eq(4).contains('Stress-relief games')
    cy.get('.features .feature-list .feature-item').eq(5).contains('Seamless communication with healthcare providers')
  })
})