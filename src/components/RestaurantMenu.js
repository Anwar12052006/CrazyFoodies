

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import ShimmerMenu from './ShimmerMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (!resInfo) return <ShimmerMenu />;

  // ✅ Extract basic restaurant info
  const {
    name,
    cuisines,
    costForTwoMessage,
  } = resInfo?.cards?.[0]?.card?.card?.info || {};

  // ✅ Dynamically find the groupedCard with REGULAR menu
  const menuCard = resInfo.cards.find(
    (card) => card?.groupedCard?.cardGroupMap?.REGULAR
  );

  const menuItems = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // ✅ Extract only ItemCategory types
  const categories = menuItems.filter(
    (c) =>
      c.card?.card?.['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {(cuisines || []).join(', ')} - {costForTwoMessage}
      </p>

      {/* Categories Accordion */}
      {categories.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() =>
            setShowIndex(index === showIndex ? null : index)
          }
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;

