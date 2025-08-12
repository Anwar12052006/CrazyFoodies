

import { useEffect, useState } from 'react';
import { MENU_API } from '../utils/constants';

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [resId]); 

  const fetchData = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();
      console.log("✅ Swiggy data:", json); 
      setResInfo(json?.data); 
    } catch (err) {
      console.error("❌ Error fetching restaurant menu:", err);
    }
  };

  return resInfo;
};

export default useRestaurantMenu;

