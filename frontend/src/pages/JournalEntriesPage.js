import React, { useState, useEffect } from 'react';
import EntryList from '../components/EntryList';
import JournalService from '../services/JournalService';
import { Link } from 'react-router-dom';

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
            <div className='m-5'><Link to="/journals/new">Create New Entry</Link></div>
            <EntryList journals={journalEntries} />
        </div>
    );
}

export default JournalsPage;
