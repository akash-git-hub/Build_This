import React from 'react'
import { Stack } from 'react-bootstrap'
export const Heading = ({ Heading, SubHeading }) => {
    return (
        <>
                <Stack direction='vertical' gap={0}>
                    <h4 className='heading mb-1'>{Heading}</h4>
                    <p className='subHeading mb-1'>{SubHeading}</p>
                </Stack>
        </>
    )
}
