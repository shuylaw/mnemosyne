import React, { useState, useEffect } from 'react';
import JoplinService from '../services/JoplinAPIService';

function JoplinNotesPage() {
    const [joplinNotes, setJoplinNotes] = useState([]);

    useEffect(() => {
        const fetchJoplinNotes = async () => {
            const response = await JoplinService.getNotes(10);
            setJoplinNotes(response);
            console.log(response);
        };
        fetchJoplinNotes();
    }, []);
    return (
        <div className='text-center'>
            <h1>Journal Entries</h1>
            {console.log(joplinNotes)}
        </div>
    );
}

export default JoplinNotesPage;
