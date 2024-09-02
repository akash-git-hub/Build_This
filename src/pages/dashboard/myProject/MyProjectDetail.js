import React from 'react'
import { Sidebar } from '../../../commonPages/sidebar'
import { Row, Col, Container, Stack, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { Heading } from '../../../components/Heading'
import { SharedButton } from '../../../components/Button'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { ProjectDetailIcon } from '../../../components/ProjectDetailIcon'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const MyProjectDetail = () => {
    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/dashboard');
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col className='p-0' lg={3} md={4}>
                        <Sidebar />
                    </Col>
                    <Col className='p-0' lg={9} md={8}>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} justifyContent='space-between'>
                                    <Heading Heading={'My Projects Details'} SubHeading={'Manage your billing and payment details'} />
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} className={'mx-2'} onClick={handleClickBack} />
                            </Stack>
                            <Box>
                                <Stack direction='vertical' gap={2}>
                                    <Stack direction='horizontal' gap={5} style={{
                                        alignItems: 'center'
                                    }}>
                                        <Image src='/assets/images/Avatar.svg' className='img-fluid w-10' />
                                        <Stack direction='vertical' gap={0}>
                                            <h1 className='mb-2'>UI/UX Medical Dashboard</h1>
                                            <p className='mb-0'>User dashboard & Admin dashboard</p>
                                        </Stack>
                                    </Stack>
                                    <Stack direction='vertical' gap={3}>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Status.svg'} IconLabel={'Status'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>No Progress</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Timeline.svg'} IconLabel={'Timeline'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>5 March 2024</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Task.svg'} IconLabel={'Task'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>12 Tasks</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Tag.svg'} IconLabel={'Tags'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>Dashboard, Admin</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Team.svg'} IconLabel={'Team'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>No Progress</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2}>
                                                <ProjectDetailIcon Icon={'/assets/images/Icons/Description.svg'} IconLabel={'Description'} />
                                            </Col>
                                            <Col md={10}>
                                                <p className='mb-0'>Pellentesque suscipit fringilla libero eu ullamcorper. Cras risus eros, faucibus sit amet augue id, tempus pellentesque eros. In imperdiet tristique tincidunt. Integer lobortis lorem lorem, id accumsan arcu tempor id. Suspendisse vitae accumsan massa. Duis porttitor, mauris et faucibus sollicitudin, tellus sem tristique risus, nec gravida velit diam aliquet enim. Curabitur eleifend ligula quis convallis interdum. Sed vitae condimentum urna, nec suscipit purus.</p>
                                            </Col>
                                        </Row>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
