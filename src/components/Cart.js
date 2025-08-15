import { useDispatch, useSelector } from "react-redux";
import ItemLists from "./ItemLists";
import { clearItem } from "../../utils/cartSlice";
function Cart() {
  const cartData = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const itemCount = useSelector((store) => store.cart.items.length);

  // console.log(cartData);
  const handleClear = () => {
    dispatch(clearItem());
  };

  return (
    <div className="text-center">
      <h1 className="font-bold text-center text-2xl">Cart</h1>
      <div className="w-6/12 m-auto">
        {!!itemCount && (
          <>
            <button
              className="bg-amber-300 p-2 rounded-sm font-semibold hover:cursor-pointer active:scale-90"
              onClick={handleClear}
            >
              Clear Cart
            </button>
            <ItemLists data={cartData} />
          </>
        )}
        {!itemCount && <h1>Cart is empty, Add Items to the Cart!</h1>}
      </div>
    </div>
  );
}

export default Cart;
