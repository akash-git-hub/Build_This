import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../commonPages/sidebar';
import { Col, Container, Row, Stack, Table } from 'react-bootstrap';
import { WaitingLoader } from '../../commonPages/WaitingLoader';
import { Heading } from '../../components/Heading';
import styled from 'styled-components'
import { changeInviteStatusAPI, getUserProjectAssociateListAPI } from '../../APIServices/service';
import moment from 'moment-timezone';
import { SharedButton } from '../../components/Button';
import { successAlert } from '../../components/Alert';
import NewSelect from '../../components/NewSelect';
import { filterProjectStatus, optionAccept } from '../../components/Helper';
import TableSelectOption from '../../components/TableSelectOption';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`

export default function InviteRequest({ setWaiting }) {
    const [projectList, setProjectList] = useState([]);

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const getProjectList = async () => {
        const resp = await getUserProjectAssociateListAPI();
        if (resp && resp.success) {
            let data = resp.data;
            data = data.filter((e) => e.senderId != userInfo.id);
            setProjectList(data);
        }
    }


    useEffect(() => {
        getProjectList();
    }, [])


    const statusHandler = async (id, status, info) => {
        setWaiting(true);
        // Reference to the user's document
        const userId = info?.userId;
        const prId = info?.projectId;
        
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
          
        const data = {
            "id": id,
            "status": status,
            "date": moment().format('DD-MM-YYYY'),
        }
        try {
            const resp = await changeInviteStatusAPI(data);
            if (resp && resp.success) {
                getProjectList();
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
                        <td className='text-secondary p-2'>PROJECT NAME</td>
                        <td className='text-secondary p-2'>PROJECT OWNER NAME</td>
                        <td className='text-secondary p-2'>invite Date</td>
                        <td className='text-secondary p-2'>STATUS</td>
                    </tr>
                </thead>
                <tbody>
                    {projectList?.map((u, i) => (
                        <tr key={i}>
                            <td className='p-2'>{u?.project_name}</td>
                            <td className='p-2'>{u?.project_name}</td>
                            <td className='p-2'>{u?.invitedDate ? moment(u.invitedDate).format("DD-MM-YYYY") : ""}</td>
                            <td className='p-2'>
                                {
                                    u?.status === 'pending' ?
                                        <TableSelectOption name="project" FormLabel={null} value={u?.status} onChange={(e) => statusHandler(u?.id, e.target.value, u)} Array={optionAccept} myDefault={'select'} />
                                        :
                                        filterProjectStatus(optionAccept, u?.status)
                                }

                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </>
    )
}
