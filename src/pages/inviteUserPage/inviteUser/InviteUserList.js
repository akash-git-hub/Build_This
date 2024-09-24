import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap';

const userData = [
    { name: 'user-1', skills: 'React,  , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-2  ', skills: 'Ruby, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-3  ', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-4', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-5', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-6', skills: 'React, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-7  ', skills: 'java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
];


export const InviteUserList = () => {

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
                    </tr>
                </thead>
                <tbody>
                    {currentUser.map((userlist, index) => {
                        return (
                            <tr key={index}>
                                <td className='p-2'>{userlist.name}</td>
                                <td className='p-2'>{userlist.skills}</td>
                                <td className='p-2'>{userlist.email}</td>
                                <td className='p-2'>{userlist.phone}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Pagination size='sm' className='float-end p-3'>{items}</Pagination>
        </>
    );
};




