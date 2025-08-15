import { useContext } from "react";
import { PRE_IMG_URL } from "../../utils/constants";
import UserContext from "../../utils/UserContext";

const RestaurantCard = (props) => {
  const { resList } = props;
  // console.log(resList);
  
  const {
    id,
    name,
    cloudinaryImageId: imageUrl,
    locality,
    avgRating: rating_text,
    costForTwo,
    sla: { slaString },
  } = resList;
// console.log(resList.id);
  const { loggedInUser } = useContext(UserContext);
  
  // console.log(imageUrl);
  
  // cloudinaryImageId
  // name
  // avgRating
  // sla.slaString
  return (
    <div data-testid='testCard' className="resCard p-2 m-2  w-[200px] aspect-6/9 bg-gray-100 rounded-lg hover:shadow-lg hover:bg-gray-200">
      <img
        className="resLogo rounded-lg aspect-3/2"
        src={
          PRE_IMG_URL +
          imageUrl
        }
        alt="resCard-img"
      />
      <h3 className="font-bold py-1 text-lg">{name}</h3>
      <h4>{locality}</h4>
      <h4>{rating_text} stars</h4>
      <h4>{costForTwo} stars</h4>
      <h4>{slaString}</h4>
      <h4>{loggedInUser}</h4>
    </div>
  );
};

export const WithVegTag = (props) => {
  return (
    <div className="relative">
      
      <span className="text-white bg-green-500 absolute top-0 w-10  rounded-sm  font-bold inline-block px-2 ">Veg</span>
      <RestaurantCard {...props} />
    </div>
  )
}


export default RestaurantCard;

