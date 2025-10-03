import React, { useState, useEffect } from "react";
import { Meal } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addDays, addWeeks, subWeeks } from "date-fns";
import { ptBR } from "date-fns/locale";

import MealCard from "../Components/planner/MealCard";
import MealDialog from "../Components/planner/MealDialog";

const mealTypes = ["café da manhã", "lanche da manhã", "almoço", "lanche da tarde", "jantar", "ceia"];

export default function WeeklyPlanner() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [meals, setMeals] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMealType, setSelectedMealType] = useState(null);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });

  useEffect(() => {
    loadMeals();
  }, [currentWeek]);

  const loadMeals = async () => {
    const allMeals = await Meal.list('-date');
    setMeals(allMeals);
  };

  const getMealForDay = (date, mealType) => {
    return meals.find(m => m.date === date && m.meal_type === mealType);
  };

  const handleAddMeal = (date, mealType) => {
    setSelectedDate(date);
    setSelectedMealType(mealType);
    setEditingMeal(null);
    setDialogOpen(true);
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setSelectedDate(meal.date);
    setSelectedMealType(meal.meal_type);
    setDialogOpen(true);
  };

  const handleDeleteMeal = async (meal) => {
    await Meal.delete(meal.id);
    loadMeals();
  };

  const handleSaveMeal = async (mealData) => {
    if (editingMeal) {
      await Meal.update(editingMeal.id, mealData);
    } else {
      await Meal.create(mealData);
    }
    setDialogOpen(false);
    loadMeals();
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Planejador Semanal</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <span className="text-sm font-medium text-gray-700 min-w-[200px] text-center">
              {format(weekStart, "d 'de' MMMM", { locale: ptBR })} - {format(addDays(weekStart, 6), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="grid grid-cols-8 gap-4">
              <div className="font-semibold text-gray-700 flex items-center">
                Refeição
              </div>
              {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
                const day = addDays(weekStart, dayOffset);
                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                return (
                  <div key={dayOffset} className={`text-center p-3 rounded-xl ${isToday ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg' : 'bg-gray-50'}`}>
                    <p className={`text-xs font-medium ${isToday ? 'text-white/90' : 'text-gray-500'}`}>
                      {format(day, 'EEEE', { locale: ptBR }).toUpperCase()}
                    </p>
                    <p className={`text-2xl font-bold ${isToday ? 'text-white' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </p>
                  </div>
                );
              })}

              {mealTypes.map((mealType) => (
                <React.Fragment key={mealType}>
                  <div className="flex items-center font-medium text-gray-700 capitalize py-4">
                    {mealType}
                  </div>
                  {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
                    const date = format(addDays(weekStart, dayOffset), 'yyyy-MM-dd');
                    const meal = getMealForDay(date, mealType);
                    return (
                      <div key={`${mealType}-${dayOffset}`}>
                        <MealCard
                          meal={meal}
                          onAdd={() => handleAddMeal(date, mealType)}
                          onEdit={handleEditMeal}
                          onDelete={handleDeleteMeal}
                        />
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <MealDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveMeal}
          meal={editingMeal}
          date={selectedDate}
          mealType={selectedMealType}
        />
      </div>
    </div>
  );
}