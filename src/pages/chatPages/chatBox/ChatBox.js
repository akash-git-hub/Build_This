import { Image, Stack } from "react-bootstrap"
import styled from "styled-components";
import { InputField } from "../../../components/InputField";
import { BiSolidNavigation } from "react-icons/bi";

const MessageBox = styled.div`
width:100%;
min-height:450px;  
overflow:auto;
`;

export const ChatBox = () => {
    return (
        <Stack direction='vertical' gap={1} >
        <Stack direction='horizontal' gap={3} className='mx-3'>
            <Image src='/assets/images/user.svg' fluid rounded />
            <Stack direction='vertical' gap={0}>
                <h5 className='mb-0'>Florencio Dorrance</h5>
                <small > <span className='fs-4 fw-bold text-success'>● </span>Online</small>
            </Stack>
        </Stack>

        <hr />
        <Stack direction="vertical" gap={2}>
            <MessageBox>

            </MessageBox>
            <InputField className={'rounded-start'} placeholder={'Type a message'} endIcon={<BiSolidNavigation fontSize={'2rem'} className='text-primary' />} />
        </Stack>
    </Stack>
    )
}