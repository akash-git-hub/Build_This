import { Col, Row, Stack } from "react-bootstrap"
import { InputField } from "../../../components/InputField"

export const MyAcademicInfo = () => {
    return <>
        <Stack direction='vertical' gap={2}>
            <Row>
                <Col md={6} lg={4}><h5>College/University Name</h5><InputField plaintext={'plaintext'} id={'university'} value={'university'} readOnly={'readOnly'} /></Col>
                <Col md={6} lg={3}><h5>Degree</h5><InputField plaintext={'plaintext'} id={'degree'} value={'Product Designer'} readOnly={'readOnly'} /></Col>
                <Col md={6} lg={3}><h5>Passing Year</h5><InputField plaintext={'plaintext'} id={'pass_year'} value={'14-12-2022'} readOnly={'readOnly'} /></Col>
            </Row>
        </Stack>
    </>

}