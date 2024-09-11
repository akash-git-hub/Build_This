import React, { useState } from 'react'
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

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`


export const CreateProject = () => {
    const [data,setData] = useState({"name":""});
    const [skillsdata,setSkillsdata] = useState();
    const [skillsOption, setSkillsOption] = useState([]);
    
    const onChangeHandler = (e)=>{
        const {name,value} = e.target;

    }



const createHandler = ()=>{

}

    return (
        <>
            <Container fluid>
                <Row>
                    <Col className='p-1' md={3}>
                        <Sidebar />
                    </Col>
                    <Col className='p-1' md={9}>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='horizontal' gap={2} className='d-flex justify-content-between'>
                                    <Heading Heading={'Create Project'}  />
                                </Stack>
                            </Box>
                            <Stack direction='horizontal' gap={2} style={{
                                justifyContent: 'right' 
                            }}>
                                <SharedButton label={'Back'} size={'sm'} variant={'primary'} startIcon={<HiOutlineArrowLeft />} onClick={()=>window.history.back()} />
                            </Stack>
                            <Box>
                                <Row>
                                    <Col md={4}>
                                        <InputField name={"name"} value={data.name} onChange={onChangeHandler} className={'mb-3'} type={'text'} label={'Project Name'} placeholder={'Project Name'} />
                                    </Col>
                                    <Col md={4}>
                                        <Select name={"name"} value={data.name} onChange={onChangeHandler} option={option} SelectLabel={'Category'} SelectOption={'Category'} />
                                    </Col>
                                    <Col md={4}>
                                    <MultiSelect SelectLabel={"Skills"} setSkillsdata={setSkillsdata} options={skillsOption} />
                                    
                                    </Col>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'date'} label={'Start Date'} placeholder={'Date'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField className={'mb-3'} type={'date'} label={'End Date'} placeholder={'Date'} />
                                    </Col>
                                    <Col md={4}>
                                        <InputField name={"name"} value={data.name} onChange={onChangeHandler} className={'mb-3'} type={'text'} label={'Tags'} placeholder={'Project Name'} />
                                    </Col>
                                    <Col md={12}>
                                        <InputField className={'mb-3'} type={'textarea'} as={"textarea"} row={2} label={'Description'} placeholder={'Description'} />
                                    </Col>
                                    <Col md={4}>
                                        <SharedButton className={'w-100'} label={'Create Project'} size={'md'} variant={'primary'} onClick={createHandler} />
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
