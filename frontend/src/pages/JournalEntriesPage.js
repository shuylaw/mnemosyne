import React, { useState, useEffect } from 'react';
import JournalList from '../components/JournalList';
import JournalService from '../services/JournalService';

function JournalsPage() {
    const [journalEntries, setJournalEntries] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const response = await JournalService.getAll();
            setJournalEntries(response);
            console.log(response);
        };
        fetchJournals();
    }, []);
    return (
        <div>
            <h1>Journals</h1>
            <JournalList journals={journalEntries} />
        </div>
    );
}

export default JournalsPage;
