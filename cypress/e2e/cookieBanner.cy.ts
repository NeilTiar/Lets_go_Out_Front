describe('Cookie Banner', () => {

  beforeEach(() => {
    // Nettoyer le localStorage avant chaque test
    cy.clearLocalStorage()
    cy.visit('http://localhost:8080') // adapte à ton port local
  })

  it('affiche la bannière si aucun consentement', () => {
    cy.get('.cookie-banner').should('be.visible')
    cy.contains('Nous utilisons des cookies')
  })

  it('cache la bannière après acceptation', () => {
    cy.get('.accept').click()
    cy.get('.cookie-banner').should('not.exist')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cookieConsent')).to.eq('accepted')
    })
  })

  it('cache la bannière après refus', () => {
    cy.reload()
    cy.get('.refuse').click()
    cy.get('.cookie-banner').should('not.exist')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('cookieConsent')).to.eq('refused')
    })
  })

  it('ne réaffiche pas la bannière si déjà accepté', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('cookieConsent', 'accepted')
    })
    cy.reload()
    cy.get('.cookie-banner').should('not.exist')
  })

})
