import React, { useState } from 'react'
import { Form, Image, Stack } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button'
import { CheckBox } from '../../components/CheckBox'
import { Heading } from '../../components/Heading'
import styled from 'styled-components';
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { registration_API } from '../../APIServices/service'
import { validateEmail } from '../../components/Helper'
import { errorAlert, successAlert } from '../../components/Alert'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase'


const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignUp = () => {
    const [inData, setInData] = useState({ "name": "", "email": "", "password": "", "cn_password": "" });
    const [error, setError] = useState({ "name": false, "email": false, "password": false, "cn_password": false });
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInData((pre) => ({ ...pre, [name]: value }));
        setError((pre) => ({ ...pre, [name]: false }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password, cn_password } = inData;
        let isValid = true;
        if (!name) { setError((pre) => ({ ...pre, "name": true })); isValid = false; }
        if (!email) {
            setError((pre) => ({ ...pre, "email": true })); isValid = false;
        } else {
            const validEmail = validateEmail(email);
            if (!validEmail) {
                setError((pre) => ({ ...pre, "email": true })); isValid = false;
            }

        }
        if (!password) { setError((pre) => ({ ...pre, "password": true })); isValid = false; }
        if (!password || typeof password !== 'string' || password.length < 6) {
            setError((pre) => ({ ...pre, "password": true }));
            isValid = false;
        }
        if (!cn_password) { setError((pre) => ({ ...pre, "cn_password": true })); isValid = false; }
        if (cn_password !== password) { setError((pre) => ({ ...pre, "cn_password": true })); isValid = false; }
        if (isValid) {
            try {
                // const chatRes = await createUserWithEmailAndPassword(auth, email, password);
                // if (chatRes) {
                // const firebaseUserID = chatRes?.user?.uid;
                // let preData = { ...inData };
                // preData.firebaseUserID = firebaseUserID;
                const resp = await registration_API(inData);
                if (resp && resp.success) {
                    successAlert(resp.message);
                    navigate("/");
                }
                // }
            } catch (error) {
                errorAlert('EMAIL_EXISTS')
                console.log("firebase --error", error);
            }
        }
    }

    // registration_API
    return (
        <>
            <Box>
                <Form className='form w-lg-25 w-md-50 w-sm-75 rounded-2' style={{
                    background: '#fff',
                    padding: '2rem'
                }}>
                    <Stack direction='vertical' gap={2}>
                        <Image src='./assets/images/Logo.svg' className='img-fluid w-50' />
                        <Heading Heading={'Signup'} SubHeading={'Welcome back. Enter your credentials to access your account'} />

                        <InputField
                            className={'mb-2'}
                            type={'text'}
                            label={"Full Name"}
                            controlId={'full_name'}
                            placeholder={'Enter Full Name'}
                            size={'sm'}
                            as={'input'}
                            isInvalid={error.name}
                            feedback={'Please enter your name'}
                            name={"name"}
                            onChange={onChangeHandler}
                        />
                        <InputField
                            className={'mb-2'}
                            type={'email'}
                            label={"Email Address"}
                            controlId={'email'}
                            placeholder={'Enter Email'}
                            size={'sm'}
                            as={'input'}
                            isInvalid={error.email}
                            feedback={'Please enter correct email'}
                            name={'email'}
                            onChange={onChangeHandler}
                        />
                        <InputField
                            className={'mb-2'}
                            type={'password'}
                            label={"Password"}
                            controlId={'password'}
                            placeholder={'Password'}
                            size={'sm'}
                            as={'input'}
                            isInvalid={error.password}
                            feedback={'Please enter correct password'}
                            name={"password"}
                            onChange={onChangeHandler}
                            icon={<FaRegEyeSlash />}
                        />

                        <InputField
                            className={'mb-2'}
                            type={'password'}
                            label={"Confirm Password"}
                            controlId={'confirm_password'}
                            placeholder={'Confirm Password'}
                            size={'sm'}
                            as={'input'}
                            feedback={'Please enter correct password'}
                            name={"cn_password"}
                            onChange={onChangeHandler}
                            isInvalid={error.cn_password}
                        />

                        <CheckBox
                            type={"CheckBox"}
                            label={"Keep me signed in"}
                        />
                        <SharedButton
                            type={'submit'}
                            label={'Sign up'}
                            onClick={onSubmitHandler}
                            variant={'primary'}
                            size={'sm'}
                        />
                        <p className='text-center'>Already have an account? <Link to={'/'} style={{
                            textDecoration: 'none',
                            color: '#0172BD',
                            fontWeight: '600'
                        }}>Login</Link></p>
                    </Stack>
                </Form>
            </Box>
        </>
    )
}
