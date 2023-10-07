import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPencilFill, BsTrashFill } from 'react-icons/bs';

const EntryList = ({ journals }) => {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/journals/${id}`);
    };

    return (
        <div className="p-5 rounded-lg">
            <table className="table table-md">
                <tr>
                    <th className="w-1/5">Date</th>
                    <th>Title</th>
                    <th className='text-center'>Action</th>
                </tr>
                {journals.map((journal) => (
                    <tr
                        className="hover hover:shadow-lg"
                        key={journal.id}
                    >
                        <td>{journal.date}</td>
                        <td className="clickable" onClick={() => handleRowClick(journal.id)}>
                            <Link to={`/journals/${journal.id}`}>{journal.title}</Link>
                        </td>
                        <td className='flex justify-center'><BsFillPencilFill className='mx-2' /> <BsTrashFill className='mx-2' /></td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default EntryList;
