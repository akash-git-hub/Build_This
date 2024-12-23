import React, { useContext, useEffect, useState } from 'react'
import { Badge, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import styled from 'styled-components'
import { SharedButton } from '../../components/Button'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { InputField } from '../../components/InputField'
import EditMyProfileHeading from './EditMyProfileHeading'
import { MdDeleteForever } from 'react-icons/md'
import { deleteCertificate_API, updateMyCertificate_API } from '../../APIServices/service'
import { errorAlert, successAlert } from '../../components/Alert'
import { MyContext } from '../../App'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const EditCertificate = () => {
    const [prSkills, setPrSkills] = useState([]);
    const { myCertificate, getMyCertificate } = useContext(MyContext);

    useEffect(() => {
        setPrSkills(myCertificate);
    }, [myCertificate])

    const navigate = useNavigate();
    const handleClickBack = () => {
        navigate('/my_profile');
    };

    const updateHandler = async (data) => {
        const check = prSkills.filter((e) => e.certificate_name === "");
        if (check.length > 0) { errorAlert("All certificates name are required"); return; }
        const resp = await updateMyCertificate_API({ "data": data });
        if (resp && resp.success) {
            successAlert(resp.message);
            getMyCertificate();
        }
    };
    const onChangeHandler = (e, i) => {
        const { value } = e.target;
        const pr = [...prSkills];
        pr[i].certificate_name = value;
        setPrSkills(pr);
    }

    const deleteHandler = async (id) => {
        const resp = await deleteCertificate_API({ "id": id });
        if (resp && resp.success) {
            successAlert(resp.message);
            getMyCertificate();
        }
    }
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
                                <h5 className='text-secondary'>Certifications</h5>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} className={'mx-2'} startIcon={<HiOutlineArrowLeft />} onClick={handleClickBack} />
                            </Stack>
                            <Box>
                                <Form className='mt-3'>
                                    <Stack direction='vertical' gap={3}>
                                        {prSkills && prSkills.length === 0 &&
                                        <Row>
                                            <Col md={12} className='text-center'>
                                            <p>No Data Available</p>
                                            </Col>
                                        </Row>                                            
                                        }
                                        {prSkills && prSkills.length > 0 &&
                                            <>
                                                <Row>
                                                    {prSkills && prSkills.map((e, i) => (
                                                        <Col md={4} className='mb-3 d-flex' key={i}>
                                                            <InputField type={'text'} required name={`name${i}`} value={e.certificate_name} onChange={(pre) => onChangeHandler(pre, i)} label="Skills Name" />
                                                            <Badge className='ms-2' style={{ marginTop: '32px' }} bg='danger' onClick={() => deleteHandler(e.id)}>
                                                                <MdDeleteForever fontSize={'20px'} style={{ height: "29px" }} />
                                                            </Badge>
                                                        </Col>
                                                    ))}

                                                </Row>
                                                <Row>
                                                    <Col md={6} lg={4} className="d-grid"><SharedButton variant='primary' type='button' onClick={() => updateHandler(prSkills)} label='Update' size='sm' className='btn-block' /></Col>
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
