import { Col, Row, Stack } from "react-bootstrap"
import { InputField } from "../../../components/InputField"

export const MySkills = () => {
    return <>
        <Stack direction='vertical' gap={2}>
            <Row>
                <Col md={6} lg={4}><h5>Skills</h5><InputField plaintext={'plaintext'} id={'skills'} value={'UI/UX Designer, FrontEnd ,Gra'} readOnly={'readOnly'} /> </Col>
                <Col md={6} lg={3}><h5>Certifications</h5><InputField plaintext={'plaintext'} id={'certifications'} value={'Product Designer'} readOnly={'readOnly'} /></Col>
                <Col md={6} lg={3}><h5>Languages</h5><InputField plaintext={'plaintext'} id={'languages'} value={'Hindi,English'} readOnly={'readOnly'} /></Col>
            </Row>
        </Stack>
    </>
}