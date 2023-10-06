import React, { useState } from "react";
import NewJournalEntryForm from "../components/NewJournalEntryForm";
import JournalService from "../services/JournalService";

const CreateNewEntryPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
        sentiment: 0,
        is_private: false,
        summary: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: finalValue
        });
    };

    console.log(formData)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log("form data before sending to API", formData)
        await JournalService.create(formData);
        window.location.href = "/journals";
        setIsLoading(false);
    };

    return (
        <div>
            <h1>Create New Journal Entry</h1>
            <NewJournalEntryForm handleSubmit={handleSubmit} isLoading={isLoading} handleChange={handleChange} formData={formData} />
        </div>
    );
}

export default CreateNewEntryPage;