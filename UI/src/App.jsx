import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Patrimoine from './Pages/Patrimoine';
import ListePossessions from './Pages/PossessionList';
import CreatePossession from './Pages/CreatePossession';
import ModifierPossession from './Pages/ModifierPossession';
import PatrimoineGraphe from './Pages/PatrimoineGraphe';

function App() {
  return (
    <div className="App">
      < NavigationBar/>
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<ListePossessions />} />
        <Route path="/possession/create" element={<CreatePossession />} />
        <Route path="/possession/:libelle/update" element={<ModifierPossession />} />
        <Route path="/possession/valuesByDateRange" element={<PatrimoineGraphe />} />
      </Routes>
    </div>
  );
}

export default App;
