import React from 'react'
import { Heading } from '../../components/Heading'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`

export default function EditMyProfileHeading({ inHeading, inSubHeading }) {
    return (
        <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <Heading Heading={inHeading} SubHeading={inSubHeading} />
            {/* <Stack direction='horizontal' gap={2} style={{alignItems:"start", justifyContent: 'start' }} >
                <Image src='/assets/images/Avatar.svg' className='img-fluid ' style={{ width: "40px", height: "40px", marginTop: "0px", paddingTop: "0px" }} rounded />
                <Stack direction='vertical' gap={0} style={{
                    alignItems: 'start',
                    justifyContent: 'start'
                }}>
                    <h6 className='heading mb-0'>Jaylee Fox</h6>
                    <p className='subHeading mb-0'>jaylee@foxgmail.com</p>
                </Stack>
            </Stack> */}
        </Box>
    )
}
