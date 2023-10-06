import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import JournalsPage from './pages/JournalEntriesPage';
import JournalEntryPage from './pages/JournalEntryPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/journals/:id" element={<JournalEntryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
