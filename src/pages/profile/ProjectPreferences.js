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
import EditMyProfileHeading from './EditMyProfileHeading'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const ProjectPreferences = () => {

    const [validated, setValidated] = useState(false);


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
                    <Col lg={3} md={12} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={12} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                          <EditMyProfileHeading inHeading={'My Profile'}  inSubHeading={'Edit My Profile'}/>  
                            <Stack direction='horizontal' gap={4} className='ps-4 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 className='text-secondary'>Project Preferences</h5>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>
                            <Box>
                                <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-3'>
                                    <Stack direction='vertical' gap={3}>
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
