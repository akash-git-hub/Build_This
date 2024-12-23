import React, { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap';
import { filterProjectStatus, optionAccept } from '../../../components/Helper';
import moment from 'moment-timezone';
import { changeInviteStatusAPI } from '../../../APIServices/service';
import { successAlert } from '../../../components/Alert';
import TableSelectOption from '../../../components/TableSelectOption';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const userData = [
    { name: 'user-1', skills: 'React,  , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-2  ', skills: 'Ruby, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-3  ', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-4', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-5', skills: 'React, java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-6', skills: 'React, Angular , NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
    { name: 'user-7  ', skills: 'java, NodeJS', email: 'Futurristics@gmail.com', phone: '+966583317251' },
];


export const InviteUserListJoin = ({ invitedList, setWaiting, getList }) => {

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


    const statusHandler = async (id, status, info) => {
        setWaiting(true);
        // Reference to the user's document
        const userId = info?.userId;
        const prId = info?.projectId;

        if (userId && prId) {

            const groupUsersRef = doc(db, "groupUsers", userId); // Reference to the user's document
            const groupUsersDoc = await getDoc(groupUsersRef);

            if (groupUsersDoc.exists()) {
                // If the document exists, update it by adding the new projectId to the user's array
                await updateDoc(groupUsersRef, {
                    projectIds: arrayUnion(prId)  // Add prId to the existing array, ensuring no duplicates
                });
                console.log(`Group user for ${userId} updated with projectId.`);
            } else {
                // If the document doesn't exist, create a new document for the user with just the projectIds array
                try {
                    await setDoc(groupUsersRef, {
                        projectIds: [prId]  // Initialize projectIds with the current prId
                    });
                    console.log(`New groupUsers document created for user ${userId}.`);
                } catch (error) {
                    console.error(`Error creating groupUsers document for user ${userId}: `, error);
                }
            }
        }

        const data = {
            "id": id,
            "status": status,
            "date": moment().format('DD-MM-YYYY'),
        }
        try {
            const resp = await changeInviteStatusAPI(data);
            if (resp && resp.success) {
                getList();
                successAlert(resp?.message);
            }
        } catch (error) {
            console.log("--- @@@ ---", error);
        } finally {
            setWaiting(false);
        }
    }


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
                            <td>
                                {
                                    u?.status === 'pending' ?
                                        <TableSelectOption name="project" FormLabel={null} value={u?.status} onChange={(e) => statusHandler(u?.upaId, e.target.value, u)} Array={optionAccept} myDefault={'select'} />
                                        :
                                        filterProjectStatus(optionAccept, u?.status)
                                }
                            </td>

                            {/* <td className='p-2'>{ filterProjectStatus(optionAccept,u?.status)}</td> */}
                        </tr>
                    ))}

                </tbody>
            </Table>
            {/* <Pagination size='sm' className='float-end p-3'>{items}</Pagination> */}
        </>
    );
};




