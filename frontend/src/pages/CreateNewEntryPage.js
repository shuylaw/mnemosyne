import React, { useState } from 'react';
import JournalEntryEditableForm from '../components/JournalEntryEditableForm';
import JournalService from '../services/JournalService';
import useLoading from '../hooks/useLoading';
import { Link } from 'react-router-dom';

const CreateNewEntryPage = () => {
    const initialState = {
        title: '',
        content: '',
        date: new Date().toISOString().slice(0, 10),
        sentiment: 0,
        is_private: false,
        summary: ''
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        console.log(e)
        const { name, value, type, checked } = e.target;
        const finalValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: finalValue
        });
    };

    const [isLoading, setIsLoading] = useLoading();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await JournalService.create(formData);
        window.location.href = '/journals';
        setIsLoading(false);
    };

    return (
        <div>
            <h1>Create New Journal Entry</h1>
            <JournalEntryEditableForm
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                handleChange={handleChange}
                formData={formData}
            />
            <Link to="/journals">Back to Journals</Link>
        </div>
    );
};

export default CreateNewEntryPage;
