
import { Button } from "@/components/ui/button";
import { Meal } from "@/entities/all";
import { createPageUrl } from "@/utils";
import { endOfWeek, startOfWeek } from "date-fns";
import { Beef, Droplet, Flame, Plus, Wheat } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NutritionCard from "../Components/dashboard/NutritionCard";
import WeekOverview from "../Components/dashboard/WeekOverview";

export default function Dashboard() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWeekData();
  }, []);

  const loadWeekData = async () => {
    setIsLoading(true);
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    
    const allMeals = await Meal.list('-date');
    const weekMeals = allMeals.filter(meal => {
      const mealDate = new Date(meal.date);
      return mealDate >= weekStart && mealDate <= weekEnd;
    });
    
    setMeals(weekMeals);
    setIsLoading(false);
  };

  const calculateTotals = () => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    meals.forEach(meal => {
      meal.foods?.forEach(food => {
        totalCalories += food.calories || 0;
        totalProtein += food.protein || 0;
        totalCarbs += food.carbs || 0;
        totalFats += food.fats || 0;
      });
    });

    return { totalCalories, totalProtein, totalCarbs, totalFats };
  };

  const totals = calculateTotals();

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Olá! 👋</h1>
            <p className="text-gray-600">Vamos planejar sua semana de forma saudável</p>
          </div>
          <Link to={createPageUrl("WeeklyPlanner")}>
            <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/30">
              <Plus className="w-5 h-5 mr-2" />
              Planejar Refeição
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NutritionCard
            title="Calorias Semanais"
            value={totals.totalCalories.toFixed(0)}
            unit="kcal"
            icon={Flame}
            color="from-orange-400 to-red-500"
            percentage={Math.min((totals.totalCalories / 14000) * 100, 100)}
          />
          <NutritionCard
            title="Proteínas"
            value={totals.totalProtein.toFixed(0)}
            unit="g"
            icon={Beef}
            color="from-red-400 to-pink-500"
            percentage={Math.min((totals.totalProtein / 700) * 100, 100)}
          />
          <NutritionCard
            title="Carboidratos"
            value={totals.totalCarbs.toFixed(0)}
            unit="g"
            icon={Wheat}
            color="from-amber-400 to-yellow-500"
            percentage={Math.min((totals.totalCarbs / 1400) * 100, 100)}
          />
          <NutritionCard
            title="Gorduras"
            value={totals.totalFats.toFixed(0)}
            unit="g"
            icon={Droplet}
            color="from-emerald-400 to-cyan-500"
            percentage={Math.min((totals.totalFats / 490) * 100, 100)}
          />
        </div>

        <WeekOverview meals={meals} />

        {meals.length === 0 && !isLoading && (
          <div className="mt-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Comece a planejar!</h3>
            <p className="text-gray-600 mb-6">Adicione suas primeiras refeições e organize sua semana</p>
            <Link to={createPageUrl("WeeklyPlanner")}>
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                Planejar Agora
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}