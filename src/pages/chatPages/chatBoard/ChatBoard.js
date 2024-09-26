import styled from "styled-components";
import { Heading } from '../../../components/Heading'
import { SearchPanel } from '../../../components/Search'
import { IoIosArrowDown } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { InputField } from '../../../components/InputField'
import { UploadImage } from '../../../components/UploadImage'
import { PopupModal } from '../../../components/PopupModal'
import { SelectDropdown } from '../../../components/Dropdown'
import { Stack, Row, Col, Badge, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { ChatUser } from "./ChatUser";
import { ChatBox } from "./ChatBox";

const Box = styled.div`
  width: 100%;
  background: #ffffff;
  padding: 2rem;
`;

const ImgBox = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:auto;  
`;


const ListBox = styled.div`
max-height:45vh; 
overflow-y:auto;
&::-webkit-scrollbar {
  display: none;
}
`;



const user = [
    { image: '/assets/images/user.svg', name: 'Jhon doe', message: ' hahaha oh man', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: ' Jhon doe', message: ' hahaha oh man', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh mansadfghjkldsfghjkldfghjk sadfghj', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Jhon doe', message: ' hahaha oh mansadfghjkldsfghjkldfghjk sadfghj', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Elmer laverty', message: 'Adipisicing officia reprehenderit voluptate dolor occaecat sint cillum occaecat amet Lorem consequat aute laboris enim. Non deserunt officia nulla mollit consectetur deserunt enim. Adipisicing magna dolore consectetur do sint duis ad id pariatur sunt duis.', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Jhon doe', message: ' hahaha oh man', msgtime: '12m' },
    { image: '/assets/images/user.svg', name: 'Elmer laverty', message: ' hahaha oh man', msgtime: '12m' }
];

export const ChatBoard = () => {

    const [modalShow, setModalShow] = useState(false);
    const [userKey, setUserKey] = useState({});
    const action = [{ name: 'action 1', href: '#/1' }, { name: 'action 2', href: '#/2' }, { name: 'action 3', href: '#/3' }]

    const handleclick = (index) => {
        setUserKey(user[index]);
        
    }
    return <>
        <Stack direction='vertical' gap={3}  >
            <Box>
                <Heading Heading={'Chats'} SubHeading={'invite user as your team members'} />
            </Box>

            <Box className='pb-3'>
                <Row>
                    <Col md={7} lg={5} xl={4} >
                        <Stack direction='vertical' gap={3}>
                            <Stack direction='horizontal' gap={0} style={{ justifyContent: "space-between" }}>
                                <Stack direction='horizontal' gap={3}>
                                    <SelectDropdown title={'Message'} icon={<IoIosArrowDown />} items={action} />
                                    <Badge bg="dark" pill>12</Badge>
                                </Stack>

                                <FaCirclePlus fontSize={'2rem'} className='text-primary' onClick={() => setModalShow(true)} />

                            </Stack>

                            <hr className='mt-0' />

                            <Stack direction='vertical' gap={2}>
                                <SearchPanel id='search' className={'bg-light'} />
                            </Stack>

                            <ListBox>
                                <ListGroup variant="flush">
                                    {user.map((user, index) => {
                                        return (
                                            <ListGroup.Item onClick={() => { handleclick(index) }} key={""}>
                                                <ChatUser user={user} />
                                            </ListGroup.Item>
                                        )
                                    })}

                                </ListGroup>
                            </ListBox>

                        </Stack>
                    </Col>

                    <Col md={5} lg={7} xl={8} style={{ borderLeft: "2px solid gray" }}>
                        <ChatBox user={userKey} />
                    </Col>
                </Row>
            </Box>

        </Stack>

        <PopupModal
            show={modalShow}
            size={'sm'}
            modalTitle={'Create Group'}
            modalBody={<Stack direction='vertical' gap={2}><ImgBox><UploadImage /></ImgBox><InputField label={'Group Name'} placeholder={'Apparatus item name'} className={'rounded'} /></Stack>}
            btn1label={'close'}
            btn1variant={'outline-primary'}
            btn2label={'create'}
            btn2variant={'primary'}
            onHide={() => setModalShow(false)}
        />
    </>
}