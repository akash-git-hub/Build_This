import React from 'react'
import { ProgressBar, Stack } from 'react-bootstrap'
import { ProjectMemberAvatar } from './ProjectMemberAvatar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Box = styled.div`
padding:1.5rem;
background:${prop=>prop.bgcolor};
border-radius:1rem;
`;

export const MyProjectCard = ({ BgColor }) => {


    return (
      
        <Box bgcolor={BgColor}>
            <Link to={'/my_project_detail'} style={{
                textDecoration: 'none',
                color: '#000'
            }}>
                <Stack direction='vertical' gap={2}>
                    <h6 className='text-ellipsis'>UI/UX Medical Dashboard</h6>
                    <small>6 Task</small>

                    <Stack direction='horizontal' gap={1} style={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <ProjectMemberAvatar countMember={'12 member'} />
                        <small className='mb-0'>10%</small>
                    </Stack>
                    <ProgressBar now={50} striped variant="dark" />
                </Stack>
            </Link>
        </Box>
    )
}
