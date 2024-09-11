import { Col, Row } from "react-bootstrap" 
import { InputField } from "../../../components/InputField"

export const EditPersonalInfo = () => {
    return <>
        <Row>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Full Name'} placeholder={'Full Name'} feedback={'Please enter your name.'} required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'User Name'} placeholder={'User Name'} feedback={'Please enter user name.'} required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Email'} placeholder={'Email'} type={'email'} feedback={'Please enter valid email.'} autoComplete required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Date Of Birth'} placeholder={'Date Of Birth'} type={'date'} feedback={'Please enter Date Of Birth.'} required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Phone No'} placeholder={'Phone No'} type={'number'} feedback={'Please enter Phone No.'} required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Address'} placeholder={'Address'} autoComplete required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'City'} placeholder={'City'} feedback={'Please enter City.'} required />
            </Col>

            <Col md={6} lg={4} className='mb-3'>
                <InputField label={'Postal Code'} placeholder={'Postal Code'} feedback={'Please enter valid Postal Code.'} required />
            </Col>

            <Col md={12} className='mb-3'>
                <InputField label={'Bio Description'} placeholder={'Bio description'} as={'textarea'} feedback={'Please enter bio description'} required />
            </Col>
        </Row>
    </>
}