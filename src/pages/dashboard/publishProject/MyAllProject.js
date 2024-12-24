import React, { useEffect, useState } from 'react'
import { Col, Row, Stack, Container } from 'react-bootstrap'
import { Heading } from '../../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../../components/Button'
import { CiFilter } from 'react-icons/ci'
import { useLocation, useNavigate } from 'react-router-dom'
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

export const MyAllProject = () => {
    const location = useLocation();
    const [pre, setPre] = useState([]);

    useEffect(() => {
        if (location && location.state && location.state.data) {
            const data = location.state.data;
            setPre(data);
        }
    }, [location])
    const navigate = useNavigate();

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} lg={3} className='p-1'>
                        <Sidebar />
                    </Col>
                    <Col md={12} lg={9} className='p-1'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                    <Heading Heading={'Publish Project'} 
                                    // SubHeading={'Manage your billing and payment details'}
                                     />
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
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={() => navigate('/dashboard')} />
                            </Stack>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <h6>My Projects</h6>
                                </Stack>
                                <Row className='mt-4'>
                                    {pre.length > 0 && pre.map((e, i) => (
                                        <Col className='mb-3' md={3} key={i}>
                                            <PublishProjectCard data={e} />
                                        </Col>
                                    ))
                                    }
                                    {pre.length === 0 &&
                                        <Col md={12} className='text-center'>No Data Available</Col>
                                    }
                                </Row>
                            </Box>
                        </Stack>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
