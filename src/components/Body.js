import { useContext, useEffect, useState } from "react";

import RestaurantCard, { WithVegTag } from "./RestaurantCard";
import ShimmerCard from "./ShimmerCard";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/useOnlineStatus";
import mockData, { corsproxies } from "../../utils/mockData";
import UserContext from "../../utils/UserContext";

let col;
let dummy = mockData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  ?.restaurants;
const Body = () => {
  // console.log(dummy);
  
  const [tempList, setTempList] = useState(
    mockData.length === 0 ? null : dummy
  );
  const [filteredList, setFilteredList] = useState(
    mockData.length === 0 ? null : dummy
  );
  const [searchVal, setSearchVal] = useState("");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setGlobalText } = useContext(UserContext);

  useEffect(() => {
    // Function Logic Here.
    getData();
    // console.log("init or update")
  }, []);

  const getData = async () => {
    try {
      // Get location from browser
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          // console.log(lat, lng);
          
          const res = await fetch(
            `${corsproxies}https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`
          );

          let data = await res.json();
          // console.log(data);
// console.log(data?.data?.cards[4]?.card?.card);

          data =
            data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;
          // console.log(data);
          
          if (data) {
            
            setTempList(data);
            setFilteredList(data);
          }
          // console.log(filteredList);

          // cloudinaryImageId
          // name
          // avgRating
          // sla.slaString
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } catch (error) {
      clearTimeout(col);
      col = setTimeout(() => {
        getData();
        console.log("data called");
      }, 30000);
    }
  };


  // const getData = async () => {
  //   try {
  //     const res = await fetch(
  //       `${corsproxies}
  //         https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=12.9235541&lng=79.1330768&carousel=true&third_party_vendor=1`
  //     );

  //     let data = await res.json();
  //     // console.log(data);

  //     data =
  //       data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants;
  //     setTempList(data);
  //     setFilteredList(data);
  //     // console.log(filteredList);

  //     // cloudinaryImageId
  //     // name
  //     // avgRating
  //     // sla.slaString
  //   } catch (error) {
  //     clearTimeout(col);
  //     col = setTimeout(() => {
  //       getData();
  //       console.log('data called');
        
  //     }, 30000);
  //   }
  // };

  const handleSearch = () => {
    let temp = tempList.filter((a) =>
      a?.info?.name?.toLowerCase().includes(searchVal?.toLowerCase())
    );
    setFilteredList(temp);
  };

  const handleTopRated = () => {
    let flag = true;
    return () => {
      
      if (flag) {
        let temp = tempList.filter((a) => a?.info?.avgRating >= 4.5);
        console.log(tempList.length);
        setFilteredList(temp);
      } else {
        console.log(tempList.length+"lol");
        
        setFilteredList(tempList);
      }
  }
  }

  // console.log(tempList);

  if (!onlineStatus) {
    return <h1>Please check your Internet connection</h1>;
  }

  if (tempList === null) {
    return <ShimmerCard />;
  }

  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search m-4 p-4">
          <input
            className="border border-solid border-black mr-5"
            type="text"
            data-testid="searchInput"
            name="search"
            id="search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            className="bg-green-100 px-4 py-1 rounded-lg active:scale-92 hover:bg-green-200 hover:cursor-pointer"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 ">
          <button className="filterBtn bg-gray-100 px-4 py-1 rounded-lg active:scale-92 hover:bg-gray-200 hover:cursor-pointer"
          onClick={handleTopRated()}>
            Top Rated
          </button>
        </div>
        <div>
          <input
            className="border"
            value={loggedInUser}
            onChange={(e) => setGlobalText(e.target.value)}
            type="text"
            name="contextTest"
            id="contextTest"
          />
        </div>
      </div>

      <div className="resContainer flex flex-wrap">
        {filteredList?.map((cards) => (
          <Link to={`restaurants/${cards?.info.id}`} key={cards?.info.id}>
            {cards?.info?.veg ? (
              <WithVegTag resList={cards?.info} />
            ) : (
              <RestaurantCard resList={cards?.info} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
