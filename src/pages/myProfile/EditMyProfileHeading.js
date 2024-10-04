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
        </Box>
    )
}
