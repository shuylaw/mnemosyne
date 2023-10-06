import React, { useState } from 'react';

const NewJournalEntryForm = ({ formData, handleChange, handleSubmit, isLoading }) => {

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            /><br />
            <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Content"
            /><br />
            <label htmlFor="is_private">Set Private </label>
            <input
                type="checkbox"
                value={formData.is_private}
                onChange={handleChange}
                name="is_private"
            /><br />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    );
};

export default NewJournalEntryForm;
