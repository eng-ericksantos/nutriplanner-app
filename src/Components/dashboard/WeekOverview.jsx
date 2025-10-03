/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addDays, format, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

export default function WeekOverview({ meals }) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  
  const getDayData = (dayIndex) => {
    const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
    const dayMeals = meals.filter(m => m.date === date);
    const totalCalories = dayMeals.reduce((sum, meal) => {
      return sum + (meal.foods?.reduce((mealSum, food) => mealSum + (food.calories || 0), 0) || 0);
    }, 0);
    return { date, totalCalories, mealCount: dayMeals.length };
  };

  return (
    <Card className="border-none shadow-xl shadow-gray-200/50">
      <CardHeader className="border-b border-gray-100 pb-4">
        <CardTitle className="text-xl font-bold text-gray-900">Visão Semanal</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-7 gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            const dayData = getDayData(dayIndex);
            const day = addDays(weekStart, dayIndex);
            const isToday = format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
            
            return (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: dayIndex * 0.1 }}
                className={`p-3 rounded-2xl text-center transition-all duration-300 ${
                  isToday 
                    ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className={`text-xs font-medium mb-1 ${isToday ? 'text-white/90' : 'text-gray-500'}`}>
                  {format(day, 'EEE', { locale: ptBR }).toUpperCase()}
                </p>
                <p className={`text-2xl font-bold mb-2 ${isToday ? 'text-white' : 'text-gray-900'}`}>
                  {format(day, 'd')}
                </p>
                <div className={`text-xs ${isToday ? 'text-white/90' : 'text-gray-600'}`}>
                  {dayData.totalCalories > 0 ? (
                    <>
                      <p className="font-semibold">{dayData.totalCalories}</p>
                      <p>kcal</p>
                    </>
                  ) : (
                    <p className="text-xs">-</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}