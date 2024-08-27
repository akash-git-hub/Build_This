import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { CiCirclePlus, CiFilter } from 'react-icons/ci'
import { SearchPanel } from '../../components/Search'
import { MyProjectCard } from '../../components/MyProjectCard'
import { PublishProjectCard } from '../../components/PublishProjectCard'
import { useNavigate } from 'react-router-dom'

const Box = styled.div`
  width: 100%;
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

export const Dashboard = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/create_project');
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={3} className='p-1'>
                        <Sidebar />
                    </Col>
                    <Col md={9} className='p-1'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} justifyContent='space-between'>
                                    <Heading Heading={'Dashboard'} SubHeading={'Manage your billing and payment details'} />
                                    <SharedButton
                                        label={'Create Project'}
                                        size={'sm'}
                                        variant={'primary'}
                                        startIcon={<CiCirclePlus />}
                                        onClick={handleClick}
                                    />
                                </Stack>
                                <Panel>
                                    <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                        <SearchPanel />
                                        <Icon>
                                            <CiFilter fontSize={'1.5rem'} className='me-0' />
                                        </Icon>
                                    </Stack>
                                </Panel>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>My Project</h6>
                                    <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_project')} />
                                </Stack>

                                <div>
                                    <Row>
                                        <Col className='' md={3}>
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
                                    </Row>
                                </div>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>Publish Project</h6>
                                    <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/publish_project')} />
                                </Stack>

                                <div>
                                    <Row>
                                        <Col className='mb-3' md={4}>
                                            <PublishProjectCard />
                                        </Col>
                                        <Col className='mb-3' md={4}>
                                            <PublishProjectCard />
                                        </Col>
                                        <Col className='mb-3' md={4}>
                                            <PublishProjectCard />
                                        </Col>
                                        <Col className='mb-3' md={4}>
                                            <PublishProjectCard />
                                        </Col>
                                        <Col className='mb-3' md={4}>
                                            <PublishProjectCard />
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
