import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs';
import JournalService from '../services/JournalService';

const EntryList = ({ journals }) => {
    const navigate = useNavigate();

    const handleEditIconClick = (id) => {
        console.log(`Editing journal entry ${id}`);
        navigate(`/journals/${id}/edit`);
    };

    const handleDeleteIconClick = (id) => {
        console.log(`Deleting journal entry ${id}`);
        if (window.confirm("Are you sure you want to delete this journal entry?")) {
            JournalService.delete(id);
            window.location.href = "/journals";
        }
    }

    const handleRowClick = (id) => {
        navigate(`/journals/${id}`);
    };

    return (
        <div className="p-5 rounded-lg">
            <table className="table table-md">
                <thead>
                    <tr>
                        <th className="w-1/5">Date</th>
                        <th>Title</th>
                        <th className='float-right'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {journals.map((journal) => (
                        <tr
                            className="hover hover:shadow-lg"
                            key={journal.id}
                        >
                            <td>{journal.date}</td>
                            <td className="clickable" onClick={() => handleRowClick(journal.id)}>
                                <Link to={`/journals/${journal.id}`}>{journal.title}</Link>
                            </td>
                            <td className='flex float-right'>
                                <div className='flex justify-center'>
                                    <BsFillPencilFill className='mx-2 clickable' onClick={() => handleEditIconClick(journal.id)} />
                                    <BsTrashFill className='ml-2 clickable' onClick={() => handleDeleteIconClick(journal.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EntryList;
