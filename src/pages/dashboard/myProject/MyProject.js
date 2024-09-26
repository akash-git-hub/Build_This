import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { Heading } from '../../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../../components/Button'
import { CiFilter } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { MyProjectCard } from '../../../components/MyProjectCard'
import { Sidebar } from '../../../commonPages/sidebar'
import { SearchPanel } from '../../../components/Search'
import { HiOutlineArrowLeft } from 'react-icons/hi'


const Box = styled.div`
 width:100%;
 background: #ffffff;
 padding: 2rem;
`
const Panel = styled.div`
 background: #E6F5FF;
 padding: 0.8rem;
 margin: 1rem 0rem;
`
const Icon = styled.div`
 background: #ffffff;
 padding: 0.5rem;
 border-radius: 30px;
`

export const MyProject = () => {
    const navigate = useNavigate();

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
                            <Stack direction='horizontal' gap={2} style={{justifyContent:'space-between'}}>
                                <Heading Heading={'My Project'} SubHeading={'Manage your billing and payment details'} />
                            </Stack>
                            <Panel>
                                <Stack direction='horizontal' gap={2} style={{
                                    justifyContent: 'space-between'
                                }}>
                                    <SearchPanel className={'w-50 bg-light'} />
                                    <Icon>
                                        <CiFilter fontSize={'1.5rem'} className='me-0' />
                                    </Icon>
                                </Stack>
                            </Panel>
                        </Box>
                        <Stack direction='horizontal' gap={2} style={{
                            justifyContent:'right'
                        }}>
                            <SharedButton label={'Back'} size={'sm'} variant={'primary'}  className={'mx-2'}startIcon={<HiOutlineArrowLeft />} onClick={() => navigate('/dashboard')} />
                        </Stack>
                        <Box>
                            <div style={{ width: '100%' }}>
                                <Row>
                                    <Col className='mb-2' md={3}>
                                        <MyProjectCard BgColor={"#FEEEE7"} />
                                    </Col>
                                    <Col className='' md={3}>
                                        <MyProjectCard BgColor={'#E7F0FE'} />
                                    </Col>
                                    <Col className='' md={3}>
                                        <MyProjectCard BgColor={'#FEE7F5'} />
                                    </Col>
                                    <Col className='' md={3}>
                                        <MyProjectCard BgColor={'#ECFEE7'} />
                                    </Col>
                                    <Col className='' md={3}>
                                        <MyProjectCard BgColor={'#ECFEE7'} />
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Box>
                    </Stack>
                </Col>
            </Row>
            </Container>
        </>
    )
}
