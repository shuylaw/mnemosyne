import React from "react";
import { Link } from "react-router-dom";
const JournalList = ({ journals }) => {

    return (
        <div>
            <ul>
                {journals.map((journal) => (
                    <li key={journal.id}>{journal.date} - <Link to={`/journals/${journal.id}`}>{journal.title}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default JournalList;
