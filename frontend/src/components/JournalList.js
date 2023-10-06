import React from "react";
const JournalList = ({ journals }) => {

    return (
        <div>
            <ul>
                {journals.map((journal) => (
                    <li key={journal.id}>{journal.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default JournalList;
