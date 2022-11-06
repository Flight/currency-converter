beforeEach(() => {
  const now = new Date(2022, 9, 6); // month is 0-indexed
  cy.clock(now);

  cy.intercept("https://api.apilayer.com/exchangerates_data/symbols", {
    fixture: "symbols",
  });
  cy.intercept(
    "https://api.apilayer.com/exchangerates_data/timeseries*base=AED*",
    {
      fixture: "timeseries-aed",
    }
  );
  cy.intercept(
    "https://api.apilayer.com/exchangerates_data/timeseries*base=AFN*",
    {
      fixture: "timeseries-afn",
    }
  );
});

describe("Renders initial elements and does the conversion", () => {
  it("passes", () => {
    cy.visit("http://localhost:4173/");

    cy.findByText("Currency exchange").should("exist");
    cy.findByText("Enter amount").should("exist");
    cy.findAllByTitle("Swap currencies").eq(0).should("exist");

    cy.findByRole("combobox", { name: "From" }).select("AED");
    cy.findByRole("combobox", { name: "To" }).select("AFN");

    cy.findByTestId("conversion-result").should(
      "have.contain.text",
      "100.00 United Arab Emirates Dirham =2368.56 Afghan Afghani"
    );

    cy.findByRole("button", { name: "Swap currencies" }).click();
    cy.findByTestId("conversion-result").should(
      "have.contain.text",
      "100.00 Afghan Afghani =4.22 United Arab Emirates Dirham"
    );

    cy.findByRole("spinbutton", { name: "Enter amount" }).type("5.12");

    cy.findByTestId("conversion-result").should(
      "have.contain.text",
      "1005.12 Afghan Afghani =42.44 United Arab Emirates Dirham"
    );
  });
});
