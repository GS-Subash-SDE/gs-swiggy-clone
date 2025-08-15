import ShimmerCard from "./ShimmerCard";
import { useParams } from "react-router";
import useRestaurantMenu from "../../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

function RestaurantMenu() {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  // console.log(resId);

  if (resInfo === null) {
    return <ShimmerCard />;
  }

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  const { cards } = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR;
  // console.log(cards);
  let cardss = cards?.filter((a) => a.card.card.itemCards?.length);

  return (
    <div className="menu text-center my-10">
      <h1 className="font-bold text-2xl">{name}</h1>
      <h3>
        {cuisines.join(" || ")} - {costForTwoMessage}
      </h3>
      <div>
        {cardss?.map((a, index) => {
          const {
            card: {
              card: { title },
            },
          } = a || {};

          return <RestaurantCategory key={title} data = {a} showItem = {showIndex===index?true:false}   setShowIndex={()=>setShowIndex(showIndex===index?null:index)} />;
        })}
      </div>
    </div>
  );
}

export default RestaurantMenu;
