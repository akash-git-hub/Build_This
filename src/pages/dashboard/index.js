import React from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { CiCirclePlus, CiFilter } from 'react-icons/ci'
import { SearchPanel } from '../../components/Search'
import { MyProjectCard } from '../../components/MyProjectCard'

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

export const Dashboard = () => {
    return (
        <>

            <Stack direction='horizontal' gap={3} style={{
                justifyContent: 'center',
                alignItems: 'start'
            }}>
                <Sidebar />
                <Stack direction='vertical' gap={3}>
                    <Box>
                        <Stack direction='horizontal' gap={2} justifyContent='space-between'>
                            <Heading Heading={'Dashboard'} SubHeading={'Manage your billing and payment details'} />
                            <SharedButton label={'Create Project'} size={'sm'} variant={'primary'} startIcon={<CiCirclePlus />} />
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
                    <Box>
                        <Stack direction='horizontal' gap={2} style={{
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h6>My Project</h6>
                            <SharedButton label={'See all'} size={'sm'} variant={'outlined'} />
                        </Stack>

                        <div style={{ width: '100%', overflowX: 'auto' }}>
                            <Stack direction='horizontal' gap={3} style={{ flexWrap: 'nowrap' }}>
                                <MyProjectCard style={{ flex: '0 0 calc(50% - 24px)' }} />
                                <MyProjectCard style={{ flex: '0 0 calc(50% - 24px)' }} />
                                <MyProjectCard style={{ flex: '0 0 calc(50% - 24px)' }} />
                                {/* <MyProjectCard style={{ flex: '0 0 calc(50% - 24px)' }} /> */}
                            </Stack>
                        </div>
                    </Box>
                </Stack>
            </Stack>
            <Row>
                <Col md={3}>
                </Col>
                <Col md={9}>
                </Col>
            </Row>
        </>
    )
}
