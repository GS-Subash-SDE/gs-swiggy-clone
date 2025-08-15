import { fireEvent, render,screen } from "@testing-library/react"
import Body from "../Body"
import UserContext from "../../../utils/UserContext";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'


it('Should check search behaviour', () => {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{}}>
        <Body />
      </UserContext.Provider>
    </BrowserRouter>
  );

  const searchBtn = screen.getByRole('button', { name: 'Search' });
  
  const searchBox = screen.getByTestId("searchInput");
  
  const cardBeforeSearch = screen.getAllByTestId("testCard");
  expect(cardBeforeSearch.length).toBe(8);
  
  fireEvent.change(searchBox, { target: { value: 'Biryani' } });
  fireEvent.click(searchBtn);
  const cardAfterSearch = screen.getAllByTestId("testCard");
  // console.log(cardResults.length); 

  expect(cardAfterSearch.length).toBe(1);
});

