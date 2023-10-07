import MDEditor from '@uiw/react-md-editor';
import React from 'react';

const JournalEntryEditableForm = ({ formData, handleChange, handleSubmit, isLoading }) => {

    const handleMDEditorChange = (value) => {
        handleChange({
            target: {
                name: 'content',
                value,
            },
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
            /><br />
            <MDEditor value={formData.content} onChange={handleMDEditorChange} /><br />
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

export default JournalEntryEditableForm;
