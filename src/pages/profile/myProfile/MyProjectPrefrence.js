import { Col, Row, Stack } from "react-bootstrap"
import { InputField } from "../../../components/InputField"

export const MyProjectPrefrence = () => {
    return <>
        <Stack direction='vertical' gap={2}>
            <Row>
                <Col md={6} lg={4}><h5>Project Type</h5><InputField plaintext={'plaintext'} id={'project_type'} value={' Web design, Development, Server'} readOnly={'readOnly'} /></Col>
                <Col md={6} lg={3}><h5>Availability</h5><InputField plaintext={'plaintext'} id={'availability'} value={'0-8 Hour'} readOnly={'readOnly'} /></Col>
                <Col md={6} lg={3}><h5>Project Experience</h5><InputField plaintext={'plaintext'} id={'project_exp'} value={'+4 Years'} readOnly={'readOnly'} /></Col>
            </Row>
        </Stack>
    </>
}