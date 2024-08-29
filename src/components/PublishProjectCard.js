import React from 'react'
import { Badge, Image, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import { ProjectMemberAvatar } from './ProjectMemberAvatar'

export const PublishProjectCard = () => {

    const Box = styled.div`
    padding:1rem;
    background:#fff;
    border-radius:1rem;
    border: 1px solid #666666;
`
    return (
        <Box>
            <Stack direction='vertical' gap={2}>
                <Stack direction='horizontal' gap={0}>
                    <Stack direction='vertical' gap={0}>
                    <h6 className='text-ellipsis'>UI/UX Medical Dashboard</h6>
                    <small>6 Task</small>
                    </Stack>
                    <Image src='/assets/images/Avatar.svg' className='img-fluid' />
                </Stack>
                <Stack direction='horizontal' gap={0} style={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <small>Status</small>
                    <small>Timeline</small>
                </Stack>
                <Stack direction='horizontal' gap={0} style={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Badge bg='success'>Status</Badge>
                    <Badge bg='warning'>In Month</Badge>
                </Stack>

                <Stack direction='horizontal' gap={1} style={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <ProjectMemberAvatar countMember={'12 member'} InThisProject={'In This Project'}/>
                </Stack>
            </Stack>
        </Box>
    )
}
