import React from 'react'
import { Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { CiEdit } from 'react-icons/ci'
import { MyProjectCard } from '../../components/MyProjectCard'
import { useNavigate } from 'react-router-dom'
import { InputField } from '../../components/InputField'

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
    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={3} md={4} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={8} className='p-0'>
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

                                <Row>
                                    <Col md={4} lg={2}><h5>User Name</h5><InputField plaintext={'plaintext'} value={'@jaylee007'} id={'user_name'} className='mb-3' readOnly={'readOnly'} /></Col>
                                    <Col md={4} lg={2}><h5>Role Name</h5><InputField plaintext={'plaintext'} value={'Product Designer'} id={'role_name'} className='mb-3' readOnly={'readOnly'} /></Col>
                                    <Col md={4} lg={2}><h5>Date Of Birth</h5><InputField plaintext={'plaintext'} value={'14-12-1991'} id={'dob'} className='mb-3' readOnly={'readOnly'} /></Col>
                                    <Col md={4} lg={2}><h5>Phone No</h5><InputField plaintext={'plaintext'} value={'+41 8989891712'} id={'phone'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /></Col>
                                    <Col md={4} lg={4}><h5>Address</h5><InputField plaintext={'plaintext'} value={'28 abu bakir street, After Ayadina Grilled Foods...'} id={'address'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /></Col>
                                    <Col md={4} lg={2}><h5>City</h5><InputField plaintext={'plaintext'} value={'Indore'} id={'city'} className='mb-3' readOnly={'readOnly'} /></Col>
                                    <Col md={4} lg={2}><h5>Postal Code</h5><InputField plaintext={'plaintext'} value={'452012'} id={'postal_code'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /> </Col>
                                    <Col md={12} lg={12}><h4 className='mt-3'>Bio/Description</h4><InputField plaintext={'plaintext'} id={'bio'} value={'Adipisicing consectetur consequat labore pariatur labore minim veniam. Cillum sint irure ipsum elit. Eiusmod sunt qui eu veniam cillum cillum adipisicing deserunt enim do laborum non. Non quis laborum amet non. Nostrud ex magna irure Lorem et nisi occaecat labore sit excepteur amet culpa consequat magna. Quis officia dolore non consectetur magna aliqua amet exercitation sit. Mollit cillum est ad duis quis aute ipsum aute sint adipisicing ea adipisicing adipisicing.'} className='mb-3' readOnly={'readOnly'} /></Col>
                                </Row>

                            </Box>
                            <p className='mb-0 mx-2'>Skills & Expertise</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={3}><h5>Skills</h5><InputField plaintext={'plaintext'} id={'skills'} value={'UI/UX Designer, FrontEnd ,Gra'} readOnly={'readOnly'} /> </Col>
                                        <Col md={6} lg={3}><h5>Certifications</h5><InputField plaintext={'plaintext'} id={'certifications'} value={'Product Designer'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Languages</h5><InputField plaintext={'plaintext'} id={'languages'} value={'Hindi,English'} readOnly={'readOnly'} /></Col>
                                    </Row>
                                </Stack>
                            </Box>
                            <p className='mb-0 mx-2'>Academic Information</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={4}><h5>College/University Name</h5><InputField plaintext={'plaintext'} id={'university'} value={'university'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Degree</h5><InputField plaintext={'plaintext'} id={'degree'} value={'Product Designer'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Passing Year</h5><InputField plaintext={'plaintext'} id={'pass_year'} value={'14-12-2022'} readOnly={'readOnly'} /></Col>
                                    </Row>
                                </Stack>
                            </Box>

                            <p className='mb-0 mx-2'>Project Prefrences</p>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={6} lg={4}><h5>Project Type</h5><InputField plaintext={'plaintext'} id={'project_type'} value={' Web design, Development, Server'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Availability</h5><InputField plaintext={'plaintext'} id={'availability'} value={'0-8 Hour'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Project Experience</h5><InputField plaintext={'plaintext'} id={'project_exp'} value={'+4 Years'} readOnly={'readOnly'} /></Col>
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
