import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { UploadImage } from '../../components/UploadImage'
import { InputField } from '../../components/InputField'
import EditMyProfileHeading from './EditMyProfileHeading'
import { updateUserProfileAPI } from '../../APIServices/service'
import { successAlert } from '../../components/Alert'
import { MyContext } from '../../App'
import { WaitingLoader } from '../../commonPages/WaitingLoader'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const EditProfile = () => {
    const [inData, setInData] = useState({ "id": "", "fullName": "", "userName": "", "email": "", "dob": "", "phone": "", "address": "", "city": "", "postalCode": "","language":"", "bio": "", "image": "" });
    const [feedback, setFeedback] = useState({ "fullName": "", "userName": "", "email": "", "dob": "", "phone": "", "address": "", "city": "", "postalCode": "","language":"", "bio": "", "image": "" });
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);
    const { info, userData } = useContext(MyContext);




    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInData((pre) => ({ ...pre, [name]: value }));
        setFeedback((pre) => ({ ...pre, [name]: "" }));
    }

    const imageHandler = (e) => {
        const { name, value } = e;
        setInData((pre) => ({ ...pre, [name]: value }));
    }

    const getUserData = async (data) => {
        if (data) {
            const { full_name, user_name, email, dob, phone, address, city, postal_code, bio, id ,language} = data;
            setInData({
                'id': id,
                "fullName": full_name,
                "userName": user_name,
                "email": email,
                "dob": dob,
                "phone": phone,
                "address": address,
                "city": city,
                "postalCode": postal_code,
                "bio": bio,
                "language":language,
                "image": "",
            });
        }
    }
    useEffect(() => {
        if (info !== "") {
            getUserData(info);
        }
    }, [info])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, userName, email, dob, phone, address, city, postalCode, bio, image, id,language } = inData;
        let isValid = true;
        if (!fullName) { setFeedback((pre) => ({ ...pre, 'fullName': "Please enter your name." })); isValid = false; }
        if (!userName) { setFeedback((pre) => ({ ...pre, 'userName': "Please enter your user name." })); isValid = false; }
        if (!email) { setFeedback((pre) => ({ ...pre, 'email': "Please enter your valid email." })); isValid = false; }
        if (!dob) { setFeedback((pre) => ({ ...pre, 'dob': "Please enter Date Of Birth." })); isValid = false; }
        // if (!phone) { setFeedback((pre) => ({ ...pre, 'phone': "Please enter Phone No." })); isValid = false; }
        // if (!address) { setFeedback((pre) => ({ ...pre, 'address': "Please enter your address." })); isValid = false; }
        if (!city) { setFeedback((pre) => ({ ...pre, 'city': "Please enter your city." })); isValid = false; }
        // if (!postalCode) { setFeedback((pre) => ({ ...pre, 'postalCode': "Please enter your postal code." })); isValid = false; }
        if (!language) { setFeedback((pre) => ({ ...pre, 'language': "Please enter your languages." })); isValid = false; }
        if (!bio) { setFeedback((pre) => ({ ...pre, 'bio': "Please enter your bio description." })); isValid = false; }
        if (phone) {
            const phoneNoStr = phone.toString();
            if (phoneNoStr.length !== 10 || isNaN(Number(phoneNoStr))) {
                setFeedback((pre) => ({ ...pre, "phone": "* Contact Number Must be Numeric and Contain 10 Digits" }));
                isValid = false;
            }
        }
        if (isValid) {
            setWaiting(true);
            const formData = new FormData();
            formData.append('userId', id);
            formData.append('fullName', fullName);
            formData.append('userName', userName);
            formData.append('dob', dob);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('city', city);
            formData.append('postalCode', postalCode);
            formData.append('language',language);
            formData.append('bio', bio);
            formData.append('image', image);
            const resp = await updateUserProfileAPI(formData);
            if (resp && resp.success) {
                e.target.reset();
                setWaiting(false);
                userData();
                successAlert(resp.message);
            }
            setWaiting(false);
        }
    };


    return (
        <>
        <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col lg={3} md={12} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={12} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                            <EditMyProfileHeading inHeading={'My Profile'} inSubHeading={'Edit My Profile'} />
                            <Stack direction='horizontal' gap={4} className='ps-4 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 className='text-secondary'>Personal Information </h5>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={() => navigate('/my_profile')} />
                            </Stack>
                            <Box>
                                <Form  onSubmit={handleSubmit} className='mt-3'>
                                    <Stack direction='vertical' gap={3}>
                                        <UploadImage
                                            FormLabel="Upload Profile"
                                            name="image"
                                            controlId="formProfilePic"
                                            onChange={imageHandler}
                                        />
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='fullName' value={inData.fullName} onChange={onChangeHandler} label={'Full Name'} placeholder={'Full Name'} isInvalid={feedback.fullName} feedback={feedback.fullName} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='userName' value={inData.userName} onChange={onChangeHandler} label={'User Name'} placeholder={'User Name'} isInvalid={feedback.userName} feedback={feedback.userName} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField readOnly={true} required name='email' value={inData.email} onChange={onChangeHandler} label={'Email'} placeholder={'Email'} type='email' isInvalid={feedback.email} feedback={feedback.email} autoComplete />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='dob' value={inData.dob} onChange={onChangeHandler} label={'Date Of Birth'} placeholder={'Date Of Birth'} type={'date'} isInvalid={feedback.dob} feedback={feedback.dob} />
                                            </Col>

                                            {/* <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='phone' value={inData.phone} onChange={onChangeHandler} label={'Phone No'} placeholder={'Phone No'} type={'number'} isInvalid={feedback.phone} feedback={feedback.phone} />
                                            </Col>

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='address' value={inData.address} onChange={onChangeHandler} label={'Address'} placeholder={'Address'} isInvalid={feedback.address} feedback={feedback.address} />
                                            </Col> */}

                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='city' value={inData.city} onChange={onChangeHandler} label={'City'} placeholder={'City'} isInvalid={feedback.city} feedback={feedback.city} />
                                            </Col>

                                            {/* <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='postalCode' value={inData.postalCode} onChange={onChangeHandler} label={'Postal Code'} placeholder={'Postal Code'} isInvalid={feedback.postalCode} feedback={feedback.postalCode} />
                                            </Col> */}
                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='language' value={inData.language} onChange={onChangeHandler} label={'Languages'} placeholder={'Hindi,English'} isInvalid={feedback.language} feedback={feedback.language} />
                                            </Col>

                                            <Col md={12} className='mb-3'>
                                                <InputField required name='bio' value={inData.bio} onChange={onChangeHandler} label={'Bio Description'} placeholder={'Bio description'} as={'textarea'} isInvalid={feedback.bio} feedback={feedback.bio} />
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
