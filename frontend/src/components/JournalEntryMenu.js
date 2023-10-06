// JournalEntryMenu.js
import React from "react";
import JournalService from "../services/JournalService";

const JournalEntryMenu = ({ id, isEditing, setIsEditing }) => {
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
    };

    const handleDeleteClick = async () => {
        if (window.confirm("Are you sure you want to delete this journal entry?")) {
            await JournalService.delete(id);
            // redirect back to main page
            window.location.href = "/journals";
        }
    };

    return (
        <div>
            <button onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
};

export default JournalEntryMenu;