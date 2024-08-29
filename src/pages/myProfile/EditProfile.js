import React, { useRef, useState } from 'react'
import { Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { UploadImage } from '../../components/UploadImage'
import { Select } from '../../components/Select'
import { InputField } from '../../components/InputField'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`
 

export const EditProfile = () => {

    const [validated,setValidated]=useState(false);

    const email = useRef();
    const fname = useRef();
    const uname = useRef();
    const phone = useRef();
    const address = useRef();
    const dob = useRef();
    const city = useRef();
    const bio = useRef();
    const degree = useRef();
    const passyear = useRef();
    const postalcode = useRef();
    const college = useRef();
    const skill = useRef();
    const available = useRef();
    const certificate = useRef();
    const language = useRef();
    const ptype = useRef();
    const pexperince = useRef();
     

    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/my_profile');
    };

    const handleSubmit = (event) => {
      
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            console.log("pls fill all required feilds");
        } 
            setValidated(true);
            console.log("form submitted"); 
        
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
                                <Heading Heading={'My Profile'} SubHeading={'Edit My Profile'} />
                            </Box>

                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>

                            <Box>

                                <h5 className='text-secondary'>Personal Information</h5>
                                <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>
                                  
                                    <Stack direction='vertical' gap={3}>

                                    <UploadImage />
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                            {/* <Form.Label>full name</Form.Label>
                                            <Form.Control required  placeholder={'Full Name'} ref={fname}/> <Form.Control.Feedback type="invalid" >Please enter  a valid email.</Form.Control.Feedback>                                                
                                        */}
                                                 <InputField required label={'Full Name'} placeholder={'Full Name'} ref={fname} feedback={'Please enter your name.'}  /> 
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'User Name'} placeholder={'User Name'} ref={uname} feedback={'Please enter user name.'}/>
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'Email'} placeholder={'Email'} ref={email} type='email' feedback={'Please enter valid email.'}/>
                                            </Col>
                                        
                                            <Col md={6} lg={4} className='mb-3'>
                                               <InputField required label={'Date Of Birth'} placeholder={'Date Of Birth'} ref={dob} type={'date'} feedback={'Please enter Date Of Birth.'}/>
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'Phone No'} placeholder={'Phone No'} ref={phone} type={'number'} feedback={'Please enter Phone No.'}/>
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'Address'} placeholder={'Address'} ref={address} />
                                            </Col>
                                        
                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'City'} placeholder={'City'} ref={city} feedback={'Please enter City.'}/>
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                            <InputField required label={'Postal Code'} placeholder={'Postal Code'} ref={fname} feedback={'Please enter valid Postal Code.'}/>
                                            </Col>
                                       
                                            <Col md={12} className='mb-3'>
                                            <InputField required label={'Bio Description'} placeholder={'Bio description'} as={'textarea'} ref={bio} feedback={'Please enter bio description'}/>
                                            </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Academic Information</h5>
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                              <Select SelectLabel={"College/University Name"} SelectOption={"University"} ref={college} required/>
                                           </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Degree"} SelectOption={"Degree"} ref={degree} required/>
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                             <Select SelectLabel={"Passing Year"} SelectOption={"Passing year"} ref={passyear} required/> 
                                            </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Skills & Expertise</h5>
                                        <Row>
                                        
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Skills"} SelectOption={"Skills"} ref={skill} feedback={'pls select skills'} required/> 
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                             <Select SelectLabel={"Certifications"} SelectOption={"Certifications"} ref={certificate} required/> 
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Languages"} SelectOption={"Languages"} ref={language} required/> 
                                           </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Project Prefrences</h5>
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Project Type"} SelectOption={"Project Type"} ref={ptype} required/> 
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Avalilabilty"} SelectOption={"Availabilty"} ref={available} required/> 
                                             </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                            <Select SelectLabel={"Project Experience"} SelectOption={"Project Experience"} ref={pexperince} required/> 
                                          </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6} lg={4} className="d-grid"><SharedButton variant='primary' type='submit' label='Update' size='sm' className='btn-block' /></Col>
                                        </Row>

                                    </Stack>
                                </Form>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
