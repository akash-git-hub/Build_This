import { Col, Row } from "react-bootstrap"
import { Select } from "../../../components/Select"
 

export const EditMyProjectPrefrence = () => {
    return <>
        <Row>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Project Type"} SelectOption={"Project Type"} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Avalilabilty"} SelectOption={"Availabilty"} required />
            </Col>
            <Col md={6} lg={4} className='mb-3'>
                <Select SelectLabel={"Project Experience"} SelectOption={"Project Experience"} required />
            </Col>
        </Row>
    </>
}








