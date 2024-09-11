import { Col, Row } from "react-bootstrap"
import { InputField } from "../../../components/InputField"

export const PersonalInfo = () => {
    return <>
        <Row>
            <Col md={4} lg={2}><h5>User Name</h5><InputField plaintext={'plaintext'} value={'@jaylee007'} id={'user_name'} className='mb-3' readOnly={'readOnly'} /></Col>
            <Col md={4} lg={2}><h5>Role Name</h5><InputField plaintext={'plaintext'} value={'Product Designer'} id={'role_name'} className='mb-3' readOnly={'readOnly'} /></Col>
            <Col md={4} lg={2}><h5>Date Of Birth</h5><InputField plaintext={'plaintext'} value={'14-12-1991'} id={'dob'} className='mb-3' readOnly={'readOnly'} /></Col>
            <Col md={4} lg={2}><h5>Phone No</h5><InputField plaintext={'plaintext'} value={'+41 8989891712'} id={'phone'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /></Col>
            <Col md={4} lg={4}><h5>Address</h5><InputField plaintext={'plaintext'} value={'28 abu bakir street, After Ayadina Grilled Foods...'} id={'address'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /></Col>
            <Col md={4} lg={2}><h5>City</h5><InputField plaintext={'plaintext'} value={'Indore'} id={'city'} className='mb-3' readOnly={'readOnly'} /></Col>
            <Col md={4} lg={2}><h5>Postal Code</h5><InputField plaintext={'plaintext'} value={'452012'} id={'postal_code'} className='mb-3' readOnly={'readOnly'} autoComplete={'autoComplete'} /> </Col>
            <Col md={12} lg={12}><h4 className='mt-3'>Bio/Description</h4><InputField plaintext={'plaintext'} id={'bio'} value={'Adipisicing consectetur consequat labore pariatur labore minim veniam. Cillum sint irure ipsum elit. Eiusmod sunt qui eu veniam cillum cillum adipisicing deserunt enim do laborum non. Non quis laborum amet non. Nostrud ex magna irure Lorem et nisi occaecat labore sit excepteur amet culpa consequat magna. Quis officia dolore non consectetur magna aliqua amet exercitation sit. Mollit cillum est ad duis quis aute ipsum aute sint adipisicing ea adipisicing adipisicing.'} className='mb-3' readOnly={'readOnly'} /></Col>
        </Row>

    </>
}