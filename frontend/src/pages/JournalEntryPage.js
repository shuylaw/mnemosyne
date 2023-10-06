import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import JournalService from "../services/JournalService";
import JournalEntryMenu from "../components/JournalEntryMenu";

const JournalEntryPage = () => {
    const { id } = useParams();
    const [journalEntry, setJournalEntry] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchJournalEntry = async () => {
            const data = await JournalService.get(id);
            setJournalEntry(data);
        };
        fetchJournalEntry();
    }, [id]);

    return (
        <div>
            <h2>{journalEntry.title}</h2>
            <JournalEntryMenu id={id} isEditing={isEditing} setIsEditing={setIsEditing} journalEntry={journalEntry} />
            {isEditing ? (
                <textarea value={journalEntry.content} onChange={(e) => setJournalEntry({ ...journalEntry, content: e.target.value })} />
            ) : (
                <div>
                    <div>Date: {journalEntry.date}</div>
                    <div>Set Private: {journalEntry.is_private}</div>
                    <div>Sentiment: {journalEntry.sentiment}</div>
                    <div>Content: {journalEntry.content}</div>
                </div>
            )}
            <Link to="/journals">Back to Journals</Link>
        </div>
    );
}

export default JournalEntryPage;