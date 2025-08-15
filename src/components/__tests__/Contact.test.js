import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import '@testing-library/jest-dom';

describe("Contact component testings",() => {
  it("Contact component should have heading inside correctly", () => {
    render(<Contact />);

    const heading = screen.getByText("Submit");

    expect(heading).toBeInTheDocument();
  });

  it("Contact component should have button correctly", () => {
    render(<Contact />);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();
  });

  it("Contact component should have placeholder correctly", () => {
    render(<Contact />);

    const heading = screen.getByPlaceholderText("Phon.no");

    expect(heading).toBeInTheDocument();
  });

  it("Contact component should have 2 inputs", () => {
    render(<Contact />);

    const inputs = screen.getAllByRole("textbox");

    expect(inputs.length).toBe(2);
  });
});