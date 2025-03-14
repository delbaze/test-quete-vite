describe("Parcours inscription et liste", () => {
  const data = {
    email: `test-${Date.now()}@mondomaine.com`, //je génère un email dynamiquement pour le test, pour m'éviter d'avoir des doublons
    password: "motdepasse",
  };

  it("Test d'inscription", () => {
    cy.visit("http://localhost:5173/auth/register"); //On visite la page d'inscription
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini dans le champs d'email
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini dans le champs d'password

    cy.get('input[type="submit"]').click(); //On clique sur le bouton d'inscription

    cy.url().should("eq", "http://localhost:5173/auth/login"); //on vérifie que l'on est redirigé vers la page de connexion
  });
  it("Test de connexion et affichage creation de livre", () => {
    cy.visit("http://localhost:5173/auth/login"); //On se rend de nouveau (puisque c'est un autre test) sur la page de login
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini dans le champs d'email
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini dans le champs d'password

    cy.get('input[type="submit"]').click();

    cy.contains(`Bienvenue!`);

    cy.contains(`Quête JWT connecté en tant que ${data.email}`);

    cy.visit("http://localhost:5173/books/create"); // je me rends sur la page de creation de livre
    cy.url().should("eq", "http://localhost:5173/books/create"); // je m'assure que je n'ai pas été redirigé (puisque je suis sensé être authentifié) et que je suis bien sur la page de création de livre

    cy.get('[data-testid="logout-link"]') //le selecteur
      .should("be.visible") //Cette commande vérifie que l'élément sélectionné est visible sur la page. Si l'élément n'est pas visible, le test échouera
      .click({ force: true }); //Cette commande simule un clic sur l'élément sélectionné. L'option "{ force: true }" est utilisée pour forcer le clic même si l'élément est recouvert ou caché.

    cy.url().should("eq", "http://localhost:5173/auth/logout"); //dans notre logique, on partait bien sur cette URL
  });
});
