import { API_BASE_URL } from "./../../src/apis/const.js";

const First_Query = "d";
const Element_Mapping = {
  selectors: {
    autosuggest: ".ui-autosuggest",
    suggestionList: ".ui-suggestion-list",
    tableView: ".table-view"
  },
  classes: {
    elementActive: "active"
  },
  url: {
    character: "/character/{1}"
  }
};

describe("Starwar Characters", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Autosuggest should have focus", () => {
    cy.get(Element_Mapping.selectors.autosuggest)
      .find("input")
      .should("have.focus");
  });

  it("Autosuggest should show results", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.request(`${API_BASE_URL}/search/${First_Query}`).then(response => {
      let content = response.body.characters;
      let childNodes = cy
        .get(Element_Mapping.selectors.suggestionList)
        .children();
      childNodes.should("have.length", content.length);
      content.forEach((item, idx) => {
        childNodes.should("contain", item.name);
      });
    });
  });

  it("Autosuggest move up and down", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.focused().type("{uparrow}");
    cy.get(Element_Mapping.selectors.suggestionList)
      .children()
      .last()
      .find("div")
      .should("have.class", Element_Mapping.classes.elementActive);
    cy.focused().type("{downarrow}");
    cy.get(Element_Mapping.selectors.suggestionList)
      .children()
      .first()
      .find("div")
      .should("have.class", Element_Mapping.classes.elementActive);
  });

  it("Autosuggest esc to clear", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.focused().type("{esc}");
    cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
    cy.get(Element_Mapping.selectors.autosuggest)
      .find("input")
      .should("have.value", "");
  });

  it("Autosuggest enter to navigate", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.focused().type("{esc}");
    cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
    cy.get(Element_Mapping.selectors.autosuggest)
      .find("input")
      .should("have.value", "");
  });

  it("Should open characer using url", () => {
    const reponse = cy
      .request(`${API_BASE_URL}/search/${First_Query}`)
      .should(response => {
        let content = response.body.characters;
        cy.visit(Element_Mapping.url.character.replace("{1}", content[2].id));
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[2].name
        );
      });
  });

  it("Should navigate on pressing enter", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.focused()
      .type("{downarrow}")
      .type("{enter}");

    const reponse = cy
      .request(`${API_BASE_URL}/search/${First_Query}`)
      .should(response => {
        let content = response.body.characters;
        cy.url().should(
          "include",
          Element_Mapping.url.character.replace("{1}", content[1].id)
        );
        cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[1].name
        );

        cy.get(Element_Mapping.selectors.autosuggest)
          .find("input")
          .focus()
          .type(First_Query);
        cy.focused()
          .type("{downarrow}")
          .type("{downarrow}")
          .type("{enter}");

        cy.url().should(
          "include",
          Element_Mapping.url.character.replace("{1}", content[2].id)
        );
        cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[2].name
        );
      });
  });

  it("Should navigate on clicking  suggestions", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.get(Element_Mapping.selectors.suggestionList)
      .children()
      .eq(1)
      .trigger("mouseover")
      .find("div")
      .should("has.class", "active");
    cy.get(Element_Mapping.selectors.suggestionList)
      .children()
      .eq(1)
      .click();

    const reponse = cy
      .request(`${API_BASE_URL}/search/${First_Query}`)
      .should(response => {
        let content = response.body.characters;
        cy.url().should(
          "include",
          Element_Mapping.url.character.replace("{1}", content[1].id)
        );
        cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[1].name
        );

        cy.get(Element_Mapping.selectors.autosuggest)
          .find("input")
          .focus();
        cy.get(Element_Mapping.selectors.suggestionList)
          .children()
          .eq(2)
          .click();

        cy.url().should(
          "include",
          Element_Mapping.url.character.replace("{1}", content[2].id)
        );
        cy.get(Element_Mapping.selectors.suggestionList).should("not.exist");
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[2].name
        );
      });
  });

  it("Back and forward should work", () => {
    cy.focused().type(First_Query);
    cy.get(Element_Mapping.selectors.suggestionList);
    cy.get(Element_Mapping.selectors.suggestionList)
      .children()
      .eq(1)
      .click();

    const reponse = cy
      .request(`${API_BASE_URL}/search/${First_Query}`)
      .should(response => {
        let content = response.body.characters;

        cy.get(Element_Mapping.selectors.autosuggest)
          .find("input")
          .focus();
        cy.get(Element_Mapping.selectors.suggestionList)
          .children()
          .eq(2)
          .click();
        //Back Navigation
        cy.go("back");
        cy.url().should("include", `/character/${content[1].id}`);
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[2].name
        );

        //Forward Navigation
        cy.go("forward");
        cy.url().should("include", `/character/${content[2].id}`);
        cy.get(Element_Mapping.selectors.tableView).should(
          "contain",
          content[2].name
        );
      });
  });
});
