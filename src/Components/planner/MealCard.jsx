/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Flame, Pencil, Plus, Trash2 } from "lucide-react";

const mealIcons = {
  "café da manhã": "☕",
  "lanche da manhã": "🥪",
  "almoço": "🍽️",
  "lanche da tarde": "🍎",
  "jantar": "🌙",
  "ceia": "🥛"
};

export default function MealCard({ meal, onEdit, onDelete, onAdd }) {
  const totalCalories = meal?.foods?.reduce((sum, food) => sum + (food.calories || 0), 0) || 0;
  const totalProtein = meal?.foods?.reduce((sum, food) => sum + (food.protein || 0), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{mealIcons[meal?.meal_type || "outro"]}</span>
              <h3 className="font-semibold text-gray-900 capitalize">{meal?.meal_type || "Refeição"}</h3>
            </div>
            {meal && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(meal)}
                  className="h-8 w-8 hover:bg-emerald-50"
                >
                  <Pencil className="w-4 h-4 text-emerald-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(meal)}
                  className="h-8 w-8 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
          {!meal || !meal.foods || meal.foods.length === 0 ? (
            <Button
              variant="outline"
              onClick={onAdd}
              className="w-full border-dashed border-2 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 mt-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Alimentos
            </Button>
          ) : (
            // PARTE ADICIONADA: Mostra a lista de alimentos e o total de calorias
            <div className="flex flex-col flex-grow justify-between">
              <div className="space-y-1">
                {meal.foods.map((food, index) => (
                  <div key={index} className="text-sm text-gray-600 flex justify-between">
                    <span>- {food.food_name}</span>
                    <span className="font-medium text-gray-800">{food.calories?.toFixed(0)} kcal</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-2 border-t border-gray-100 flex items-center justify-end gap-2 text-sm font-bold text-emerald-700">
                <Flame className="w-4 h-4" />
                <span>{totalCalories.toFixed(0)} kcal</span>
              </div>
            </div>
            // FIM DA PARTE ADICIONADA
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
