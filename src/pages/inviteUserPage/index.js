import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SearchPanel } from '../../components/Search'
import { InviteUserList } from './inviteUser/InviteUserList'
import { SharedButton } from '../../components/Button'
import { FiUserPlus } from 'react-icons/fi'
import { FaUserPlus } from 'react-icons/fa6'
import { PopupModal } from '../../components/PopupModal'
import { createInvitationAPI, getAllUserListAPI, getMyProjects_API, getProjectsUserListAPI, getUserListProjectWiseAPI } from '../../APIServices/service'
import { WaitingLoader } from '../../commonPages/WaitingLoader'
import { errorAlert } from '../../components/Alert'
import NewSelect from '../../components/NewSelect'
import moment from 'moment-timezone'
import { MultiSelectNew } from '../../components/MultiSelectNew'
import { useNavigate } from 'react-router-dom'


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
    const navigate = useNavigate();


    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProjectId(value);
    }

    const getList = async () => {
        const res = await getUserListProjectWiseAPI();
        if (res && res.success) {
            const data = res.data;
            setInvitedList(data);
        }
    }

    const getUserList = async () => {
        try {
            setWaiting(true);
            const resp = await getAllUserListAPI();
            if (resp && resp.success) {
                const data = resp.data;
                const pre = [];
                data.forEach((item) => {
                    pre.push({ id: item.id, label: item.full_name });
                });
                setUserList(pre);
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
                data.forEach((item) => {
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
                setModalShow(true)
            }
        } catch (error) {
            console.log("Error Message--", error);
        } finally {
            setWaiting(false);
        }
    };



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
                                    <Heading Heading={'Invite User'} SubHeading={'invite user as your team members'} />
                                    <Panel>
                                        <div style={{ justifyContent: 'right', display: 'flex' }}>
                                            {/* <SearchPanel id='search' className={'w-50 bg-light bg'} /> */}
                                            <SharedButton label={'My-Invitation'} size={'sm'} variant={'primary'} className="p-2" onClick={() => navigate('/my-invitation')} />
                                        </div>
                                    </Panel>

                                    {/* inviteUser */}
                                </Stack>
                            </Box>
                            <Box>
                                <Row>
                                    <Col md={4}>
                                        <NewSelect name="project" FormLabel={'Select Project'} value={projectId} onChange={onChangeHandler} Array={projectOptions} myDefault={'select'} />
                                    </Col>
                                    <Col md={4}>
                                        <MultiSelectNew SelectLabel={'Select Users'} setClearPrefill={setClearPrefill} options={userOptions} isClear={clearPrefill} name={'selectUser'} selectedData={setSelectedData} />
                                    </Col>
                                    <Col md={4}>
                                        <br />
                                        <SharedButton label={'Invite'} size={'sm'} variant={'primary'} startIcon={<FiUserPlus />} className="p-2 w-100 mt-2" onClick={addHandler} />
                                    </Col>
                                </Row>
                            </Box>

                            <Box>
                                <InviteUserList invitedList={invitedList} />
                            </Box>

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
        </>
    )
}
