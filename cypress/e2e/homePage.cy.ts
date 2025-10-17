describe("HomeView", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit("http://localhost:8080/") // adapte à ton port local
    cy.wait(3000)
  })

  it("affiche le titre principal", () => {
    cy.contains("Let's go out in Paris").should("be.visible")
  })

  it("affiche les liens de navigation", () => {
    cy.get(".registration").should("have.attr", "href", "signup")
    cy.get(".connexion").should("have.attr", "href", "login")
  })

  it("affiche la vidéo d’arrière-plan", () => {
    cy.get("video.home-background-img")
     cy.get('video.home-background-img')
  .should('have.attr', 'autoplay')
cy.get('video.home-background-img')
  .should('have.attr', 'muted')
cy.get('video.home-background-img')
  .should('have.attr', 'loop')

  })

  it("affiche le texte de description", () => {
    cy.get(".home-description")
      .should("contain", "Explorez la Ville Lumière")
  })

  it("affiche le lien d’accès aux reviews", () => {
    cy.get(".reviews-access")
      .should("have.attr", "href", "main")
  })

  it("intègre le composant CookieConsent", () => {
    cy.get(".cookie-banner").should("exist")
  })

  it("le clic sur 'accepter' masque la bannière", () => {
    cy.get(".accept").click()
    cy.get(".cookie-banner").should("not.exist")
    cy.window().then(win => {
      expect(win.localStorage.getItem("cookieConsent")).to.eq("accepted")
    })
  })
})
