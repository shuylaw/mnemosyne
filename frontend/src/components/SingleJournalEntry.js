import React from "react";
import MDEditor from "@uiw/react-md-editor";

const SingleJournalEntry = ({ journalEntry }) => {
    return (
        <div>
            <div>Date: {journalEntry.date}</div>
            <div>Set Private: {journalEntry.is_private}</div>
            <div>Sentiment: {journalEntry.sentiment}</div>
            <div><MDEditor.Markdown
                source={journalEntry.content}
            /></div>
        </div>
    );
}

export default SingleJournalEntry;