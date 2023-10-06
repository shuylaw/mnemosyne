import React, { useState, useEffect } from 'react';
import JournalService from '../services/JournalService';

const JournalList = () => {
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
            <h2>Journals</h2>
            <ul>
                {journals.map((journal) => (
                    <li key={journal.id}>{journal.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default JournalList;
