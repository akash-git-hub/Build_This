import { Col, Row } from "react-bootstrap"
import { Select } from "../../../components/Select"

export const EditMySkills = () => {
    return <>
        <Row>

            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Skills"} SelectOption={"Skills"} feedback={'pls select skills'} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Certifications"} SelectOption={"Certifications"} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Languages"} SelectOption={"Languages"} required />
            </Col>
        </Row>
    </>
}






