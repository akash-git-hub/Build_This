import React from 'react'
import { Badge, Image, Stack } from 'react-bootstrap'
import styled from 'styled-components'
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import { getDayDifference } from './Helper';

const Box = styled.div`
padding:1rem;
background:#fff;
border-radius:1rem;
border: 1px solid #666666;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow :auto;
scrollbar-width: none;
 -webkit-scrollbar {
  display: none;
}
`;
export const PublishProjectCard = ({ data, type = 'my_project' }) => {
    const navigate = useNavigate();
    return (
        <Box style={{ cursor: "pointer" }} onClick={() => navigate('/detailsProject', { state: { data: data, type: type } })}>
            <Stack direction='vertical' gap={2}>
                <Stack direction='horizontal' gap={0}>
                    <Stack direction='vertical' gap={0}>
                        <h6 className='text-ellipsis'>{data && data.project_name}</h6>

                    </Stack>
                    <Image src={data && data.logo ? data.logo : '/assets/images/Avatar.svg'} style={{ width: "30px", height: '30px' }} className='img-fluid' />
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
                    <Badge bg='success'>{data && data.status}</Badge>
                    <Badge bg='warning'>{data && data.end_date && data.start_date && getDayDifference(data.start_date,data.end_date)} days</Badge>
                    {/* <Badge bg='warning'>{data && data.end_date && moment(data.end_date).fromNow("DD-MM-YYYY")}</Badge> */}

                </Stack>
                <Stack direction='horizontal' gap={1} style={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {/* <ProjectMemberAvatar countMember={'12 member'} InThisProject={'In This Project'} /> */}
                </Stack>
            </Stack>
        </Box>
    )
}
