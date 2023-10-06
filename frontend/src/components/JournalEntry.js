import React from "react";

const JournalEntry = ({ journal }) => {
    return (
        <div>
            <h1>{journal.title}</h1>
            <p>{journal.content}</p>
        </div>
    );
}

export default JournalEntry;