import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Modal, Row, Stack, Table } from 'react-bootstrap'
import styled from 'styled-components'
import { CiCirclePlus, CiFilter } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Heading } from '../../../components/Heading'
import { AdminSidebar } from '../../../commonPages/admin_sidebar/AdminSidebar'
import { adminGetAllProjectsAPI, adminGetAllUsersAPI, changeProjectStatusAPI, getAllProjectsAPI, getMyProjects_API } from '../../../APIServices/service'
import { MyContext } from '../../../App'
import { SharedButton } from '../../../components/Button'
import { FaBorderAll, FaRegUser } from 'react-icons/fa6'
import { GrProjects } from 'react-icons/gr'
import TableSelectOption from '../../../components/TableSelectOption'
import { filterProjectStatus, projectStatus } from '../../../components/Helper'
import { errorAlert, successAlert } from '../../../components/Alert'
import { WaitingLoader } from '../../../commonPages/WaitingLoader'
import { MdOutlinePendingActions } from 'react-icons/md'
import { VscLayersActive } from 'react-icons/vsc'
import { TbDetails } from 'react-icons/tb'
import Swal from 'sweetalert2'
import { IoIosInformationCircleOutline } from 'react-icons/io'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`
const Panel = styled.div`
  background: #E6F5FF;
  padding: 0.8rem;
  margin: 1rem 0rem;
`
const Icon = styled.div`
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 30px;
`

export const AdminDashboard = () => {
    const { getMySkills, userData, getMyCertificate, getAcademic } = useContext(MyContext);

    const [show, setShow] = useState(false);
    const [waiting, setWaiting] = useState(false);

    const [priority, setPriority] = useState(1);
    const [showDetail, setShowDetail] = useState();

    const [activeProject, setActiveProject] = useState([]);
    const [pendingProject, setPendingProject] = useState([]);
    const [othersAllProject, setOthersAllProject] = useState([]);


    const [allUsers, setAllUsers] = useState([]);

    const getAllUsersList = async () => {
        const res = await adminGetAllUsersAPI();
        if (res && res.success) {
            const data = res.data;
            setAllUsers(data);
        }
    }


    const getTeamProjects = async () => {
        const res = await adminGetAllProjectsAPI();
        if (res && res.success) {
            const data = res.data;
            let active = data.filter((e) => e.status === 'active');
            let pending = data.filter((e) => e.status === 'pending');
            let othersAll = data.filter((e) => e.status != 'pending' && e.status != 'active');
            setActiveProject(active);
            setPendingProject(pending);
            setOthersAllProject(othersAll);
        }
    }

    useEffect(() => { getTeamProjects(); getAllUsersList(); }, [])

    useEffect(() => {
        if (localStorage.getItem('Authorization') && localStorage.getItem('Authorization') !== "") {
            userData();
            getMySkills();
            getMyCertificate();
            getAcademic();
        }
    }, [localStorage.getItem('Authorization')])


    // const projectList = [];

    const statusHandler = async (id, status) => {
        if (!id) { errorAlert("Project id is required"); }

        if (status === 'rejected') {
            Swal.fire({
                title: "Please enter the rejection reason",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,
                preConfirm: (inputValue) => {
                    // Optional: Validate the input value before confirming
                    if (!inputValue) {
                        Swal.showValidationMessage('Please provide a reason for rejection');
                    }
                    return inputValue; // Returns the input value
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Set the rejection reason to state
                    const rejectionReason = result.value;
                    const data = {
                        "status": status,
                        "projectId": id,
                        "reason": rejectionReason
                    }
                    setWaiting(true);
                    try {
                        const resp = await changeProjectStatusAPI(data);
                        if (resp && resp.success) {
                            getTeamProjects();
                            successAlert(resp?.message);
                        }
                    } catch (error) {
                        console.log("error!-----", error);
                    } finally {
                        setWaiting(false);
                    }
                }
            });
        } else {
            const data = {
                "status": status,
                "projectId": id,
                "reason": ''
            }
            setWaiting(true);
            try {
                const resp = await changeProjectStatusAPI(data);
                if (resp && resp.success) {
                    getTeamProjects();
                    successAlert(resp?.message);
                }

            } catch (error) {
                console.log("error!-----", error);
            } finally {
                setWaiting(false);
            }

        }
    }
    return (
        <>
            <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col md={12} lg={3} className='p-0 '>
                        <AdminSidebar />
                    </Col>
                    <Col md={12} lg={9} className='p-0 content-lg-area'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                    <Heading Heading={'Dashboard'}
                                    />
                                </Stack>
                                <Panel>
                                    <Stack direction='horizontal' gap={2} style={{ justifyContent: 'end' }}>
                                        <SharedButton
                                            label={'All Users'}
                                            size={'sm'}
                                            variant={!show ? 'primary' : 'secondary'}
                                            startIcon={<FaRegUser />}
                                            onClick={() => setShow(false)}
                                        />
                                        <SharedButton
                                            label={'All Project'}
                                            size={'sm'}
                                            variant={!show ? 'secondary' : 'primary'}
                                            startIcon={<GrProjects />}
                                            onClick={() => setShow(true)}
                                        />
                                    </Stack>
                                </Panel>
                            </Box>

                            {!show ?

                                <Box>
                                    <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h6 className='mb-4'>All Users</h6>
                                    </Stack>
                                    <Table bordered hover responsive className='text-center'  >
                                        <thead>
                                            <tr>
                                                <td className='text-secondary p-2'>NAME</td>
                                                <td className='text-secondary p-2'>EMAIL</td>
                                                {/* <td className='text-secondary p-2'>PHONE</td> */}
                                                <td className='text-secondary p-2'>ACTION</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers?.map((u, i) => (
                                                <tr key={i}>
                                                    <td className='p-2'>{u?.full_name}</td>
                                                    <td className='p-2'>{u?.email}</td>
                                                    {/* <td className='p-2'>{u?.phone}</td> */}
                                                    <td className='p-2'> <SharedButton
                                                        label={'View'}
                                                        size={'sm'}
                                                        variant={'primary'}
                                                        startIcon={<TbDetails />}
                                                        onClick={() => setShowDetail(u)}
                                                    />
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </Box>

                                :

                                <Box>
                                    <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h6 className='mb-4'>All Project</h6>
                                        <Stack direction='horizontal' gap={2} style={{ justifyContent: 'end' }}>
                                            <SharedButton
                                                label={'Active'}
                                                size={'sm'}
                                                variant={priority === 1 ? 'primary' : 'secondary'}
                                                startIcon={<VscLayersActive />}
                                                onClick={() => setPriority(1)}
                                            />
                                            <SharedButton
                                                label={'Pending'}
                                                size={'sm'}
                                                variant={priority === 2 ? 'primary' : 'secondary'}
                                                startIcon={<MdOutlinePendingActions />}
                                                onClick={() => setPriority(2)}
                                            />
                                            <SharedButton
                                                label={'Rejected'}
                                                size={'sm'}
                                                variant={priority === 3 ? 'danger' : 'secondary'}
                                                startIcon={<FaBorderAll />}
                                                onClick={() => setPriority(3)}
                                            />

                                        </Stack>
                                    </Stack>
                                    <Table bordered hover responsive className='text-center mt-4'  >
                                        <thead>
                                            <tr>
                                                <td className='text-secondary p-2'>PROJECT NAME</td>
                                                <td className='text-secondary p-2'>PROJECT OWNER NAME</td>
                                                <td className='text-secondary p-2'>CREATE DATE</td>
                                                <td className='text-secondary p-2'>STATUS</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {priority === 1 ?
                                                activeProject?.map((u, i) => (
                                                    <tr key={i}>
                                                        <td className='p-2'>{u?.project_name}</td>
                                                        <td className='p-2'>{u?.full_name}</td>
                                                        <td className='p-2'>{u?.createDate}</td>
                                                        <td className='p-2'>
                                                            {
                                                                filterProjectStatus(projectStatus, u?.status)
                                                            }

                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                priority === 2 ?
                                                    pendingProject?.map((u, i) => (
                                                        <tr key={i}>
                                                            <td className='p-2'>{u?.project_name}</td>
                                                            <td className='p-2'>{u?.full_name}</td>
                                                            <td className='p-2'>{u?.createDate}</td>
                                                            <td className='p-2'>
                                                                {
                                                                    u?.status === 'pending' ?
                                                                        <TableSelectOption name="project" FormLabel={null} value={u?.status} onChange={(e) => statusHandler(u?.id, e.target.value, u)} Array={projectStatus} myDefault={'select'} />
                                                                        :
                                                                        filterProjectStatus(projectStatus, u?.status)
                                                                }

                                                            </td>
                                                        </tr>
                                                    ))

                                                    :
                                                    othersAllProject?.map((u, i) => (
                                                        <tr key={i}>
                                                            <td className='p-2'>{u?.project_name}</td>
                                                            <td className='p-2'>{u?.full_name}</td>
                                                            <td className='p-2'>{u?.createDate}</td>
                                                            <td className='p-2'>
                                                                {filterProjectStatus(projectStatus, u?.status)}
                                                                <IoIosInformationCircleOutline onClick={() => { Swal.fire({ text: u?.rejection_reason }); }} color='red' fontSize={'20px'} style={{ marginLeft: '5px',cursor:'pointer' }} />

                                                            </td>
                                                        </tr>
                                                    ))

                                            }



                                        </tbody>
                                    </Table>
                                </Box>

                            }

                        </Stack>
                    </Col>
                </Row>
            </Container>


            <Modal size="lg" show={showDetail != undefined ? true : false} onHide={() => { setShowDetail() }} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>User Full Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <Box>
                            <Row>
                                <Col md={4}>
                                    <h6>Name</h6>
                                    <p><img src={showDetail?.pr_image ? showDetail?.pr_image : './assets/images/profileHolder.png'} alt='' style={{ width: '30px', marginRight: "10px" }} />{showDetail?.full_name}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Email</h6>
                                    <p>{showDetail?.email}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>phone</h6>
                                    <p>{showDetail?.phone}</p>
                                </Col>
                                <hr />
                                <Col md={4}>
                                    <h6>Date Of Birth</h6>
                                    <p>{showDetail?.dob}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>City</h6>
                                    <p>{showDetail?.city}</p>
                                </Col>
                                <Col md={4}>
                                    <h6>Language</h6>
                                    <p>{showDetail?.language}</p>
                                </Col>
                                <hr />
                            </Row>

                        </Box>
                    </Stack>
                </Modal.Body>

            </Modal>
        </>
    )
}
