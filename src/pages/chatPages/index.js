
import { Col, Container, Row } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { ChatBoard } from './chatBoard/ChatBoard'
import { useState } from 'react'
import { WaitingLoader } from '../../commonPages/WaitingLoader'


export const Chat = () => {
    const [waiting, setWaiting] = useState(false);
    return (
        <>
            <WaitingLoader show={waiting} />
            <Container fluid>
                <Row>
                    <Col md={12} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>
                    <Col md={12} lg={9} className='p-0'>
                        <ChatBoard setWaiting={setWaiting}  />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
