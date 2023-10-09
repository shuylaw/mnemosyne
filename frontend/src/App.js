import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JournalsPage from './pages/JournalEntriesPage';
import CreateNewEntryPage from './pages/CreateNewEntryPage';
import JournalEntryPage from './pages/JournalEntryPage';
import Layout from './pages/Layout';
import JoplinNotesPage from './pages/ViewJoplinNotesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<JournalsPage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/journals/new" element={<CreateNewEntryPage />} />
          <Route path="/journals/:id" element={<JournalEntryPage />} />
          <Route path="/journals/:id/edit" element={<JournalEntryPage initialEditState={true} />} />
          <Route path="/joplin" element={<JoplinNotesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
