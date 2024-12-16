import React from "react";
import { render, screen } from "@testing-library/react";
import CardContainer from "./CardContainer";

describe("CardContainer Component", () => {
  test("renders the CardContainer component", () => {
    render(
      <CardContainer>
        <p>Test Content</p>
      </CardContainer>
    );

    const content = screen.getByText("Test Content");
    expect(content).toBeInTheDocument();
  });

  test("applies additional className", () => {
    const customClass = "custom-class";

    render(
      <CardContainer className={customClass}>
        <p>Custom Class Test</p>
      </CardContainer>
    );

    const container = screen.getByText("Custom Class Test").parentElement;
    expect(container).toHaveClass("card-container");
    expect(container).toHaveClass(customClass);
  });

  test("renders correctly with empty children", () => {
    render(<CardContainer children={undefined} />);

    const container = document.querySelector(".card-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("card-container");
  });
});
