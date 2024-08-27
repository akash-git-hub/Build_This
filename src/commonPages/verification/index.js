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

export const Verification = () => {
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
                        <Stack direction='horizontal' gap={3}>
                            <InputField className={'mb-2'} type={'text'} controlId={'code'} size={'lg'} as={'input'} />
                            <InputField className={'mb-2'} type={'text'} controlId={'code'} size={'lg'} as={'input'} />
                            <InputField className={'mb-2'} type={'text'} controlId={'code'} size={'lg'} as={'input'} />
                            <InputField className={'mb-2'} type={'text'} controlId={'code'} size={'lg'} as={'input'} />
                        </Stack>
                        <SharedButton type={'submit'} label={'Send'} variant={'primary'} size={'sm'} />
                    </Stack>
                </Form>
            </Box>
        </>
    )
}
