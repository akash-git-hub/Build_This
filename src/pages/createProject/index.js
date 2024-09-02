import React from 'react'
import { Sidebar } from '../../commonPages/sidebar'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import { Heading } from '../../components/Heading'
import { SharedButton } from '../../components/Button'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { InputField } from '../../components/InputField'
import { Select } from '../../components/Select'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const CreateProject = () => {
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/dashboard');
    };
    return (
        <>
            <Container fluid>
                <Row>
                   <Col lg={3} md={4} className='p-0'> 
                        <Sidebar />     
                    </Col>
                    <Col lg={9} md={8} className="p-0">
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} className='d-flex justify-content-between'>
                                    <Heading Heading={'Create Project'} SubHeading={'Manage your billing and payment details'} />
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right' 
                            }}>
                                <SharedButton  label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>
                            <Box>
                                <Row>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'text'} label={'Project Name'} placeholder={'Project Name'} />
                                    </Col>
                                    <Col md={4}>
                                        <Select SelectLabel={'Category'} SelectOption={'Category'} />
                                    </Col>
                                    <Col md={4}>
                                        <Select SelectLabel={'Skill Required'} SelectOption={'Skills'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'date'} label={'Start Date'} placeholder={'Date'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'date'} label={'End Date'} placeholder={'Date'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'text'} label={'Team Members'} placeholder={'Team Members'} />
                                    </Col>
                                    <Col md={12}>
                                        <InputField className={'mb-3'} type={'textarea'} label={'Description'} placeholder={'Description'} />
                                    </Col>
                                    <Col md={4}>
                                        <SharedButton className={'w-100'} label={'Create Project'} size={'md'} variant={'primary'} onClick={handleClickBack} />
                                    </Col>
                                </Row>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
