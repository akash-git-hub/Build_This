import React from 'react';
import { Image, Stack } from 'react-bootstrap';



export const ProjectMemberAvatar = () => {
    return (
        <>
            <Stack direction='horizontal' gap={0} style={{ alignItems: 'center' }}>
                <div className="avatar-stack">
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                    <Image src='/assets/images/Avatar.svg' className='img-fluid avatar-img' />
                </div>
                <p className='mb-0 ms-2'>15 members</p>
            </Stack>
        </>
    );
}
