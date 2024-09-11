import React from 'react'
import { Col, Container, Row, Stack , Table } from 'react-bootstrap'
import { Sidebar } from '../../commonPages/sidebar'
import { Heading } from '../../components/Heading'
import styled from 'styled-components' 
import { SearchPanel } from '../../components/Search' 
import { UserList } from '../../components/UserList'
 

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`
const Panel = styled.div`
  background: #E6F5FF;
  padding: 0.8rem;
  margin: 1rem 0rem;
`
const Icon = styled.div`
  background: #ffffff;
  padding: 0.5rem;
  border-radius: 30px;
`

export const InviteUser = () => {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} lg={3} className='p-0'>
                        <Sidebar />
                    </Col>
                    
                    <Col md={8} lg={9} className='p-0'>
                        <Stack direction='vertical' gap={3}>
                            <Box>
                                <Stack direction='vertical' gap={2} >
                                    <Heading Heading={'Invite User'} SubHeading={'invite user as your team members'} />
                                    <Panel><SearchPanel className={'w-50 bg-light bg'}/></Panel>
                                </Stack>
                            </Box>
                               
                            <Box>
                               <UserList/>
                            </Box>
                            
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
