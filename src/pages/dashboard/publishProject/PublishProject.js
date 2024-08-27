import React from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import { Heading } from '../../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../../components/Button'
import { CiFilter } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../commonPages/sidebar'
import { SearchPanel } from '../../../components/Search'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { PublishProjectCard } from '../../../components/PublishProjectCard'


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

export const PublishProject = () => {
    const navigate = useNavigate();

    return (
        <>
            <Row>
                <Col md={3} className='p-1'>
                    <Sidebar />
                </Col>
                <Col md={9} className='p-1'>
                    <Stack direction='vertical' gap={3}>
                        <Box>
                            <Stack direction='horizontal' gap={2} justifyContent='space-between'>
                                <Heading Heading={'Publish Project'} SubHeading={'Manage your billing and payment details'} />
                            </Stack>
                            <Panel>
                                <Stack direction='horizontal' gap={2} style={{
                                    justifyContent: 'space-between'
                                }}>
                                    <SearchPanel />
                                    <Icon>
                                        <CiFilter fontSize={'1.5rem'} className='me-0' />
                                    </Icon>
                                </Stack>
                            </Panel>
                        </Box>
                        <Stack direction='horizontal' gap={2} style={{
                            justifyContent:'right'
                        }}>
                            <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} onClick={() => navigate('/dashboard')} />
                        </Stack>
                        <Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <h6>Publish Project</h6>
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
                                </Row>
                            </div>
                        </Box>
                    </Stack>
                </Col>
            </Row>
        </>
    )
}
