import React from 'react'
import { Form, Image, Stack } from 'react-bootstrap'
import { InputField } from '../../components/InputField'
import { SharedButton } from '../../components/Button'
import { Heading } from '../../components/Heading'
import styled from 'styled-components';

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ForgotPassword = () => {
    return (
        <>
            <Box>
                <Form className='form w-25 rounded-2' style={{
                    background: '#fff',
                    padding: '2rem'
                }}>
                    <Stack direction='vertical' gap={2}>
                        <Image src='./assets/images/Logo.svg' className='img-fluid w-50' />
                        <Heading Heading={'Forgot Password'} SubHeading={'Recover their password if forgotten'} />
                        <InputField className={'mb-2'} type={'email'} label={"Email Address"} controlId={'email'} placeholder={'Enter Email'} size={'sm'} as={'input'} feedback={'Please enter correct email'} />
                        <SharedButton type={'submit'} label={'Send'} variant={'primary'} size={'sm'} />
                    </Stack>
                </Form>
            </Box>
        </>
    )
}
