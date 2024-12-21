import React from "react";

function MealCard({
  recipe,
  onAddToWeek,
  onDeleteFromWeek,
  isRemovable,
  isSelected, // New prop to check if the card is selected
  onCardSelect, // Function to handle the selection of the card
}: any) {
  return (
    <div
      className={`max-w-[350px] p-4 w-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col ${isSelected ? 'border-2 border-[#004370]' : ''}`}
      onClick={() => {
        onCardSelect(recipe); // Call the onCardSelect function when the card is clicked
        onAddToWeek(recipe); // You can still trigger the add to week action
      }}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-56 object-cover rounded-lg"
        />
        <span className="absolute top-2 right-2 bg-black text-white text-xs font-semibold px-3 py-1 rounded-md">
          {recipe.mealType?.[0]}
        </span>
        {/* Delete Icon */}
        {isRemovable && (
          <div
            className="absolute top-2 left-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFromWeek();
            }}
          >
            <img
           src="/delete-icon.png"
              alt="Delete Icon"
              className="h-5 w-5"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-black">{recipe.name}</h3>
        <p className="text-gray-700 text-sm mt-2 flex-1 overflow-hidden line-clamp-5">
          {recipe.instructions}
        </p>

        {/* Cuisine and Rating */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <span>Cuisine: {recipe.cuisine}</span>
          <div className="flex items-center">
            <span className="mr-2">Rating: {recipe.rating}</span>
            <div className="flex text-[#004370]">
              {Array.from({ length: 4 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${i < Math.round(recipe.rating) ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.965a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.374 2.454a1 1 0 00-.364 1.118l1.286 3.965c.3.921-.755 1.688-1.54 1.118l-3.374-2.454a1 1 0 00-1.175 0l-3.374 2.454c-.784.57-1.84-.197-1.54-1.118l1.286-3.965a1 1 0 00-.364-1.118L2.05 9.392c-.783-.57-.381-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.965z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
