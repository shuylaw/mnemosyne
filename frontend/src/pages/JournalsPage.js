import React, { useState, useEffect } from 'react';
import JournalList from '../components/JournalList';
import JournalService from '../services/JournalService';

function JournalsPage() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        const fetchJournals = async () => {
            const response = await JournalService.getAll();
            setJournals(response);
        };
        fetchJournals();
    }, []);
    return (
        <div>
            <h1>Journals</h1>
            <JournalList journals={journals} />
        </div>
    );
}

export default JournalsPage;
