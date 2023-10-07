import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import JournalService from "../services/JournalService";
import SingleJournalEntry from "../components/SingleJournalEntry";
import JournalEntryMenu from "../components/JournalEntryMenu";
import JournalEntryEditableForm from "../components/JournalEntryEditableForm";
import useLoading from "../hooks/useLoading";
import MDEditor from '@uiw/react-md-editor';

const JournalEntryPage = () => {
    const { id } = useParams();
    const [journalEntry, setJournalEntry] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useLoading();
    const [titleDisplay, setTitleDisplay] = useState('');

    useEffect(() => {
        const fetchJournalEntry = async () => {
            const data = await JournalService.get(id);
            setJournalEntry(data);
            setTitleDisplay(data.title);
        };
        fetchJournalEntry();
    }, [id]);

    useEffect(() => {
        if (isEditing) {
            setTitleDisplay("Editing");
        } else {
            setTitleDisplay(journalEntry.title);
        }
    }, [isEditing]);

    const handleChange = (e) => {
        console.log(e)
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setJournalEntry({
            ...journalEntry,
            [name]: finalValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await JournalService.update(id, journalEntry);
        setIsEditing(false);
        setIsLoading(false);
    }

    return (
        <div>
            <h2>{titleDisplay}</h2>
            {isEditing ? (
                <div>
                    <JournalEntryEditableForm
                        formData={journalEntry}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        handleSubmit={handleSubmit}
                    />
                </div>
            ) : (
                <div>
                    <SingleJournalEntry journalEntry={journalEntry} />
                </div>
            )}
            <JournalEntryMenu id={id} isEditing={isEditing} setIsEditing={setIsEditing} journalEntry={journalEntry} />

            <Link to="/journals">Back to Journals</Link>
        </div>
    );
}

export default JournalEntryPage;