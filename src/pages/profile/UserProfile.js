import React, { useContext, useEffect, useState } from 'react'
import { Badge, Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button' 
import { useNavigate } from 'react-router-dom'
import { InputField } from '../../components/InputField'
import { createCertificate_API, createSkills_API, getMySkills_API, userProfileAPI } from '../../APIServices/service'
import moment from 'moment-timezone'
import { IoAddCircleOutline } from 'react-icons/io5'
import { CommonModal } from '../../components/CommonModal'
import { errorAlert, successAlert } from '../../components/Alert'
import { MyContext } from '../../App'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`
 

export const UserProfile = () => {
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
                                <Heading Heading={'User Profile'}/>
                            </Box>

                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>

                            <Box>
                                <Stack direction='horizontal' gap={0} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Stack direction='horizontal' gap={4} style={{ justifyContent: 'center', alignItem: 'center' }} >
                                        <Image src='/assets/images/Avatar.svg' className='img-fluid ' width={100} height={100} rounded />
                                        <Stack direction='vertical' gap={0} className='mt-3'>
                                            <Heading Heading={'Jaylee Fox'} SubHeading={'jaylee@foxgmail.com'} />
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={4} className='ps-2 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h6 className='mb-0 mx-2'>Personal Information</h6>
                                <Icon style={{ background: "#fff", cursor: "pointer", color: '#000' }} >
                                    <CiEdit fontSize={'1.5rem'} className='me-0' onClick={() => navigate('/edit_profile')} />
                                </Icon>
                            </Stack>
                            <Box>

                                <Row>
                                    <Col md={4} className='mb-2' >
                                        <h6>Full Name</h6>
                                        <p>{inData.fullName}</p>
                                    </Col>
                                    <Col md={4} className='mb-2' >
                                        <h6>User Name</h6>
                                        <p>{inData.userName}</p>
                                    </Col>
                                    <Col md={4} className='mb-2' >
                                        <h6>Role Name</h6>
                                        <p>Product Designer</p>
                                    </Col>
                                    <Col md={4} className='mb-2' >
                                        <h6>Date Of Birth</h6>
                                        <p>{inData && inData.dob && moment(inData.dob).format('DD-MM-YYYY')}</p>
                                    </Col>
                                    {/* <Col md={4} className='mb-2' >
                                        <h6>Phone No</h6>
                                        <p>{inData.phone}</p>
                                    </Col> */}
                                    {/* <Col md={4} className='mb-2' >
                                        <h6>Address</h6>
                                        <p>{inData.address}</p>
                                    </Col> */}
                                    <Col md={4} className='mb-2' >
                                        <h6>City</h6>
                                        <p>{inData.city}</p>
                                    </Col>
                                    {/* <Col md={4} className='mb-2' >
                                        <h6>Postal Code</h6>
                                        <p>{inData.postalCode}</p>
                                    </Col> */}
                                    <Col md={4} className='mb-2' >
                                        <h6>Languages</h6>
                                        <p>{inData.language}</p>
                                    </Col>
                                    <Col md={12} className='mb-2'>
                                        <h6 >Bio/Description</h6>
                                        <p>{inData.bio}</p>
                                    </Col>
                                </Row>

                            </Box>
                            <Stack direction='horizontal' gap={4} className='ps-2 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h6 className='mb-0 mx-2'>Skills & Expertise</h6>
                            </Stack>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row className='mb-3'>
                                        <Col md={12} className='mb-2 p-2 skillEdit'>
                                            <h6>Skills</h6>
                                            <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
                                                <CiEdit fontSize={'1.5rem'} style={{ background: 'none' }} className='me-0' onClick={() => navigate('/skillsExpertise', { state: { "data": mySkills } })} />
                                                <IoAddCircleOutline style={{ background: 'none' }} onClick={() => setSkillShow(true)} fontSize={'1.5rem'} className='me-0' />
                                            </div>
                                        </Col>
                                        <Col md={12} className='text-center'>
                                            {mySkills && mySkills.length === 0 &&
                                                <p>No Data Available</p>
                                            }
                                        </Col>
                                        <Col md={12} className='mb-2' >
                                            {mySkills && mySkills.map((e) => (<Badge bg="info" className='me-2 pt-1 pb-1'> {e.skill_name} </Badge>))}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} lg={3}><h5>Skills</h5><InputField plaintext={'plaintext'} id={'skills'} value={'UI/UX Designer, FrontEnd ,Gra'} readOnly={'readOnly'} /> </Col>
                                        <Col md={6} lg={3}><h5>Certifications</h5><InputField plaintext={'plaintext'} id={'certifications'} value={'Product Designer'} readOnly={'readOnly'} /></Col>
                                        <Col md={6} lg={3}><h5>Languages</h5><InputField plaintext={'plaintext'} id={'languages'} value={'Hindi,English'} readOnly={'readOnly'} /></Col>
                                    </Row>
                                </Stack>
                            </Box>

                            {/* <Stack direction='horizontal' gap={4} className='ps-2 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h6 className='mb-0 mx-2'>Academic Information</h6>
                                <Icon style={{ background: "#fff", cursor: "pointer", color: '#000' }} >
                                    <CiEdit fontSize={'1.5rem'} className='me-0' onClick={() => navigate('/AcademicInfo')} />
                                </Icon>
                            </Stack>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Row>
                                        <Col md={4}><h6>College/University Name</h6></Col>
                                        <Col md={4}><h6>Degree</h6></Col>
                                        <Col md={4}><h6>Passing Year</h6></Col>
                                    </Row>
                                    <Row className='mt-2'>
                                        {myAcademic.length > 0 && myAcademic.map((e) => (
                                            <>
                                                <Col md={4} className='mb-2' >
                                                    <p>{e.college_name}</p>
                                                </Col>
                                                <Col md={4} className='mb-2' >
                                                    <p>{e.degree}</p>
                                                </Col>
                                                <Col md={4} className='mb-2' >
                                                    <p>{e.passing_year && moment(e.passing_year).format("DD-MM-YYYY")}</p>
                                                </Col>
                                            </>
                                        ))}
                                    </Row>
                                </Stack>
                            </Box> */}

                             <Stack direction='horizontal' gap={4} className='ps-2 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h6 className='mb-0 mx-2'>Project Preferences</h6>
                                <Icon style={{ background: "#fff", cursor: "pointer", color: '#000' }} >
                                    <CiEdit fontSize={'1.5rem'} style={{ background: 'none' }} className='me-0' onClick={() => navigate('/projectPreferences')} />
                                </Icon>
                            </Stack>  
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
            <CommonModal
                show={skillShow}
                handleClose={() => setSkillShow(false)}
                modalTitle={'Add New Skills'}
                FormLabel={"Skill Name"}
                placeholder={"enter skill name"}
                onChangeHandler={(e) => setSkillData(e)}
                value={skillData}
                addHandler={addSkillHandler}
            />
            <CommonModal
                show={certificateShow}
                handleClose={() => setCertificateShow(false)}
                modalTitle={'Add New Certificate'}
                FormLabel={"Certificate Name"}
                placeholder={"enter certificate name"}
                onChangeHandler={(e) => setCertificateData(e)}
                value={certificateData}
                addHandler={addCertificateHandler}
            />
        </>
    )
}
