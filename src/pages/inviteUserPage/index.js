import React, { useState } from 'react'
import { Col, Container, Row, Stack, Table } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SearchPanel } from '../../components/Search'
import { InviteUserList, UserList } from './inviteUser/InviteUserList'
import { MultiSelect } from '../../components/MultiSelect'
import { SharedButton } from '../../components/Button'
import { Select } from '../../components/Select'
import { FiUserPlus } from 'react-icons/fi'
import { option } from '../../components/Helper'
import { FaUserPlus } from 'react-icons/fa6'
import { PopupModal } from '../../components/PopupModal'


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

    const [modalShow, setModalShow] = useState(false);
    const [skillsData, setSkillsdata] = useState([]);
    const userOptions = [{ id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' }, { id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' },
    { id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' }, { id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' },
    { id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' }, { id: 1, label: 'User-1' }, { id: 2, label: 'User-2' }, { id: 3, label: 'User-3' }, { id: 4, label: 'User-4' }, { id: 5, label: 'User-5' }
    ];

    const onChangeHandler = () => {
        console.log("Project selected");
    }


    return (
        <>
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
                                    <Panel><SearchPanel id='search' className={'w-50 bg-light bg'} /></Panel>
                                </Stack>
                            </Box>
                            <Box>
                                <Row>
                                    <Col md={4}>
                                        <Select name={"project"} value={'project'} onChange={onChangeHandler}
                                            option={option} SelectLabel={'Select Project'} SelectOption={'select'} /></Col>
                                    <Col md={4}>
                                        <MultiSelect SelectLabel={'Select Users'} options={userOptions} name={'selectUser'} setSkillsdata={setSkillsdata} />
                                    </Col>
                                    <Col md={4}>
                                        <br />
                                        <SharedButton label={'Invite All'} size={'sm'} variant={'primary'} startIcon={<FiUserPlus />} className="p-2 w-100 mt-2" onClick={() => setModalShow(true)} />
                                    </Col>
                                </Row>
                            </Box>

                            <Box>
                                <InviteUserList />
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
