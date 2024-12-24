import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Modal, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SearchPanel } from '../../components/Search'
import { InviteUserList } from './inviteUser/InviteUserList'
import { SharedButton } from '../../components/Button'
import { FiUserPlus } from 'react-icons/fi'
import { FaUserPlus } from 'react-icons/fa6'
import { PopupModal } from '../../components/PopupModal'
import { createInvitationAPI, getAllUserListAPI, getMyProjects_API, getProjectsUserListAPI, getUserListProjectWiseAPI, getUserProfileByIdAPI } from '../../APIServices/service'
import { WaitingLoader } from '../../commonPages/WaitingLoader'
import { errorAlert } from '../../components/Alert'
import NewSelect from '../../components/NewSelect'
import moment from 'moment-timezone'
import { MultiSelectNew } from '../../components/MultiSelectNew'
import { useNavigate } from 'react-router-dom'
import { InviteUserListJoin } from './inviteUser/InviteUserListJoin'
import InviteRequest from './InviteRequest'
import { NewMultiSelectWithImage } from '../../components/NewMultiSelectWithImage'


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
background:#e6f5ff;
width:50px;
height:50px;
color:green; 
display:flex;
justify-content:center;
align-items:center;
margin:auto;  
border-radius: 50%;
overflow:hidden;
`;


export const InviteUser = () => {
    const [userOptions, setUserOptions] = useState([]);
    const [userList, setUserList] = useState([]);
    const [projectOptions, setProjectOptions] = useState([]);
    const [waiting, setWaiting] = useState();
    const [modalShow, setModalShow] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [projectId, setProjectId] = useState();
    const [clearPrefill, setClearPrefill] = useState(false);
    const [invitedList, setInvitedList] = useState([]);
    const [joinList, setJoinList] = useState([]);

    const navigate = useNavigate();
    const [isJoin, setIsJoin] = useState(false);
    const [isInvite, setIsInvite] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [inData, setInData] = useState();

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProjectId(value);
        setSelectedData([]);
    }

    const getList = async () => {
        const res = await getUserListProjectWiseAPI();
        if (res && res.success) {
            let data = res.data;
            let data2 = data.filter((e) => e.senderId == userInfo.id);
            let data3 = data.filter((e) => e.senderId != userInfo.id);
            setJoinList(data3);
            setInvitedList(data2);
        }
    }


    const getUserList = async () => {
        try {
            setWaiting(true);
            const resp = await getAllUserListAPI();
            if (resp && resp.success) {
                const data = resp.data;
                const pre = [];
                data?.forEach((item) => {
                    pre.push({ id: item.id, skill_names: item.skill_names, label: item.full_name, profile: item?.pr_image ? item.pr_image : './assets/images/profileHolder.png' });
                });
                setUserList(pre);
                setUserOptions(pre);
            } else {
                errorAlert(resp.message || "Failed to fetch user list");
            }
        } catch (error) {
            console.error("Error fetching user list: ", error);
            errorAlert("An error occurred while fetching the user list.");
        } finally {
            setWaiting(false);
        }
    };

    const getOptions = async (id) => {
        try {
            if (id) {
                const res = await getProjectsUserListAPI(id);
                if (res && res.success) {
                    const data = res.data;
                    const pre = userList.filter((u) => !data.some((d) => d?.userId === String(u?.id)));
                    if (pre?.length === 0) {
                        setUserOptions([]);
                        errorAlert("All users are already invite to this project.");
                    } else {
                        setUserOptions(pre);
                    }
                } else {
                    setUserOptions(userList);
                }
            }
        } catch (error) {
            console.error("Error fetching user options:", error); // More descriptive error log
        }
    };

    useEffect(() => {
        getOptions(projectId);
    }, [projectId])

    const getProjectList = async () => {
        try {
            setWaiting(true);
            const resp = await getMyProjects_API();
            if (resp && resp.success) {
                const data = resp.data;
                const pre = [];
                data?.forEach((item) => {
                    pre.push({ value: item.id, name: item.project_name });
                });
                setProjectOptions(pre);
            }
        } catch (error) {
            console.error("Error fetching user list: ", error);
            errorAlert("An error occurred while fetching the user list.");
        } finally {
            setWaiting(false);
        }
    };

    useEffect(() => { getUserList(); getProjectList(); getList(); }, []);

    const addHandler = async () => {
        if (!projectId) { errorAlert("Please select a project."); return false; }
        if (selectedData?.length === 0) { errorAlert("Please select at least one user."); return false; }
        setWaiting(true);
        try {
            const data = {
                "projectId": projectId,
                "invitedUserIds": selectedData,
                "invitedDate": moment().format("YYYY-MM-DD"),
            }
            const res = await createInvitationAPI(data);
            if (res && res.success) {
                setWaiting(false);
                setProjectId();
                setClearPrefill(true);
                getList();
                setModalShow(true);
                setSelectedData([]);

            }
        } catch (error) {
            console.log("Error Message--", error);
        } finally {
            setWaiting(false);
        }
    };


    const redirectHandler = async (id) => {
        if (id) {
            const resp = await getUserProfileByIdAPI(id);
            if (resp) {
                const data = resp.data;
                setInData(data);
                setShowModal(true);
            }

        }
    }

    const newCheckHandler = (e, data) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedData([...selectedData, data]);
        } else {
            if (selectedData.some((item) => item.id === data.id)) {
                setSelectedData(
                    selectedData.filter((item) => item.id !== data.id)
                );
            }
        }
    }


    const checkIsSelect = (myId) => {
        if (selectedData.length > 0) {
            return selectedData.some((item) => item.id === myId);
        }
    }

    return (
        <>
            <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col md={12} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>

                    <Col md={12} lg={9} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='vertical' gap={2} >
                                    <Heading Heading={'Invite User'} SubHeading={'invite user as your team members'} />
                                    <Panel>
                                        <div style={{ justifyContent: 'right', display: 'flex' }}>
                                            {/* <SearchPanel id='search' className={'w-50 bg-light bg'} /> */}
                                            {isInvite ?
                                                <SharedButton label={'Back'} size={'sm'} variant={'primary'}
                                                    className="p-2 ms-2" onClick={() => { setIsInvite(false); }} />
                                                :
                                                <SharedButton label={'My-Invitation'} size={'sm'} variant={'primary'} className="p-2"
                                                    onClick={() => { setIsJoin(false); setIsInvite(true); }}
                                                />
                                            }
                                            {isJoin ?
                                                <SharedButton label={'Back'} size={'sm'} variant={'primary'}
                                                    className="p-2 ms-2" onClick={() => { setIsJoin(false); }} />
                                                :
                                                <SharedButton label={'Join-Request'} size={'sm'} variant={'primary'}
                                                    className="p-2 ms-2" onClick={() => { setIsInvite(false); setIsJoin(true) }} />
                                            }
                                        </div>
                                    </Panel>

                                    {/* inviteUser */}
                                </Stack>
                            </Box>
                            {!isJoin && !isInvite &&
                                <>
                                    <Box>
                                        <Row>
                                            <Col md={6}>
                                                <NewSelect name="project" FormLabel={'Select Project'} value={projectId} onChange={onChangeHandler} Array={projectOptions} myDefault={'select'} />
                                            </Col>
                                            <Col md={6}>
                                                <br />
                                                <SharedButton label={'Invite'} size={'sm'} variant={'primary'} startIcon={<FiUserPlus />} className="p-2 w-100 mt-1" onClick={addHandler} />
                                            </Col>
                                        </Row>
                                        <hr />
                                        <Row className='g-3' style={{ maxHeight: '300px', overflow: "auto" }}>
                                            <Col md={12} className='mb-2'>Select Users</Col>
                                            {userOptions && userOptions?.length > 0 ?
                                                userOptions.map((data, index) => (
                                                    <Col md={3} lg={2} xs={6} className='mb-2' key={index}>
                                                        <Card style={{ padding: ' 2px 0px 2px 0px' }}>
                                                            <div className='card-check-box'>
                                                                <input type="checkbox" id="vehicle2" name="vehicle2" checked={checkIsSelect(data.id)} onClick={(e) => newCheckHandler(e, data)} />
                                                            </div>
                                                            <div style={{ margin: 'auto' }}>
                                                                <Card.Img variant="top" src={data?.profile} style={{ width: '60px', height: '60px', overflow: 'hidden', border: "1px solid black", borderRadius: '100px' }} />
                                                            </div>
                                                            <Card.Body style={{ padding: '5px 2px 5px 2px', cursor: 'pointer', maxHeight: '75px', minHeight: '75px', overflow: 'hidden' }} onClick={() => redirectHandler(data?.id)}>
                                                                <Card.Text style={{ padding: '0px 5px' }}>
                                                                    <span className='d-block' style={{ fontSize: '12px' }}> <b> {data?.label} </b></span>
                                                                    <span
                                                                        style={{
                                                                            display: 'webkit-box',
                                                                            WebkitBoxOrient: 'vertical',
                                                                            overflow: 'hidden',          // Hides the overflow text
                                                                            WebkitLineClamp: 2,          // Limits to 2 lines
                                                                            textOverflow: 'ellipsis',    // Adds '...' at the end
                                                                            cursor: 'pointer',
                                                                            fontSize: '12px'
                                                                        }}
                                                                    >
                                                                        <b>Skills: </b>
                                                                        {data?.skill_names?.length > 25 ? `${data?.skill_names.substring(0, 25)}...` : data?.skill_names}
                                                                    </span>
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                ))
                                                :
                                                <Col md={12} className="text-center" >
                                                    <p style={{ margin: '10px auto' }}><b>No Record Found</b></p>
                                                </Col>
                                            }

                                            {/* <Col md={4}>
                                                <NewMultiSelectWithImage SelectLabel={'Select Users'} setClearPrefill={setClearPrefill} options={userOptions} isClear={clearPrefill} name={'selectUser'} selectedData={setSelectedData} redirectHandler={redirectHandler} />
                                            </Col> */}

                                        </Row>
                                    </Box>
                                    {/* <Box>
                                        <InviteUserList invitedList={invitedList} />
                                    </Box>  */}
                                </>
                            }
                            {isJoin &&
                                <Box>
                                    <InviteUserListJoin invitedList={joinList} setWaiting={setWaiting} getList={getList} />
                                </Box>
                            }

                            {isInvite &&
                                <Box>
                                    <InviteRequest setWaiting={setWaiting} />
                                    {/* <InviteUserListJoin invitedList={joinList} setWaiting={setWaiting} getList={getList} /> */}
                                </Box>
                            }
                        </Stack>
                    </Col>
                </Row >
            </Container >
            <PopupModal
                size={'sm'}
                icon={<Icon><FaUserPlus fontSize={"1.5rem"} /></Icon>}
                title={'Invite Successfully'}
                subtitle={'Your invite has been processed successfully'}
                dialogClassName={'text-center'}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <Modal show={showModal} onHide={() => setShowModal(false)} animation={true} size='lg' aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title>User Profile Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack>
                        <Box>
                            <Image src={inData?.pr_image ? inData.pr_image : '/assets/images/profileHolder.png'} className='img-fluid ' style={{ width: "60px", border: '1px solid', borderRadius: "30px" }} />
                        </Box>
                        <Box>
                            <Row>
                                <Col md={4} className='mb-2' >
                                    <h6>Full Name</h6>
                                    <p>{inData?.full_name}</p>
                                </Col>
                                <Col md={4} className='mb-2' >
                                    <h6>User Name</h6>
                                    <p>{inData?.user_name}</p>
                                </Col>
                                <Col md={4} className='mb-2' >
                                    <h6>Email</h6>
                                    <p>{inData?.email}</p>
                                </Col>
                                <Col md={4} className='mb-2' >
                                    <h6>Date Of Birth</h6>
                                    <p>{inData && inData?.dob && moment(inData.dob).format('DD-MM-YYYY')}</p>
                                </Col>
                                {/* <Col md={4} className='mb-2' >
                                    <h6>Phone No</h6>
                                    <p>{inData?.phone}</p>
                                </Col> */}
                                {/* <Col md={4} className='mb-2' >
                                    <h6>Address</h6>
                                    <p>{inData?.address}</p>
                                </Col> */}
                                <Col md={4} className='mb-2' >
                                    <h6>City</h6>
                                    <p>{inData?.city}</p>
                                </Col>
                                {/* <Col md={4} className='mb-2' >
                                    <h6>Postal Code</h6>
                                    <p>{inData?.postal_code}</p>
                                </Col> */}
                                <Col md={4} className='mb-2' >
                                    <h6>Languages</h6>
                                    <p>{inData?.language}</p>
                                </Col>
                                <Col md={12} className='mb-2'>
                                    <h6 >Bio/Description</h6>
                                    <p>{inData?.bio}</p>
                                </Col>
                            </Row>
                        </Box>
                    </Stack>
                </Modal.Body>

            </Modal>
        </>
    )
}
