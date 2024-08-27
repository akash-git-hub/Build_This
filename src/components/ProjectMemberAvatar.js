import React from 'react';
import { Image, Stack } from 'react-bootstrap';



export const ProjectMemberAvatar = () => {
    return (
        <>
            <Stack direction='horizontal' gap={1} style={{ alignItems: 'center' }}>
                <div className="avatar-stack">
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                </div>
                <p className='mb-0 fs-7'>15 members</p>
            </Stack>
        </>
    );
}
