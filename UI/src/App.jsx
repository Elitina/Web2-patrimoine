import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Patrimoine from './Pages/Patrimoine';
import ListePossessions from './Pages/PossessionList';
import CreatePossession from './Pages/CreatePossession';
import ModifierPossession from './Pages/ModifierPossession';

function App() {
  return (
    <div className="App">
      < NavigationBar/>
      <Routes>
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/possession" element={<ListePossessions />} />
        <Route path="/possession/create" element={<CreatePossession />} />
        <Route path="/possession/:libelle/update" element={<ModifierPossession />} />
        
      </Routes>
    </div>
  );
}

export default App;
