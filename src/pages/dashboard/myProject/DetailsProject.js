import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../commonPages/sidebar'
import { Row, Col, Container, Stack, Image } from 'react-bootstrap'
import styled from 'styled-components'
import { Heading } from '../../../components/Heading'
import { SharedButton } from '../../../components/Button'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProjectDetailIcon } from '../../../components/ProjectDetailIcon'
import moment from 'moment-timezone'
import { CiEdit } from 'react-icons/ci'
import { UploadImage } from '../../../components/UploadImage'
import { InputField } from '../../../components/InputField'
import { Select } from '../../../components/Select'
import { option } from '../../../components/Helper'
import { IoMdClose } from 'react-icons/io'
import { errorAlert, successAlert } from '../../../components/Alert'
import { updateProject_API } from '../../../APIServices/service'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`

const Icon = styled.div`
background:#e6f5ff;
padding: 0.5rem;
color:blue;
border-radius: 30px;
`


export const DetailsProject = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [pre, setPre] = useState({
        "id": "", "project_name": "",
        "start_date": "", "end_date": "",
        "category": "", "skills_name": "",
        "tag_by": "", "description": "",
        "logo": "", "status": "",
    });

    const [isEdit, setIsEdit] = useState(false);

    const [data, setData] = useState({ "project_name": "", "start_date": "", "end_date": '', "category": "", "skills": "", "tag_by": "", "description": '', 'logo': '' });
    const [feedback, setFeedback] = useState({ "project_name": "", "start_date": "", "end_date": '', "category": "", "skills": "", "tag_by": "", "description": '' });
    const [waiting, setWaiting] = useState(false);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({ ...pre, [name]: value }));
        setFeedback((pre) => ({ ...pre, [name]: "" }));
    }

    const imageHandler = (e) => {
        const { name, value } = e;
        setData((pre) => ({ ...pre, [name]: value }));
    }


    useEffect(() => {
        if (location && location.state && location.state.data) {
            console.log(location.state.data);
            const { id, project_name, start_date, end_date, category, skills_name, tag_by, description, logo, status } = location.state.data;
            setPre({
                "id": id, "project_name": project_name,
                "start_date": start_date, "end_date": end_date,
                "category": category, "skills_name": skills_name,
                "tag_by": tag_by, "description": description,
                "logo": logo, "status": status,
            });
            setData({
                "id": id, "project_name": project_name,
                "start_date": start_date, "end_date": end_date,
                "category": category, "skills_name": skills_name,
                "tag_by": tag_by, "description": description,
                "logo": logo, "status": status,
            });
        } else { setPre([]); setData(); }
    }, [location])
    const handleClickBack = () => { navigate('/dashboard'); };

    const updateHandler = async () => {
        let isValid = true;

        const { project_name, start_date, end_date, category, skills, tag_by, description, logo, id } = data;
        if (!id) { errorAlert("something  id wrong"); return; }
        if (!project_name) { setFeedback((pre) => ({ ...pre, "project_name": "Required" })); isValid = false; }
        if (!start_date) { setFeedback((pre) => ({ ...pre, "start_date": "Required" })); isValid = false; }

        if (isValid) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append('project_name', project_name);
            formData.append('start_date', start_date);
            formData.append('end_date', end_date);
            formData.append('category', category);
            formData.append('skills_name', skills);
            formData.append('tag_by', tag_by);
            formData.append('description', description);
            if(logo){ formData.append('image', logo);  }
            
            setWaiting(true);
            const resp = await updateProject_API(formData);
            if (resp && resp.success) {
                successAlert(resp.message);
                setWaiting(false);
                navigate("/dashboard");
            }
            setWaiting(false);
        }
        setWaiting(false);

    }
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
                                <Stack direction='horizontal' gap={2} style={{ justifyContent: 'space-between' }}>
                                    <Heading Heading={'My Projects Details'}
                                    //  SubHeading={'Manage your billing and payment details'}
                                    />
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} className={'mx-2'} onClick={handleClickBack} />
                            </Stack>

                            {!isEdit ?
                                <Box>
                                    <Stack direction='vertical' gap={2}>
                                        <Stack className='mb-3' direction='horizontal' gap={5} style={{
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div className='d-flex'>
                                                <Image src={pre && pre.logo ? pre.logo : '/assets/images/Avatar.svg'} className='img-fluid' style={{ width: "60px", height: "60px" }} />
                                                <Stack direction='vertical' className='ms-3' gap={0}>
                                                    <h1 className='mb-2'>{pre && pre.project_name}</h1>
                                                </Stack>
                                            </div>
                                            <div>
                                                <Icon style={{ background: "#fff", cursor: "pointer", color: '#000' }} >
                                                    <CiEdit fontSize={'1.5rem'} className='me-0' onClick={() => setIsEdit(true)} />
                                                </Icon>
                                            </div>
                                        </Stack>
                                        <Stack direction='vertical' gap={3}>
                                            <Row>
                                                <Col md={2}>
                                                    <ProjectDetailIcon Icon={'/assets/images/Icons/Status.svg'} IconLabel={'Status'} />
                                                </Col>
                                                <Col md={10}>
                                                    <p className='mb-0' style={{ textTransform: "capitalize" }}>{pre && pre.status}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={2}>
                                                    <ProjectDetailIcon Icon={'/assets/images/Icons/Timeline.svg'} IconLabel={'Timeline'} />
                                                </Col>
                                                <Col md={10}>
                                                    <p className='mb-0'>{pre && pre.end_date && moment(pre.end_date).fromNow("DD-MM-YYYY")}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={2}>
                                                    <ProjectDetailIcon Icon={'/assets/images/Icons/Task.svg'} IconLabel={'Skills'} />
                                                </Col>
                                                <Col md={10}>
                                                    <p className='mb-0'>{pre && pre.skills_name}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={2}>
                                                    <ProjectDetailIcon Icon={'/assets/images/Icons/Tag.svg'} IconLabel={'Tags'} />
                                                </Col>
                                                <Col md={10}>
                                                    <p className='mb-0'>{pre && pre.tag_by}</p>
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
                                                    <p className='mb-0'>{pre && pre.description}</p>
                                                </Col>
                                            </Row>
                                        </Stack>
                                    </Stack>
                                </Box>
                                :
                                <Box>
                                    <Stack direction='horizontal' className='mb-4' style={{ justifyContent: "space-between" }}>
                                        <UploadImage
                                            label={"Upload Logo"}
                                            name="logo"
                                            controlId="formProfilePic"
                                            onChange={imageHandler}
                                        />
                                        <Icon style={{ background: "#fff", cursor: "pointer", color: '#000' }} >
                                            <IoMdClose fontSize={'1.5rem'} className='me-0' onClick={() => setIsEdit(false)} />
                                        </Icon>
                                    </Stack>
                                    <Row>
                                        <Col md={4}>
                                            <InputField name={"project_name"} value={data.project_name} onChange={onChangeHandler}
                                                isInvalid={feedback.project_name} feedback={feedback.project_name}
                                                className={'mb-3'} type={'text'} label={'Project Name'} placeholder={'enter your project name'} />
                                        </Col>
                                        <Col md={4}>
                                            <InputField name={"start_date"} value={data.start_date} onChange={onChangeHandler}
                                                isInvalid={feedback.start_date} feedback={feedback.start_date}
                                                className={'mb-3'} type={'date'} label={'Start Date'} placeholder={'Date'} />
                                        </Col>
                                        <Col md={4}>
                                            <InputField name={"end_date"} value={data.end_date} onChange={onChangeHandler}
                                                isInvalid={feedback.end_date} feedback={feedback.end_date}
                                                className={'mb-3'} type={'date'} label={'End Date'} placeholder={'Date'} />
                                        </Col>
                                        <Col md={4}>
                                            <Select name={"category"} value={data.category} onChange={onChangeHandler}
                                                isInvalid={feedback.category} feedback={feedback.category}
                                                option={option} SelectLabel={'Category'} SelectOption={'select'} />
                                        </Col>
                                        <Col md={4}>
                                            <InputField name={"skills"} value={data.skills_name} onChange={onChangeHandler}
                                                isInvalid={feedback.skills_name} feedback={feedback.skills_name}
                                                className={'mb-3'} type={'text'} label={'Skill'} placeholder={'react js , node js'} />
                                        </Col>
                                        <Col md={4}>
                                            <InputField name={"tag_by"} value={data.tag_by} onChange={onChangeHandler}
                                                isInvalid={feedback.tag_by} feedback={feedback.tag_by}
                                                className={'mb-3'} type={'text'} label={'Tags'} placeholder={'#react , #node'} />
                                        </Col>
                                        <Col md={12}>
                                            <InputField name={"description"} value={data.description} onChange={onChangeHandler}
                                                isInvalid={feedback.description} feedback={feedback.description}
                                                className={'mb-3'} type={'textarea'} as={"textarea"} row={2} label={'Description'} placeholder={'Description'} />
                                        </Col>


                                    </Row>
                                    <Row style={{ justifyContent: 'end' }}>
                                        <Col md={4}>
                                            <SharedButton type={'button'} className={'w-100'} label={'Update Project'} size={'md'} variant={'primary'} onClick={updateHandler} />
                                        </Col>
                                    </Row>
                                </Box>
                            }
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
