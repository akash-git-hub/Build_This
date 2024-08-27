import React from 'react'
import { Container, Image, Stack } from 'react-bootstrap'
import styled from 'styled-components'

const Textp = styled.p`
margin:0px;
`

export const ProjectDetailIcon = ({ Icon, IconLabel }) => {
    return (
        <>
                <Stack direction='horizontal' gap={3}>
                    <Image src={Icon} className='img-fluid' />
                    <Textp>{IconLabel}</Textp>
                </Stack>
        </>
    )
}
