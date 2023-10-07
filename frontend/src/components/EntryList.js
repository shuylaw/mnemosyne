import React from "react";
import { Link } from "react-router-dom";
const EntryList = ({ journals }) => {

    return (
        <div className="p-5 rounded-lg">
            <table className="table table-md">
                <tr>
                    <th className="w-1/5">Date</th>
                    <th>Title</th>
                    <th>Action</th></tr>
                {journals.map((journal) => (
                    <tr
                        className="hover hover:shadow-lg"
                        key={journal.id}
                    ><td>{journal.date}</td>
                        <td onClick={() => window.location.href = `/journals/${journal.id}`} className="clickable"><Link to={`/journals/${journal.id}`}>{journal.title}</Link>
                        </td><td>Edit | Delete</td>
                    </tr>
                ))}
            </table>

        </div>
    );
};

export default EntryList;
