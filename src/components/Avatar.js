import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import styled from 'styled-components'
// import AvatarImg from '.'

const Texth6 = styled.h6`
margin:0px;
`
const Textp = styled.p`
margin:0px; 
`

export const Avatar = ({ UserName, UserEmail }) => {
    return (
        <>
             
                <Stack direction='horizontal' gap={3}>
                    <Image src='/assets/images/Avatar.svg' className='img-fluid'/>
                    <Stack direction='vertical' gap={0}> 
                        <Texth6>{UserName}</Texth6>
                        <Textp>{UserEmail}</Textp>
                    </Stack>
                </Stack>
            
        </>
    )
}
