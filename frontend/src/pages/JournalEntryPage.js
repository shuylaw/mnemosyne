import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalService from "../services/JournalService";

const JournalEntryPage = () => {
    const { id } = useParams();
    const [journalEntry, setJournalEntry] = useState({});

    useEffect(() => {
        const fetchJournalEntry = async () => {
            const data = await JournalService.get(id);
            setJournalEntry(data);
        };
        fetchJournalEntry();
    }, [id]);

    return (
        <div>
            <h1>Journal Entry Page</h1>
            <p>Title: {journalEntry.title}</p>
            <p>Content: {journalEntry.content}</p>
        </div>
    );
}

export default JournalEntryPage;