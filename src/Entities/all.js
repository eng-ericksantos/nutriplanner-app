// CAMADA DE DADOS SIMULADA (MOCK)
// O sistema original "base44" provavelmente gerava um código mais complexo.
// Este arquivo simula o comportamento para que o aplicativo possa funcionar.

// Simula um banco de dados em memória
let foods = [
  { id: '1', name: 'Peito de Frango (grelhado)', category: 'proteína', serving_size: 100, calories: 165, protein: 31, carbs: 0, fats: 3.6 },
  { id: '2', name: 'Arroz Branco (cozido)', category: 'carboidrato', serving_size: 100, calories: 130, protein: 2.7, carbs: 28, fats: 0.3 },
  { id: '3', name: 'Brócolis (cozido)', category: 'legume', serving_size: 100, calories: 35, protein: 2.4, carbs: 7, fats: 0.4 },
  { id: '4', name: 'Maçã', category: 'fruta', serving_size: 100, calories: 52, protein: 0.3, carbs: 14, fats: 0.2 },
];
let meals = []; // Começa vazio

// Função que cria um objeto com métodos para manipular os dados (list, create, etc.)
const createMockEntity = (store) => ({
  list: async () => {
    // Retorna uma cópia para evitar que o array original seja modificado diretamente
    return [...store];
  },
  create: async (data) => {
    const newItem = { ...data, id: crypto.randomUUID() };
    store.push(newItem);
    return newItem;
  },
  update: async (id, data) => {
    const index = store.findIndex(item => item.id === id);
    if (index !== -1) {
      store[index] = { ...store[index], ...data };
      return store[index];
    }
    return null;
  },
  delete: async (id) => {
    const index = store.findIndex(item => item.id === id);
    if (index !== -1) {
      store.splice(index, 1);
    }
  }
});

// Exporta os "modelos" de Food e Meal com os métodos de acesso aos dados
export const Food = createMockEntity(foods);
export const Meal = createMockEntity(meals);