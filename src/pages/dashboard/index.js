import React, { useEffect, useState } from 'react'
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
import { getMyProjects_API } from '../../APIServices/service'
import { SelectDropdown } from '../../components/Dropdown'

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
    const handleClick = () => { navigate('/create_project'); };
    const [my_projects, setMy_projects] = useState([]);
    const action = [{ name: 'action 1', href: '#/1' }, { name: 'action 2', href: '#/2' }, { name: 'action 3', href: '#/3' }]


    const preData = async () => {
        const resp = await getMyProjects_API();
        const pr =( resp && resp.data) || [];
        setMy_projects(pr);
    }
    useEffect(() => { preData(); }, [])

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col md={8} lg={9} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                    <Heading Heading={'Dashboard'}
                                    //  SubHeading={'Manage your billing and payment details'}
                                      />
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
                                        <SearchPanel id='search' className={'w-50 bg-light'}/>
                                        <SelectDropdown icon={<Icon><CiFilter fontSize={'1.5rem'} className='me-0' /></Icon>} items={action} drop={'start'}/>
                                        {/* <Icon>
                                            <CiFilter fontSize={'1.5rem'} className='me-0' />
                                        </Icon> */}
                                    </Stack>
                                </Panel>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>Active Project</h6>
                                    <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_project')} />
                                </Stack>

                                <div>
                                    <Row >
                                        <Col className='mb-3' md={3} >
                                            <MyProjectCard BgColor={"#FEEEE7"} />
                                        </Col>
                                    </Row>
                                </div>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' className='mb-3' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>My Project</h6>
                                    <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_all_project', { state: { data: my_projects } })} />
                                </Stack>
                                <Row>
                                    {my_projects.length > 0 && my_projects.map((e, i) => (
                                        i <= 3 ?
                                            <Col className='mb-3' md={3} key={i}>
                                                <PublishProjectCard data={e} />
                                            </Col>
                                            : ''
                                    ))}
                                </Row>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
