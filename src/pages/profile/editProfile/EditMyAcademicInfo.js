import { Col, Row } from "react-bootstrap"
import { Select } from "../../../components/Select"
 

export const EditMyAcademicInfo = () => {
    return <>
        <Row>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"College/University Name"} SelectOption={"University"} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Degree"} SelectOption={"Degree"} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Passing Year"} SelectOption={"Passing year"} required />
            </Col>
        </Row>
    </>
}



