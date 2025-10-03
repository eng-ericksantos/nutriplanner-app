import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Food } from "@/entities/all";
import { Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from 'react';

export default function MealDialog({ open, onClose, onSave, meal, date, mealType }) {
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadFoods();
    if (meal) {
      setSelectedFoods(meal.foods || []);
      setNotes(meal.notes || '');
    } else {
      setSelectedFoods([]);
      setNotes('');
    }
  }, [meal, open]);

  const loadFoods = async () => {
    const allFoods = await Food.list('name');
    setFoods(allFoods);
  };

  const addFood = () => {
    setSelectedFoods([...selectedFoods, {
      food_id: '',
      food_name: '',
      portions: 1,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    }]);
  };

  const updateFood = (index, foodId) => {
    const food = foods.find(f => f.id === foodId);
    if (food) {
      const newSelectedFoods = [...selectedFoods];
      newSelectedFoods[index] = {
        ...newSelectedFoods[index],
        food_id: food.id,
        food_name: food.name,
        calories: (food.calories || 0) * newSelectedFoods[index].portions,
        protein: (food.protein || 0) * newSelectedFoods[index].portions,
        carbs: (food.carbs || 0) * newSelectedFoods[index].portions,
        fats: (food.fats || 0) * newSelectedFoods[index].portions
      };
      setSelectedFoods(newSelectedFoods);
    }
  };

  const updatePortions = (index, portions) => {
    const food = foods.find(f => f.id === selectedFoods[index].food_id);
    if (food) {
      const newSelectedFoods = [...selectedFoods];
      newSelectedFoods[index] = {
        ...newSelectedFoods[index],
        portions: parseFloat(portions) || 0,
        calories: (food.calories || 0) * (parseFloat(portions) || 0),
        protein: (food.protein || 0) * (parseFloat(portions) || 0),
        carbs: (food.carbs || 0) * (parseFloat(portions) || 0),
        fats: (food.fats || 0) * (parseFloat(portions) || 0)
      };
      setSelectedFoods(newSelectedFoods);
    }
  };

  const removeFood = (index) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validFoods = selectedFoods.filter(f => f.food_id);
    onSave({
      date,
      meal_type: mealType,
      foods: validFoods,
      notes
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {meal ? 'Editar' : 'Adicionar'} {mealType}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {selectedFoods.map((selectedFood, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Alimento</Label>
                  <Select
                    value={selectedFood.food_id}
                    onValueChange={(value) => updateFood(index, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um alimento" />
                    </SelectTrigger>
                    <SelectContent>
                      {foods.map((food) => (
                        <SelectItem key={food.id} value={food.id}>
                          {food.name} - {food.calories}kcal
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label>Porções</Label>
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      value={selectedFood.portions}
                      onChange={(e) => updatePortions(index, e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFood(index)}
                    className="mt-6 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {selectedFood.food_id && (
                <div className="flex gap-4 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium">{selectedFood.calories?.toFixed(0)} kcal</span>
                  <span>P: {selectedFood.protein?.toFixed(1)}g</span>
                  <span>C: {selectedFood.carbs?.toFixed(1)}g</span>
                  <span>G: {selectedFood.fats?.toFixed(1)}g</span>
                </div>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addFood}
            className="w-full border-dashed border-2 hover:border-emerald-500 hover:bg-emerald-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Alimento
          </Button>

          <div>
            <Label>Notas (opcional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre esta refeição..."
              className="mt-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={selectedFoods.filter(f => f.food_id).length === 0}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}