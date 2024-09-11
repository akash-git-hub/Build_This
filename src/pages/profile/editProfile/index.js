import React, { useState } from 'react' 
import { Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components' 
import { Sidebar } from '../../../commonPages/sidebar';
import { Heading } from '../../../components/Heading';
import { SharedButton } from '../../../components/Button';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { UploadImage } from '../../../components/UploadImage';
import { EditPersonalInfo } from './EditPersonalInfo';
import { EditMyAcademicInfo } from './EditMyAcademicInfo';
import { EditMySkills } from './EditMySkills';
import { EditMyProjectPrefrence } from './EditMyProjectPrefrence';

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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
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

                                       <EditPersonalInfo/>

                                        <h5 className='text-secondary'>Academic Information</h5>
                                         
                                         <EditMyAcademicInfo/>

                                        <h5 className='text-secondary'>Skills & Expertise</h5>
                                       
                                         <EditMySkills/>

                                        <h5 className='text-secondary'>Project Prefrences</h5>
                                       
                                         <EditMyProjectPrefrence/>

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
