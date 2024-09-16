import React from 'react'
import { Badge, Stack } from 'react-bootstrap'
import { ProjectMemberAvatar } from './ProjectMemberAvatar'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const MyProjectCard = ({ BgColor, data }) => {
    const Box = styled.div`
    padding: 1.5rem;
    background: ${BgColor}; /* Use props to set the background */
    border-radius: 1rem;
`;

    return (

        <Box>
            <Link to={'/my_project_detail'} style={{
                textDecoration: 'none',
                color: '#000'
            }}>
                <Stack direction='vertical' gap={2}>
                    <h6 className='text-ellipsis'>{data && data.project_name}</h6>
                    <Stack direction='horizontal' gap={1} style={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <ProjectMemberAvatar countMember={'12 member'} />
                    </Stack>
                    <Badge bg='info'>In Progress</Badge>
                </Stack>
            </Link>
        </Box>
    )
}
