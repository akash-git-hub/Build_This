import React, { useContext, useEffect, useState } from 'react'
import { Badge, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { InputField } from '../../components/InputField'
import EditMyProfileHeading from './EditMyProfileHeading'
import { createAcademic_API, deleteAcademic_API, updateAcademic_API } from '../../APIServices/service'
import { errorAlert, successAlert } from '../../components/Alert'
import { MyContext } from '../../App'
import { MdDeleteForever } from 'react-icons/md'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const AcademicInformation = () => {
    const [inData, setInData] = useState({ "collegeName": "", "degree": "", "passingYear": "" });
    const [feedback, setFeedback] = useState({ "collegeName": "", "degree": "", "passingYear": "" });
    const { myAcademic, getAcademic } = useContext(MyContext);

    const [preInfo, setPreInfo] = useState([]);

    useEffect(() => {
        setPreInfo(myAcademic);
    }, [myAcademic])

    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/my_profile');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { collegeName, degree, passingYear } = inData;
        let isValid = true;
        if (!collegeName) { setFeedback((pre) => ({ ...pre, 'collegeName': 'Please enter your college name' })); isValid = false; }
        if (!degree) { setFeedback((pre) => ({ ...pre, 'degree': 'Please enter your degree name' })); isValid = false; }

        if (isValid) {
            const fData = { "collegeName": collegeName, "degree": degree, "passingYear": passingYear };
            const resp = await createAcademic_API(fData);
            if (resp && resp.success) {
                successAlert(resp.message);
                getAcademic();
                setInData({ "collegeName": "", "degree": "", "passingYear": "" });
            }
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInData((pre) => ({ ...pre, [name]: value }));
        setFeedback((pre) => ({ ...pre, [name]: "" }));
    }

    const deleteHandler = async (id) => {
        const resp = await deleteAcademic_API({ "id": id });
        if (resp && resp.success) {
            successAlert(resp.message);
            getAcademic();
        }
    }

    const onEditHandler = (e, i) => {
        const { value, name } = e.target;
        const pr = [...preInfo];
        pr[i][name] = value;
        setPreInfo(pr);
    }

    const updateHandler = async (data) => {
        const checkCLG = preInfo.filter((e) => e.college_name === "");
        const checkDegree = preInfo.filter((e) => e.degree === "");
        if (checkCLG.length > 0) { errorAlert("All college name are required"); return; }
        if (checkDegree.length > 0) { errorAlert("All degree name are required"); return; }
        const resp = await updateAcademic_API({ "data": data });
        if (resp && resp.success) {
            successAlert(resp.message);
            getAcademic();
        }
    };


    return (
        <>
            <Container fluid>
                <Row>
                    <Col lg={3} md={4} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col lg={9} md={8} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                            <EditMyProfileHeading inHeading={'My Profile'} inSubHeading={'Edit My Profile'} />

                            <Stack direction='horizontal' gap={4} className='ps-4 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 className='text-secondary'>Add New Academic Information </h5>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>
                            <Box>
                                <Form className='mt-3'>
                                    <Stack direction='vertical' gap={3}>
                                        <Row>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='collegeName' value={inData.collegeName} onChange={onChangeHandler} label={'University / College Name'} placeholder={'enter college name'} isInvalid={feedback.collegeName} feedback={feedback.collegeName} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField required name='degree' value={inData.degree} onChange={onChangeHandler} label={'Degree'} placeholder={'Degree'} isInvalid={feedback.degree} feedback={feedback.degree} />
                                            </Col>
                                            <Col md={6} lg={4} className='mb-3'>
                                                <InputField type={'date'} required name='passingYear' value={inData.passingYear} onChange={onChangeHandler} label={'Passing Year'} isInvalid={feedback.passingYear} feedback={feedback.passingYear} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6} lg={4} className="d-grid"><SharedButton variant='primary' type='button' label='Add' onClick={handleSubmit} size='sm' className='btn-block' /></Col>
                                        </Row>
                                    </Stack>
                                </Form>
                            </Box>
                            <Stack direction='horizontal' gap={4} className='ps-4 pe-2' style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                <h5 className='text-secondary'>Edit Academic Information </h5>
                            </Stack>
                            <Box>
                                <Form className='mt-3'>
                                    <Stack direction='vertical' gap={3}>
                                        {preInfo && preInfo.length === 0 &&
                                            <Row>
                                                <Col md={12} className='text-center'>
                                                    <p>No Data Available</p>
                                                </Col>
                                            </Row>
                                        }
                                        {preInfo && preInfo.length > 0 &&
                                            <>
                                                <Row>
                                                    {preInfo.map((e, i) => (
                                                        <>
                                                            <Col md={11} lg={11} className='mb-3' key={i}>
                                                                <Row>
                                                                    <Col md={6} lg={4} className='mb-3'>
                                                                        <InputField required name={`college_name`} value={e.college_name} onChange={(pre) => onEditHandler(pre, i)} label={'University / College Name'} placeholder={'enter college name'} />
                                                                    </Col>
                                                                    <Col md={6} lg={4} className='mb-3'>
                                                                        <InputField required name={`degree`} value={e.degree} onChange={(pre) => onEditHandler(pre, i)} label={'Degree'} placeholder={'Degree'} />
                                                                    </Col>
                                                                    <Col md={6} lg={4} className='mb-3'>
                                                                        <InputField type={'date'} required name='passing_year' value={e.passing_year} onChange={(pre) => onEditHandler(pre, i)} label={'Passing Year'} />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                            <Col md={1} lg={1} className='mb-3'>
                                                                <Badge className='ms-2' style={{ marginTop: '32px', cursor: "pointer" }} bg='danger' onClick={() => deleteHandler(e.id)}>
                                                                    <MdDeleteForever fontSize={'20px'} style={{ height: "29px" }} />
                                                                </Badge>
                                                            </Col>
                                                        </>
                                                    ))}

                                                </Row>
                                                <Row>
                                                    <Col md={6} lg={4} className="d-grid"><SharedButton variant='primary' type='button' label='Update' onClick={() => updateHandler(preInfo)} size='sm' className='btn-block' /></Col>
                                                </Row>
                                            </>
                                        }
                                    </Stack>

                                </Form>
                            </Box>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
