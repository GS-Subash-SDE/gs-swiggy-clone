import { render, screen } from "@testing-library/react";
import RestaurantCard, { WithVegTag } from "../RestaurantCard";
import mockData from "../../../utils/mockData";
import "@testing-library/jest-dom";

let dummy =
  mockData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
    ?.restaurants;

describe('RetaurantCard component page testing!',() => {
  it("Should have load RestaurantCard Component", () => {

    render(<RestaurantCard resList={dummy[0]?.info} />);

    const cardName = screen.getByText("Pizza Hut");

    expect(cardName).toBeInTheDocument();
  });
  it("Should have load RestaurantCard with Veg Component", () => {

    render(<WithVegTag resList={dummy[0]?.info} />);

    const labelName = screen.getByText("Veg");

    expect(labelName).toBeInTheDocument();
  });
});