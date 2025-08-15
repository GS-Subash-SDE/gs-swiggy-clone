import { useDispatch, useSelector } from "react-redux";
import { PRE_IMG_URL } from "../../utils/constants";
import { addItem, removeItem } from "../../utils/cartSlice";
import { useState } from "react";

function ItemLists({ data }) {
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch({});
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(qty);

  const handleAddItem = (id,item) => {
    setQty((q) => ({ ...q, [id]: (q[id] || 0) + 1 }));
    if (cartItems.indexOf(item)===-1) {
      dispatch(addItem(item));
    }
  };


  const handleRemoveItem = (id) => {  
        if (qty[id] <=0 || !qty[id]) {
          return;
        }
    // console.log(dispatch);
    setQty((q) => ({ ...q, [id]: (q[id] || 0) - 1 }));
    dispatch(removeItem());
  };

  // console.log(data);

  return (
    <div  className="px-2">
      {data?.map((item,i) => {
        const { card } = item || {};
        const { info } = card || {};
        const { id, name, price, defaultPrice, description, imageId } =
          info || {};
        return (
          <div
            data-testid="menuItems"
            key={id + i}
            className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between"
          >
            <div className="w-9/12">
              <div className="py-2">
                <span>{name}</span>
                <span> - ₹ {(price || defaultPrice) / 100}</span>
              </div>
              <p className="text-xs">{description}</p>
            </div>
            <div className="w-3/12 p-1 relative">
              <img
                className="w-full rounded-md"
                src={PRE_IMG_URL + imageId}
                alt=""
              />
              <div className="bg-white w-20 absolute bottom-0 right-1 flex justify-between items-center">
                {!!qty[id] && (
                  <>
                    <button
                      className="px-2 py-1 border hover:cursor-pointer active:scale-92 shadow-lg rounded-md  bg-white"
                      onClick={() => handleRemoveItem(id)}
                    >
                      -
                    </button>
                    <span>{qty[id]}</span>
                    <button
                      className="px-2 py-1 border hover:cursor-pointer active:scale-92 shadow-lg rounded-md bg-white"
                      onClick={() => handleAddItem(id, item)}
                    >
                      +
                    </button>
                  </>
                )}
                {!qty[id] && (
                  <button
                    className="w-full px-2 py-1 border hover:cursor-pointer active:scale-92 shadow-lg rounded-md bg-white"
                    onClick={() => handleAddItem(id, item)}
                  >
                    Add +
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemLists;
