"use client";
import { useEffect, useState } from "react";
import { MealCard, Navbar, Tabs } from "./components";
import WeekSelectionModal from "./components/Modal";

interface Recipe {
  id: number;
  name: string;
  [key: string]: any;
}

interface WeekMeals {
  week1: Recipe[];
  week2: Recipe[];
  week3: Recipe[];
  week4: Recipe[];
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedCard, setSelectedCard] = useState<Recipe | null>(null); // Track selected card
  const [weekMeals, setWeekMeals] = useState<WeekMeals>({
    week1: [],
    week2: [],
    week3: [],
    week4: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addToWeek = (meal: Recipe, week: keyof WeekMeals) => {
    setWeekMeals((prev) => {
      if (prev[week].some((m) => m.id === meal.id)) {
        alert("Meal already added to this week!"); // If meal is already added, show an alert
        return prev;
      }
      // If the meal is not in the week, add it
      return {
        ...prev,
        [week]: [...prev[week], meal],
      };
    });
  };

  const deleteFromWeek = (mealId: number, week: keyof WeekMeals) => {
    setWeekMeals((prev) => ({
      ...prev,
      [week]: prev[week].filter((meal) => meal.id !== mealId),
    }));
  };

  const handleAddToWeek = (recipe: Recipe) => {
    setSelectedRecipe(recipe); // Set the selected recipe
  };

  const handleModalSubmit = (week: keyof WeekMeals) => {
    if (selectedRecipe) {
      addToWeek(selectedRecipe, week); // Add selected recipe to the selected week
      setActiveTab(week); // Change the active tab to the selected week
    }
    setIsModalOpen(false);
    setSelectedRecipe(null); // Reset the selected recipe
  };

  const handleCardSelect = (recipe: Recipe) => {
    setSelectedCard(recipe); // Set the selected card
  };

  return (
    <>
      <div>
        <Navbar />

        {/* Week Orders Section */}
        <div>
          <div className="px-8 sm:px-16 md:px-32 py-8 w-full text-start">
            <h2 className="text-xl font-bold text-black">Week Orders</h2>
          </div>

          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleOpenModal={() => setIsModalOpen(true)}
            addToWeek={addToWeek}
          />

          {/* Meals Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-8 sm:px-16 md:px-32">
            {activeTab === "all"
              ? recipes.map((recipe) => (
                  <MealCard
                    key={recipe.id}
                    recipe={recipe}
                    onAddToWeek={handleAddToWeek}
                    isSelected={selectedCard?.id === recipe.id} // Pass the selected state
                    onCardSelect={handleCardSelect} // Handle card selection
                  />
                ))
              : weekMeals[activeTab as keyof WeekMeals]?.map((meal) => (
                  <MealCard
                    key={meal.id}
                    recipe={meal}
                    onDeleteFromWeek={() => deleteFromWeek(meal.id, activeTab as keyof WeekMeals)}
                    isRemovable
                  />
                ))}
          </div>
        </div>
      </div>
      <WeekSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
