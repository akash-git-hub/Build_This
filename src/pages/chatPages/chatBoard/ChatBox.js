
import { Image, Stack } from "react-bootstrap"
import styled from "styled-components";
import { InputField } from "../../../components/InputField";
import { BiSolidNavigation } from "react-icons/bi";
import { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import moment from "moment-timezone";

const MessageBox = styled.div`
 
max-height:450px;  
min-height:450px;  
overflow-Y:auto;
&::-webkit-scrollbar {
  display: none;
}
`;

const Message = styled.p`
display:inline-block;
background:#E6F5FF;
padding:10px;
margin-bottom:0px;
border-radius:10px;
`;

export const ChatBox = ({ chat, handleSend, messages, currentUser }) => {
    const [showEmoji, setShowEmoji] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const [message, setMessage] = useState();

    const clean = (data) => {
        const msg = data;
        handleSend(msg);
        setMessage("");
    }

    return (
        <Stack direction='vertical' gap={1} >
            <Stack direction='horizontal' gap={3} className='mx-3'>
                <Image
                    src={chat?.photoURL ? chat?.photoURL : '/assets/images/user.svg'}
                    style={{ maxWidth: "50px" }}
                    fluid rounded />
                <Stack direction='vertical' gap={0}>
                    <h5 className='mb-0'>{chat?.displayName}</h5>
                    <small > <span className='fs-4 fw-bold text-success'>● </span>Online</small>
                </Stack>
            </Stack>
            <hr />
            <Stack direction="vertical" gap={2}>
                <MessageBox>
                    <Stack direction='vertical' gap={3}>
                        {messages.map((msg, index) => {
                            return (
                                (msg.senderId === currentUser?.id) ? (
                                    <Stack direction="horizontal" gap={2} style={{ justifyContent: 'end', alignItems: 'end' }}>
                                        <div style={{ marginLeft: '100px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                backgroundColor: '#E6F5FF',
                                                marginBottom: '0px',
                                                borderRadius: '10px',
                                                padding: '10px',
                                            }}>{msg.text} </span>
                                            <small className='fw-normal  d-flex justify-content-end'>{msg?.date ? moment.unix(msg.date).format('HH:mm') : ''}</small>

                                        </div>
                                        <Image src='/assets/images/user.svg' roundedCircle className="mb-4" style={{ maxWidth: '30px' }} />

                                    </Stack>
                                ) : (
                                    <Stack direction="horizontal" gap={2} style={{ alignItems: 'end' }} >
                                        <Image src={chat?.chat?.pr_image ? chat?.chat?.pr_image : '/assets/images/user.svg'} roundedCircle className="mb-4" style={{ maxWidth: '30px' }} />
                                        <div style={{ marginRight: '100px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                backgroundColor: '#E6F5FF',
                                                marginBottom: '0px',
                                                borderRadius: '10px',
                                                padding: '10px',
                                            }}>{msg.text} </span>
                                            <small className='fw-bold text-muted d-flex justify-content-end'>{msg.time}</small>
                                        </div>
                                    </Stack>
                                )
                            )
                        })}
                    </Stack>
                </MessageBox>
            </Stack>
            <InputField
                className={'rounded-start h-25'}
                placeholder={'Type a message'}
                value={message}
                as={"textarea"}
                // startIcon={<GrEmoji fontSize={'1.5rem'} onClick={handleEmoji} />}
                style={{ display: 'inline-block' }}
                onChange={(e) => setMessage(e.target.value)}
                endIcon={<BiSolidNavigation fontSize={'2rem'} style={{cursor:'pointer'}} className="text-primary" onClick={() => clean(message)} />}
            />


        </Stack>
    )
}

