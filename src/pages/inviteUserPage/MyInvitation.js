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


const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`

export default function MyInvitation() {

    const [waiting, setWaiting] = useState(false);
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


    const statusHandler = async (id, status) => {
        setWaiting(true);
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
            <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col md={4} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>

                    <Col md={8} lg={9} className='p-0'>
                        <Stack direction='vertical' gap={3}>

                            <Box>
                                <Stack direction='vertical' gap={2} >
                                    <Heading Heading={'My-Invitation'} SubHeading={'my projects invitation'} />
                                </Stack>
                            </Box>
                            <Box>
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
                                                            <TableSelectOption name="project" FormLabel={null} value={u?.status} onChange={(e) => statusHandler(u?.id, e.target.value)} Array={optionAccept} myDefault={'select'} />
                                                            :
                                                            filterProjectStatus(optionAccept, u?.status)
                                                    }

                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </Box>

                        </Stack>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
