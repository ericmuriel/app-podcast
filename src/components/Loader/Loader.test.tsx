import React from "react";
import { render, screen } from "@testing-library/react";
import { useLoader } from "../../context/LoaderContext";
import Loader from "./Loader";

jest.mock("../../context/LoaderContext", () => ({
  useLoader: jest.fn(),
}));

describe("Loader Component", () => {
  test("renders the loader when isLoading is true", () => {
    (useLoader as jest.Mock).mockReturnValue({ isLoading: true });

    render(<Loader />);

    const loader = screen.getByRole("alert");
    expect(loader).toBeInTheDocument();

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner");
  });

  test("does not render the loader when isLoading is false", () => {
    (useLoader as jest.Mock).mockReturnValue({ isLoading: false });

    render(<Loader />);

    const loader = screen.queryByRole("alert");
    expect(loader).not.toBeInTheDocument();
  });
});
