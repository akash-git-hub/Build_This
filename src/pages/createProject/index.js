import React, { useContext, useState } from 'react'
import { Sidebar } from '../../commonPages/sidebar'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import { Heading } from '../../components/Heading'
import { SharedButton } from '../../components/Button'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { InputField } from '../../components/InputField'
import { Select } from '../../components/Select'
import { option } from '../../components/Helper'
import { MultiSelect } from '../../components/MultiSelect'
import { createProject_API } from '../../APIServices/service'
import { WaitingLoader } from '../../commonPages/WaitingLoader'
import { errorAlert, successAlert } from '../../components/Alert'
import { UploadImage } from '../../components/UploadImage'
import { MyContext } from '../../App'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`

export const CreateProject = () => {
    const { info } = useContext(MyContext);
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

    const navigate = useNavigate();


    const createHandler = async () => {
        let isValid = true;
        const { id } = info;
        if (!id) { errorAlert("something  id wrong"); return; }
        const { project_name, start_date, end_date, category, skills, tag_by, description, logo } = data;
        if (!project_name) { setFeedback((pre) => ({ ...pre, "project_name": "Required" })); isValid = false; }
        if (!start_date) { setFeedback((pre) => ({ ...pre, "start_date": "Required" })); isValid = false; }

        if (isValid) {
            const formData = new FormData();
            formData.append("userId", id);
            formData.append('project_name', project_name);
            formData.append('start_date', start_date);
            formData.append('end_date', end_date);
            formData.append('category', category);
            formData.append('skills_name', skills);
            formData.append('tag_by', tag_by);
            formData.append('description', description);
            formData.append('image', logo);

            setWaiting(true);
            const resp = await createProject_API(formData);
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
            <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col className='p-1' md={3}>
                        <Sidebar />
                    </Col>
                    <Col className='p-1' md={9}>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} className='d-flex justify-content-between'>
                                    <Heading Heading={'Create Project'} />
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right'
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} onClick={() => window.history.back()} />
                            </Stack>
                            <Box>
                                <Stack direction="vertical" className='mb-4'>
                                    <UploadImage
                                        label={"Upload Logo"}
                                        name="logo"
                                        controlId="formProfilePic"
                                        onChange={imageHandler}
                                    />
                                </Stack>
                                <Row>
                                    <Col md={12} className='mb-4'>
                                        <UploadImage />
                                    </Col>
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
                                        <InputField name={"skills"} value={data.skills} onChange={onChangeHandler}
                                            isInvalid={feedback.skills} feedback={feedback.skills}
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
                                        <SharedButton type={'button'} className={'w-100'} label={'Create Project'} size={'md'} variant={'primary'} onClick={createHandler} />
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
