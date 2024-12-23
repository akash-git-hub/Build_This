import React, { useEffect, useState } from 'react'
import { Form, Image, Stack } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button'
import { CheckBox } from '../../components/CheckBox'
import { Heading } from '../../components/Heading'
import styled from 'styled-components';
import { json, Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../../components/Helper'
import { login_API, updateCompleteAPI } from '../../APIServices/service'
import { successAlert } from '../../components/Alert'
import Swal from 'sweetalert2'

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Login = () => {
    const [data, setData] = useState({ "email": "", "password": "", "keepMe": false });
    const [error, setError] = useState({ "email": false, "password": false });
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('email') && localStorage.getItem('password')) {
            const email = localStorage.getItem('email');
            const password = localStorage.getItem('password');
            const keep = localStorage.getItem('keepMe');
            setData({ "email": email, "password": password, "keepMe": keep })
        };
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        setError({ ...error, [name]: "" });
    }

    const onClickHandler = (e) => {
        const value = e.target.checked;
        const name = e.target.name;
        setData({ ...data, [name]: value });
    }


    const loginHandler = async () => {
        const { email, password, keepMe } = data;

        let isValid = true;
        if (!email) {
            setError({ ...error, email: true });
            isValid = false;
        } else { let validEmail = validateEmail(email); if (!validEmail) { setError({ ...error, email: true }); isValid = false; } }
        if (!password) { setError({ ...error, password: true }); isValid = false; }
        if (isValid) {
            const data = { "email": email, "password": password };
            const resp = await login_API(data);
            if (resp && resp.success) {
                successAlert(resp.message);
                const data = resp.data;

                localStorage.setItem('userInfo', JSON.stringify(resp.data));

                if (keepMe) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    localStorage.setItem('keepMe', keepMe);
                } else {
                    localStorage.removeItem('email');
                    localStorage.removeItem('password');
                }
                if ((data?.role).toString() === 'admin') {
                    navigate("/admin_dashboard");
                } else {
                    if (data?.profile_Complete === 'pending') {

                        Swal.fire({
                            title: "Are you specialist ?",
                            text: "",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            cancelButtonText: 'No',
                            confirmButtonText: "Yes"
                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                const resp = await updateCompleteAPI({ id: data.id });
                                navigate("/my_profile");
                            } else {
                                const resp = await updateCompleteAPI({ id: data.id });
                                navigate("/dashboard");
                            }
                        });
                    }
                      navigate("/dashboard");
                }
              


            }
        }
    }
    return (
        <>
            <Box>
                <Form className='form w-25 rounded-2' style={{
                    background: '#fff',
                    padding: '2rem'
                }}>
                    <Stack direction='vertical' gap={2}>
                        <Image src='./assets/images/Logo.svg' className='img-fluid w-50' />
                        <Heading Heading={'Login'} SubHeading={'Welcome back. Enter your credentials to access your account'} />
                        <InputField
                            className={'mb-2'}
                            onChange={onChangeHandler}
                            value={data.email}
                            type={'email'}
                            label={"Email Address"}
                            name={'email'}
                            placeholder={'Enter Email'}
                            size={'sm'}
                            feedback={'Please enter correct email'}
                            isInvalid={error.email}
                        />
                        <InputField
                            className={'mb-2'}
                            onChange={onChangeHandler}
                            value={data.password}
                            type={'password'}
                            label={"Password"}
                            name={'password'}
                            placeholder={'Password'}
                            size={'sm'}
                            as={'input'}
                            isInvalid={error.password}
                            feedback={'Please enter correct password'} />
                        <CheckBox type={"CheckBox"} name={"keepMe"} value={data.keepMe} onClick={onClickHandler} label={"Keep me signed in"} />
                        <SharedButton type={'button'} onClick={loginHandler} label={'Login'} variant={'primary'} size={'sm'} />
                        <p className='text-center'>Don’t have an account yet? <Link to={'/signup'} style={{
                            textDecoration: 'none',
                            color: '#0172BD',
                            fontWeight: '600'
                        }}>Signup</Link></p>
                    </Stack>
                </Form>
            </Box>
        </>
    )
}
