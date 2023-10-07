import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JournalsPage from './pages/JournalEntriesPage';
import CreateNewEntryPage from './pages/CreateNewEntryPage';
import JournalEntryPage from './pages/JournalEntryPage';


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JournalsPage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/journals/new" element={<CreateNewEntryPage />} />
          <Route path="/journals/:id" element={<JournalEntryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
