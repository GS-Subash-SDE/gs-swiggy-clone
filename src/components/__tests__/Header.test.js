import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Header component page testings", () => {
  it("Should load Header component with login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginBtnExist = screen.getByRole("button", { name: /Login/ });

    expect(loginBtnExist).toBeInTheDocument();
  });
  it("Should load Header component with login button to logout", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    const loginBtnExist = screen.getByRole("button", { name: /Login/ });

    fireEvent.click(loginBtnExist);

    const logoutBtnExist = screen.getByRole("button", { name: /Logout/ });

    expect(logoutBtnExist).toBeInTheDocument();
  });
});