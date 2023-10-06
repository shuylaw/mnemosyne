import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JournalService from "../services/JournalService";

const JournalEntryPage = () => {
    console.log("component rendered")
    const { id } = useParams();
    const [journalEntry, setJournalEntry] = useState({});

    useEffect(() => {
        const fetchJournalEntry = async () => {
            console.log("fetching journal entry")
            console.log(id)
            const data = await JournalService.get(id);
            console.log("printing data", data)
            setJournalEntry(data);
        };
        fetchJournalEntry();
    }, [id]);

    return (
        <div>
            <h1>Journal Entry Page</h1>
            {/* Display properties of journalEntry */}
            <p>Title: {journalEntry.title}</p>
            <p>Content: {journalEntry.content}</p>
            {/* Add more fields as needed */}
        </div>
    );
}

export default JournalEntryPage;