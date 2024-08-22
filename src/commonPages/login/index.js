import React from 'react'
import { Form, Image, Stack } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button'
import { CheckBox } from '../../components/CheckBox'
import { Heading } from '../../components/Heading'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Login = () => {
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
                        <InputField className={'mb-2'} type={'email'} label={"Email Address"} controlId={'email'} placeholder={'Enter Email'} size={'sm'} as={'input'} feedback={'Please enter correct email'} />
                        <InputField className={'mb-2'} type={'password'} label={"Password"} controlId={'password'} placeholder={'Password'} size={'sm'} as={'input'} feedback={'Please enter correct password'} />
                        <CheckBox type={"CheckBox"} label={"Keep me signed in"} />
                        <SharedButton type={'submit'} label={'Login'} variant={'primary'} size={'sm'} />
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
