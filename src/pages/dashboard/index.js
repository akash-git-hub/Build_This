import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { CiCirclePlus, CiFilter, CiSearch } from 'react-icons/ci'
import { SearchPanel } from '../../components/Search'
import { MyProjectCard } from '../../components/MyProjectCard'
import { PublishProjectCard } from '../../components/PublishProjectCard'
import { useNavigate } from 'react-router-dom'
import { get_team_projectsAPI, getAllProjectsAPI, getMyProjects_API } from '../../APIServices/service'
import { MyContext } from '../../App'
import { InputField } from '../../components/InputField'

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
    const { getMySkills, userData, getMyCertificate, getAcademic } = useContext(MyContext);
    const [tmProjects, setTmProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    const preData = async () => {
        const resp = await getMyProjects_API();
        const pr = resp?.data || [];
        setMy_projects(pr);
    }

    const getTeamProjects = async () => {
        const res = await getAllProjectsAPI();
        if (res && res.success) {
            const data = res.data;
            setAllProjects(data);
            setTmProjects(data);
        }
    }

    useEffect(() => { preData(); getTeamProjects(); }, [])

    useEffect(() => {
        if (localStorage.getItem('Authorization') && localStorage.getItem('Authorization') !== "") {
            userData();
            getMySkills();
            getMyCertificate();
            getAcademic();
        }
    }, [localStorage.getItem('Authorization')])

    const searchHandler = (e) => {
        const { value } = e.target;
        if (value) {
            const filteredProjects = allProjects.filter((project) =>
                project.project_name.toLowerCase().includes(value.toLowerCase())  // Case-insensitive match
            );
            setTmProjects(filteredProjects);
        } else {
            setTmProjects(allProjects);
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col md={12} lg={9} className='p-0'>
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
                                        <InputField startIcon={<CiSearch />} placeholder={'Search projects ...'} id={'search'} onChange={searchHandler} className={'w-50 bg-light'} />
                                        {/* <SearchPanel id='search' className={'w-50 bg-light'} /> */}
                                        <Icon>
                                            <CiFilter fontSize={'1.5rem'} className='me-0' />
                                        </Icon>
                                    </Stack>
                                </Panel>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6 className='mb-4'>All Project</h6>
                                    {/* {tmProjects.length > 0 &&
                                        <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_all_project', { state: { data: tmProjects } })} />
                                        // <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_project')} />
                                    } */}
                                </Stack>

                                <div>
                                    <Row >
                                        {tmProjects.length > 0 ?
                                            tmProjects.map((project, index) => (
                                                <Col className='mb-3' md={3} key={index} >
                                                    <PublishProjectCard data={project} type={'active'} />
                                                </Col>
                                            ))
                                            :
                                            <Col className='mt-3 mb-3 text-center'>
                                                <h5>No project data available.</h5>
                                            </Col>
                                        }

                                    </Row>
                                </div>
                            </Box>
                            <Box>
                                <Stack direction='horizontal' className='mb-3' gap={2} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h6>My Project</h6>
                                    {/* {my_projects.length > 0 &&
                                        <SharedButton label={'See all'} size={'sm'} variant={'outlined'} onClick={() => navigate('/my_all_project', { state: { data: my_projects } })} />
                                    } */}
                                </Stack>
                                <Row>
                                    {my_projects.length > 0 ?
                                        my_projects.map((e, i) => (
                                            <Col className='mb-3' md={3} key={i}>
                                                <PublishProjectCard data={e} type={'my_project'} />
                                            </Col>
                                        ))
                                        :
                                        <Col className='mt-3 mb-3 text-center'>
                                            <h5>No project data available.</h5>
                                        </Col>
                                    }
                                </Row>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
