import React from 'react'
import { Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { CiCirclePlus, CiEdit, CiFilter } from 'react-icons/ci'
import { MyProjectCard } from '../../components/MyProjectCard'
import { useNavigate } from 'react-router-dom'

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
`

export const Profile = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/edit_profile');
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={3} className='p-1'>
                        <Sidebar />
                    </Col>
                    <Col md={9} className='p-1'>
                        <Stack direction='vertical' gap={3}>

                            <Box>
                                <Heading Heading={'My Profile'} SubHeading={'Create your project & team member'} />
                            </Box>

                            <Box>
                                <Stack direction='horizontal' gap={0} style={{ justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Stack direction='horizontal' gap={3} style={{ justifyContent: 'center', alignItem: 'center' }} >
                                        <Image src='/assets/images/Avatar.svg' className='img-fluid ' width={100} height={100} rounded />
                                        <Heading Heading={'Jaylee Fox'} SubHeading={'jaylee@foxgmail.com'} />
                                    </Stack>

                                    <Icon>
                                        <CiEdit fontSize={'1.5rem'} className='me-0' onClick={handleClick} />
                                    </Icon>

                                </Stack>
                            </Box>
                            <p className='mb-0 mx-2'>Personal Information</p>
                            <Box>

                                <Row>
                                    <Col md={4} lg={2}><h5>User Name</h5><p>@jaylee007</p></Col>
                                    <Col md={4} lg={2}><h5>Role Name</h5><p>Product Designer</p></Col>
                                    <Col md={4} lg={2}><h5>Date Of Birth</h5><p>14-12-1991</p></Col>
                                    <Col md={4} lg={2}><h5>Phone No</h5><p>+41 8989891712</p></Col>
                                    <Col md={4} lg={4}><h5>Address</h5><p className='text-ellipsis'>28 abu bakir street, After Ayadina Grilled Foods....</p></Col>
                                    <Col md={4} lg={2}><h5>City</h5><p>Indore</p></Col>
                                    <Col md={4} lg={2}><h5>Postal Code</h5><p>452012</p></Col>
                                    <Col md={12} lg={12}><h4 className='mt-5'>Bio/Description</h4><p>my name is jaylee</p></Col>
                                </Row>

                            </Box>
                            <p className='mb-0 mx-2'>Skills & Expertise</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={3}><h5>Skills</h5><p className='text-ellipsis'>UI/UX Designer, FrontEnd ,Gra</p></Col>
                                        <Col md={6} lg={3}><h5>Certifications</h5><p>Product Designer</p></Col>
                                        <Col md={6} lg={3}><h5>Languages</h5><p>Hindi,English</p></Col>
                                    </Row>
                                </Stack>
                            </Box>
                            <p className='mb-0 mx-2'>Academic Information</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={4}><h5>College/University Name</h5><p className='text-ellipsis'>@jaylee007</p></Col>
                                        <Col md={6} lg={3}><h5>Degree</h5><p>Product Designer</p></Col>
                                        <Col md={6} lg={3}><h5>Passing Year</h5><p>14-12-2022</p></Col>
                                    </Row>
                                </Stack>
                            </Box>

                            <p className='mb-0 mx-2'>Project Prefrences</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={4}><h5>Project Type</h5><p className='text-ellipsis'> Web design, Development, Server</p></Col>
                                        <Col md={6} lg={4}><h5>Availability</h5><p>0-8 Hour</p></Col>
                                        <Col md={6} lg={3}><h5>Project Experience</h5><p>+4 Years</p></Col>
                                    </Row>
                                </Stack>
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
                                            <MyProjectCard BgColor={'#FEE7F5'}  />
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
