import React from "react";

const JournalEntry = ({ journal }) => {
    return (
        <div>
            <h1>{journal.title}</h1>
            <div>{journal.date}</div>
            <div>{journal.is_private}</div>
            <div>{journal.sentiment}</div>
            <div>{journal.content}</div>
        </div>
    );
}

export default JournalEntry;