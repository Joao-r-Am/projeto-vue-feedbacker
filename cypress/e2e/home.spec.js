const APP_URL = process.env.APP_URL || "http://localhost:5173";

describe("Home", () => {
  it("should render create account modal when click on cta create account button", async () => {
    cy.visit(APP_URL);

    cy.get("#cta-create-account-button").click();
    cy.get("#modal-create-account");
  });

  it("should render create account modal when click on header create account button", async () => {
    cy.visit(APP_URL);

    cy.get("#header-create-account-button").click();
    cy.get("#modal-create-account");
  });

  it("should render login modal when click on login button", async () => {
    cy.visit(APP_URL);

    cy.get("#header-login-button").click();
    cy.get("#modal-login");
  });

  it("should login with a email and password", async () => {
    cy.visit(APP_URL);

    cy.get("#header-login-button").click();
    cy.get("#modal-login");

    cy.get("#email-field").type("joao@gmail.com");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();

    cy.url().should("include", "/feedbacks");
  });

  it("should return a error with a invalid email", async () => {
    cy.visit(APP_URL);

    cy.get("#header-login-button").click();
    cy.get("#modal-login");

    cy.get("#email-field").type("joao@");
    cy.get("#password-field").type("1234");
    cy.get("#submit-button").click();
    cy.get("#email-error");
  });
});
