import React from 'react'
import { Sidebar } from '../../commonPages/sidebar'
import { Row, Col } from 'react-bootstrap'

export const CreateProject = () => {
    return (
        <>
            <Row>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={9}></Col>
            </Row>
        </>
    )
}
