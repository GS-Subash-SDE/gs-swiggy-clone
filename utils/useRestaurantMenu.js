import { useEffect, useState } from "react";
import { corsproxies } from "./mockData";

const useRestaurantMenu = (resId) => {

  const [resInfo, setResInfo] = useState(null);
  
  useEffect(() => {
    fetchMenu();
  }, []);

  // console.log(resId);
  

  // const fetchMenu = async () => {
  //   try {
  //     // console.log(corsproxies);
      
  //     const res = await fetch(
  //       `${corsproxies}https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9235541&lng=79.1330768&restaurantId=${resId}`
  //     );
  //     // console.log(res);
      
  //     const data = await res.json();

  //     //name of the Menu
  //     // console.log(data.data.cards[2].card.card.info.name);
  //     // console.log(data.data.cards[5].groupedCard.cardGroupMap.REGULAR.cards);
  //     setResInfo(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const fetchMenu = async () => {
    try {
      // Get location from browser
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
// console.log(lat,lng);

          // Fetch menu with user's lat/lng
          const res = await fetch(
            `${corsproxies}https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}`
          );

          const data = await res.json();
          setResInfo(data.data);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };


  return [resInfo, setResInfo];
};

export default useRestaurantMenu
