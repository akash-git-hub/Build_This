
import { Image, Stack } from "react-bootstrap"
import styled from "styled-components";
import { InputField } from "../../../components/InputField";
import { BiSolidNavigation } from "react-icons/bi";
import { useRef, useState } from "react";
import { CgAttachment } from "react-icons/cg";

const MessageBox = styled.div`
max-height: 46vh;  
min-height: 46vh;  
overflow-y:auto;
&::-webkit-scrollbar {
  display: none;
}
`;

 

export const ChatBox = (user) => {
    const fileinputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([{ text:'Nostrud cillum non veniam nisi elit nostrud ex pariatur amet dolore pariatur. Eiusmod elit labore veniam nisi et amet elit exercitation consectetur Lorem cupidatat cillum ad. Incididunt elit incididunt incididunt laboris magna commodo'
, received:user.user.name, time:"12:05" }]);

    const handleSend = () => {
        const date = new Date();
        const hours = date.getHours();
        const currentTime = (hours >= 12 )? ((hours - 12) +':'+date.getMinutes() +"pm"):( hours +":"+date.getMinutes() +"am") ;
        if (message !== '') {
            setMessages([...messages, { text: message, sender:'admin' , time: currentTime }])
            setMessage('');
        }
    } 

    const handleAttachments = () => {
        if (fileinputRef.current) {
        fileinputRef.current.click();}
    }

    const handleFileChange = (e) => {
        const file = fileinputRef.current.files[0];
        console.log(file.name);
    }

   

    return (
        <Stack direction='vertical' gap={1} >
            <Stack direction='horizontal' gap={3} className='mx-3'>
                <Image src='/assets/images/user.svg' fluid rounded  />
                <Stack direction='vertical' gap={0}>
                    <h6 className='mb-0'>{user.user.name}</h6>
                    <small className="mt-0"> <span className=' fw-bold text-success'>● </span>Online</small>
                </Stack>
            </Stack>

            <hr />
            <Stack direction="vertical" gap={2}>
                <MessageBox>
                    <Stack direction='vertical' gap={3}>
                        {messages.map((msg, index) => {
                           
                            return (
                                (msg.sender==="admin")?(
                                    <Stack direction="horizontal" gap={2} style={{justifyContent:'end',alignItems:'end'}}>
                                    <div style={{marginLeft:'100px'}}>
                                        <span style={{
                                            display:'inline-block',
                                            backgroundColor:'#E6F5FF',
                                            marginBottom:'0px',
                                            borderRadius:'10px',
                                            padding:'10px',
                                            fontSize:'0.8rem'
                                            }}>{msg.text} </span>
                                        <small className='fw-normal  d-flex justify-content-end'>{msg.time}</small>
                                    </div>
                                    <Image src='/assets/images/user.svg' roundedCircle className="mb-4"/>

                                </Stack>
                                ):(
                                    <Stack direction="horizontal" gap={2}  style={{alignItems:'end'}} >
                                    <Image src='/assets/images/user.svg' roundedCircle className="mb-4"/>
                                    <div style={{marginRight:'100px'}}>
                                        <span style={{
                                            display:'inline-block',
                                            backgroundColor:'#E6F5FF',
                                            marginBottom:'0px',
                                            borderRadius:'10px',
                                            padding:'10px',
                                            fontSize:'0.8rem'
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
                placeholder={'Type a message'}
                value={message}
                // as={"textarea"}
                startIcon={<CgAttachment onClick={handleAttachments}/>}
                onChange={(e) => setMessage(e.target.value)}
                endIcon={<BiSolidNavigation fontSize={'1.3rem'} className="text-primary" onClick={handleSend} />} 
                />
               <input type={'file'} className={'d-none'} ref={fileinputRef} onChange={handleFileChange} accept="image/*" />

        </Stack>
    )
}

