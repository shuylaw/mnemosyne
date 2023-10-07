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
            <div className='flex'>
                <label htmlFor="title" className='pr-2 py-1 my-5 font-bold'>Title: </label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your title here..."
                    className='w-full border border-inherit rounded-lg px-2 py-1 mx-2 my-5'
                /></div>
            <MDEditor
                value={formData.content}
                onChange={handleMDEditorChange}
                preview="edit"
                extraCommands={[]}
            />
            <label htmlFor="is_private">Set Private </label>
            <input
                type="checkbox"
                value={formData.is_private}
                onChange={handleChange}
                name="is_private"
            /><br />
            <hr className='my-5'></hr>
            <h3>Preview Your Entry</h3>
            <div className='border min-h-[200px] p-2 rounded-lg my-2'>
                <MDEditor.Markdown
                    source={formData.content}
                />
            </div>
            {formData.id ? null : (
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            )}
        </form>
    );
};

export default JournalEntryEditableForm;
