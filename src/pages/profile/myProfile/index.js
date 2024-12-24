import React from 'react'
import { Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../../commonPages/sidebar'
import { Heading } from '../../../components/Heading'
import styled from 'styled-components'
import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { PersonalInfo } from './PersonalInfo'
import { MySkills } from './MySkills'
import { MyAcademicInfo } from './MyAcademicInfo'
import { MyProjectPrefrence } from './MyProjectPrefrence'
import { MyProjectCard } from '../../../components/MyProjectCard'
import { SharedButton } from '../../../components/Button'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`
const Icon = styled.div`
background:#e6f5ff;
padding: 0.5rem;
color:blue;
border-radius: 30px;
`;

export const MyProfile = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={3} md={12} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={12} className='p-0'>
                        <Stack direction='vertical' gap={3}>

                            <Box>
                                <Heading Heading={'My Profile'} SubHeading={'Create your project & team member'} />
                            </Box>

                            <Box>
                                <Stack direction='horizontal' gap={0} style={{ justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Stack direction='horizontal' gap={4} style={{ justifyContent: 'center', alignItem: 'center' }} >
                                        <Image src='/assets/images/Avatar.svg' className='img-fluid ' width={100} height={100} rounded />
                                        <Stack direction='vertical' gap={0} className='mt-3'>
                                            <Heading Heading={'Jaylee Fox'} SubHeading={'jaylee@foxgmail.com'} />
                                        </Stack>

                                    </Stack>

                                    <Icon>
                                        <CiEdit fontSize={'1.5rem'} className='me-0' onClick={() => navigate('/edit_profile')} />
                                    </Icon>

                                </Stack>
                            </Box>

                            <p className='mb-0 mx-2'>Personal Information</p>

                            <Box>
                              <PersonalInfo/>
                            </Box>

                            <p className='mb-0 mx-2'>Skills & Expertise</p>

                            <Box>
                              <MySkills/>
                            </Box>

                            <p className='mb-0 mx-2'>Academic Information</p>

                            <Box>
                               <MyAcademicInfo/>
                            </Box>

                            <p className='mb-0 mx-2'>Project Prefrences</p>

                            <Box>
                               <MyProjectPrefrence/>
                            </Box>
                            
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>My Project</h6>
                                    <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_project')} />
                                </Stack>

                                <div>
                                    <Row >
                                        <Col className='mb-3' md={6} lg={4} xl={3}>
                                            <MyProjectCard BgColor={"#FEEEE7"} />
                                        </Col>
                                        <Col className='mb-3' md={6} lg={4} xl={3}>
                                            <MyProjectCard BgColor={'#E7F0FE'} />
                                        </Col>
                                        <Col className='mb-3' md={6} lg={4} xl={3}>
                                            <MyProjectCard BgColor={'#FEE7F5'} />
                                        </Col>
                                        <Col className='mb-3' md={6} lg={4} xl={3}>
                                            <MyProjectCard BgColor={'#ECFEE7'} />
                                        </Col>
                                    </Row>
                                </div>
                            </Box>

                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
