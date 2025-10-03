/* eslint-disable no-unused-vars */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Food } from "@/entities/all";
import { AnimatePresence, motion } from "framer-motion";
import { Apple, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const categoryColors = {
  "proteína": "bg-red-100 text-red-700 border-red-200",
  "carboidrato": "bg-amber-100 text-amber-700 border-amber-200",
  "legume": "bg-green-100 text-green-700 border-green-200",
  "fruta": "bg-pink-100 text-pink-700 border-pink-200",
  "laticínio": "bg-blue-100 text-blue-700 border-blue-200",
  "gordura": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bebida": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "outro": "bg-gray-100 text-gray-700 border-gray-200"
};

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'outro',
    serving_size: 100,
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0
  });

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    const allFoods = await Food.list('name');
    setFoods(allFoods);
  };

  const handleAdd = () => {
    setEditingFood(null);
    setFormData({
      name: '',
      category: 'outro',
      serving_size: 100,
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0
    });
    setDialogOpen(true);
  };

  const handleEdit = (food) => {
    setEditingFood(food);
    setFormData(food);
    setDialogOpen(true);
  };

  const handleDelete = async (food) => {
    await Food.delete(food.id);
    loadFoods();
  };

  const handleSave = async () => {
    if (editingFood) {
      await Food.update(editingFood.id, formData);
    } else {
      await Food.create(formData);
    }
    setDialogOpen(false);
    loadFoods();
  };

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Alimentos</h1>
            <p className="text-gray-600">Gerencie sua biblioteca de alimentos</p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Alimento
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar alimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 shadow-md border-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFoods.map((food) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-none shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-2">{food.name}</CardTitle>
                        <Badge className={`${categoryColors[food.category]} border`}>
                          {food.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(food)}
                          className="h-8 w-8 hover:bg-emerald-50"
                        >
                          <Pencil className="w-4 h-4 text-emerald-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(food)}
                          className="h-8 w-8 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-2">Por {food.serving_size}g</p>
                      <p className="text-2xl font-bold text-gray-900 mb-3">{food.calories} kcal</p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <p className="text-gray-500">Proteína</p>
                          <p className="font-semibold text-gray-900">{food.protein}g</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Carboidrato</p>
                          <p className="font-semibold text-gray-900">{food.carbs}g</p>
                        </div>
                        <div className="text-center">
                          <p className="text-gray-500">Gordura</p>
                          <p className="font-semibold text-gray-900">{food.fats}g</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <Apple className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              {searchTerm ? 'Nenhum alimento encontrado' : 'Adicione seu primeiro alimento'}
            </p>
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {editingFood ? 'Editar' : 'Novo'} Alimento
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Nome</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Peito de frango"
                />
              </div>

              <div>
                <Label>Categoria</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proteína">Proteína</SelectItem>
                    <SelectItem value="carboidrato">Carboidrato</SelectItem>
                    <SelectItem value="legume">Legume</SelectItem>
                    <SelectItem value="fruta">Fruta</SelectItem>
                    <SelectItem value="laticínio">Laticínio</SelectItem>
                    <SelectItem value="gordura">Gordura</SelectItem>
                    <SelectItem value="bebida">Bebida</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tamanho da Porção (g)</Label>
                <Input
                  type="number"
                  value={formData.serving_size}
                  onChange={(e) => setFormData({ ...formData, serving_size: parseFloat(e.target.value) })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Calorias (kcal)</Label>
                  <Input
                    type="number"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Proteína (g)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.protein}
                    onChange={(e) => setFormData({ ...formData, protein: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Carboidratos (g)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.carbs}
                    onChange={(e) => setFormData({ ...formData, carbs: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Gorduras (g)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.fats}
                    onChange={(e) => setFormData({ ...formData, fats: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                disabled={!formData.name}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
              >
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}