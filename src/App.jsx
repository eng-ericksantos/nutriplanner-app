import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from './Layout';

import Dashboard from './Pages/Dashboard.jsx';
import Foods from './Pages/Foods.jsx';
import WeeklyPlanner from './Pages/WeeklyPlanner.jsx';

function App() {
   return (
    // O BrowserRouter habilita a navegação (roteamento) na sua aplicação
    <BrowserRouter>
      {/* O Layout vai aparecer em todas as páginas */}
      <Layout>
        {/* O Routes decide qual página (Route) mostrar com base na URL */}
        <Routes>
          {/* Quando a URL for a raiz ("/"), mostre a página Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Quando a URL for "/planner", mostre a página WeeklyPlanner */}
          <Route path="/planner" element={<WeeklyPlanner />} />

          {/* Quando a URL for "/foods", mostre a página Foods */}
          <Route path="/foods" element={<Foods />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
