import React, { useState } from 'react'
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

    const [validated, setValidated] = useState(false);

    // const email = useRef();
    // const fname = useRef();
    // const uname = useRef();
    // const phone = useRef();
    // const address = useRef();
    // const dob = useRef();
    // const city = useRef();
    // const bio = useRef();
    // const degree = useRef();
    // const passyear = useRef();
    // const postalcode = useRef();
    // const college = useRef();
    // const skill = useRef();
    // const available = useRef();
    // const certificate = useRef();
    // const language = useRef();
    // const ptype = useRef();
    // const pexperince = useRef();


    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/my_profile');
    };

    const handleSubmit = (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            alert("pls fill all required isInvalid={'isInvalid'} feilds");
        }
        setValidated(true);
    };


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
                                <Heading Heading={'My Profile'} SubHeading={'Edit My Profile'} />
                            </Box>

                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>

                            <Box>

                                <h5 className='text-secondary'>Personal Information</h5>
                                <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>

                                    <Stack direction='vertical' gap={3}>

                                        <UploadImage />

                                        <Row>

                                            <Col md={6} lg={4} className='mb-3'>
                                                {/* <Form.Label>full name</Form.Label>
                                            <Form.Control required isInvalid={'isInvalid'}  placeholder={'Full Name'} ref={fname}/> <Form.Control.Feedback type="invalid" >Please enter  a valid email.</Form.Control.Feedback>                                                
                                        */}
                                                <InputField required isInvalid={'isInvalid'} label={'Full Name'} placeholder={'Full Name'} feedback={'Please enter your name.'} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'User Name'} placeholder={'User Name'} feedback={'Please enter user name.'} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Email'} placeholder={'Email'} type='email' feedback={'Please enter valid email.'} autoComplete />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Date Of Birth'} placeholder={'Date Of Birth'} type={'date'} feedback={'Please enter Date Of Birth.'} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Phone No'} placeholder={'Phone No'} type={'number'} feedback={'Please enter Phone No.'} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Address'} placeholder={'Address'} autoComplete />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'City'} placeholder={'City'} feedback={'Please enter City.'} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Postal Code'} placeholder={'Postal Code'} feedback={'Please enter valid Postal Code.'} />
                                            </Col>

                                            <Col md={12} className='mb-3'>
                                                <InputField required isInvalid={'isInvalid'} label={'Bio Description'} placeholder={'Bio description'} as={'textarea'} feedback={'Please enter bio description'} />
                                            </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Academic Information</h5>
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"College/University Name"} SelectOption={"University"} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Degree"} SelectOption={"Degree"} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Passing Year"} SelectOption={"Passing year"} required isInvalid={'isInvalid'} />
                                            </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Skills & Expertise</h5>
                                        <Row>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Skills"} SelectOption={"Skills"} feedback={'pls select skills'} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Certifications"} SelectOption={"Certifications"} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Languages"} SelectOption={"Languages"} required isInvalid={'isInvalid'} />
                                            </Col>
                                        </Row>

                                        <h5 className='text-secondary'>Project Prefrences</h5>
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Project Type"} SelectOption={"Project Type"} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Avalilabilty"} SelectOption={"Availabilty"} required isInvalid={'isInvalid'} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <Select SelectLabel={"Project Experience"} SelectOption={"Project Experience"} required isInvalid={'isInvalid'} />
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
