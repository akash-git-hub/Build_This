import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import { filterProjectStatus, optionAccept } from '../../../components/Helper';

const userData = [
    { name: 'user-1', skills: 'React,  , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-2  ', skills: 'Ruby, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-3  ', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-4', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-5', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-6', skills: 'React, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-7  ', skills: 'java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
];


export const InviteUserList = ({ invitedList }) => {

    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(user.length / 5);

    let items = [];
    if (currentPage > 1) {
        items.push(<Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />)
    }
    for (let num = 1; num <= totalPages; num++) {
        items.push(
            <Pagination.Item key={num} active={num === currentPage} onClick={() => setCurrentPage(num)}>
                {num}
            </Pagination.Item>)
    }
    if (currentPage < totalPages) {
        items.push(<Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />)
    }


    useEffect(() => {
        setUser(userData);
    }, []);

    const indexOfLastUser = currentPage * 5;
    const indexOfFirstUser = indexOfLastUser - 5;
    const currentUser = user.slice(indexOfFirstUser, indexOfLastUser);



    return (
        <>
            <Table bordered hover responsive className='text-center'  >
                <thead>
                    <tr>
                        <td className='text-secondary p-2'>FULL NAME</td>
                        <td className='text-secondary p-2'>SKILLS</td>
                        <td className='text-secondary p-2'>EMAIL</td>
                        <td className='text-secondary p-2'>PHONE NO</td>
                        <td className='text-secondary p-2'>PROJECT NAME</td>
                        <td className='text-secondary p-2'>STATUS</td>
                    </tr>
                </thead>
                <tbody>
                    {invitedList?.map((u, i) => (
                        <tr key={i}>
                            <td className='p-2'>{u?.full_name}</td>
                            <td className='p-2'>{u?.skills}</td>
                            <td className='p-2'>{u?.email}</td>
                            <td className='p-2'>{u?.phone}</td>
                            <td className='p-2'>{u?.project_name}</td>
                            <td className='p-2'>{ filterProjectStatus(optionAccept,u?.status)}</td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            {/* <Pagination size='sm' className='float-end p-3'>{items}</Pagination> */}
        </>
    );
};




