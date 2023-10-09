import React, { useState, useEffect } from 'react';
import JournalEntriesList from '../components/JournalEntriesList';
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
        <div className='text-center'>
            <h1>Journal Entries</h1>
            <JournalEntriesList journals={journalEntries} />
        </div>
    );
}

export default JournalsPage;
