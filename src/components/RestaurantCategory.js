import { useState } from "react";
import ItemLists from "./ItemLists.js";

function RestaurantCategory({ data, showItem, setShowIndex }) {
  const {
    card: { card: dataa },
  } = data;

  // console.log("showItem " + showItem);

  const { title, itemCards } = dataa;

  // console.log(data);

  // console.log(props);

  // let data = {};
  return (
    <div>
      <div className="w-6/12 mx-auto bg-gray-50 shadow-lg my-4">
        <div data-testid='menuCatagory'
          className="flex justify-between  p-4  my-4 hover:cursor-pointer transition duration-500 ease-in-out"
          onClick={setShowIndex}
        >
          <span className="font-bold text-lg">
            {title} ({itemCards?.length})
          </span>
          <span>{showItem ? "🔽" : "🔼"}</span>
        </div>
        {showItem && <ItemLists data={itemCards} />}
      </div>
    </div>
  );
}

export default RestaurantCategory;
