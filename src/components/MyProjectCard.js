import React from 'react'
import { ProgressBar, Stack } from 'react-bootstrap'
import { ProjectMemberAvatar } from './ProjectMemberAvatar'
import styled from 'styled-components'

const Box = styled.div`
 padding:1.5rem;
 background:#FEEEE7;
 border-radius:1rem;
 width: 300px;
`

export const MyProjectCard = () => {
    return (
        <>
            <Box>
                <Stack direction='vertical' gap={2}>
                    <h6>UI/UX Medical Dashboard</h6>
                    <small>6 Task</small>

                    <Stack direction='horizontal' gap={5} style={{
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <ProjectMemberAvatar />
                        <small className='mb-0'>10%</small>
                    </Stack>
                    <ProgressBar now={10} striped variant="dark"/>
                </Stack>
            </Box>
        </>
    )
}
