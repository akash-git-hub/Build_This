 
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { ChatBoard } from './ChatBoard'


export const Chat = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>

                    <Col md={8} lg={9} className='p-0'>
                        <ChatBoard />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
