import styled from "styled-components";
import { Heading } from '../../components/Heading'
import { SearchPanel } from '../../components/Search'
import { IoIosArrowDown } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { ChatList } from '../../components/ChatList'
import { InputField } from '../../components/InputField'
import { UploadImage } from '../../components/UploadImage'
import { PopupModal } from '../../components/PopupModal'
import { SelectDropdown } from '../../components/Dropdown'
import { Stack, Row, Col, Badge } from "react-bootstrap";
import { useState } from "react";
import { ChatBox } from "./chatBox/ChatBox";

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

export const ChatBoard = () => {

    const [modalShow, setModalShow] = useState(false);
    const action = [{ name: 'action 1', href: '#/1' }, { name: 'action 2', href: '#/2' }, { name: 'action 3', href: '#/3' }]

    return <>
        <Stack direction='vertical' gap={3}>
            <Box>
                <Heading Heading={'Chats'} SubHeading={'invite user as your team members'} />
            </Box>

            <Box>
                <Row>
                    <Col md={7} lg={5} xl={4} >
                        <Stack direction='vertical' gap={3}>

                            <Stack direction='horizontal' gap={0} style={{ justifyContent: "space-between" }}>
                                <Stack direction='horizontal' gap={3}><SelectDropdown title={'Message'} icon={<IoIosArrowDown />} items={action} /><Badge bg="dark" pill>12</Badge></Stack>
                                <FaCirclePlus fontSize={'2rem'} className='text-primary' onClick={() => setModalShow(true)} />
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
                            </Stack>

                            <hr className='mt-0' />

                            <Stack direction='vertical' gap={2}>
                                <SearchPanel id='search' className={'bg-light'} />
                            </Stack>
                            <ChatList />
                        </Stack>
                    </Col>

                    <Col md={5} lg={7} xl={8} style={{ borderLeft: "2px solid gray" }}>
                      <ChatBox/>
                    </Col>
                </Row>
            </Box>

        </Stack>
    </>
}