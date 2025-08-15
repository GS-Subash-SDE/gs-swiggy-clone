import { act, fireEvent, render, screen } from "@testing-library/react";
import Cart from "../Cart";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";
import RestaurantMenu from "../RestaurantMenu";
import { BurgerKingMock } from "../../../utils/mockData";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import UserContext from "../../../utils/UserContext";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(BurgerKingMock),
  })
);

it("Should Cart component adding count", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
      <Provider store={appStore}>
        <UserContext.Provider
          value={{
            loggedInUser: "default User",
          }}
        >
            <Header />
            <Cart/>
          <RestaurantMenu />
        </UserContext.Provider>
      </Provider>
      </BrowserRouter>
    );
  });

  const menuCategries = screen.getByText(
    "NEW BK Fusion (Made with KitKat) (5)"
  );

  fireEvent.click(menuCategries);

  const menuItems = screen.getAllByTestId("menuItems");

  expect(menuItems.length).toBe(5);

  const itemAddBtns = screen.getAllByText("Add +");

  fireEvent.click(itemAddBtns[0]);

  const cartCountText = screen.getByText("Cart (1)");

  expect(cartCountText).toBeInTheDocument();

  const clearBtn = screen.getByRole('button', { name: 'Clear Cart' });

  fireEvent.click(clearBtn);

  const clearedFlag = screen.getByText("Cart is empty, Add Items to the Cart!");

  expect(clearedFlag).toBeInTheDocument();  

});
