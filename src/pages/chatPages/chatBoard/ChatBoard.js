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
import { useEffect, useState } from "react";
import { ChatUser } from "./ChatUser";
import { ChatBox } from "./ChatBox";
import { LiveChatSearch } from "../../../components/LiveChatSearch";
import { getAllUserListAPI, searchChatListAPI } from "../../../APIServices/service";
import { MyContext } from "../../../App";
import { useContext } from "react";
import moment, { unix } from "moment-timezone";
import { db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { getDoc, setDoc, updateDoc, doc, onSnapshot, arrayUnion } from "firebase/firestore";

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
max-height:470px;  
overflow-y:auto;
&::-webkit-scrollbar {
  display: none;
}
`;



export const ChatBoard = ({ setWaiting }) => {

    const { info: currentUser } = useContext(MyContext);
    const [modalShow, setModalShow] = useState(false);

    const [searchData, setSearchData] = useState([]);
    const [crChat, setCrChat] = useState();
    const [chatUserData, setChatUserData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [commonIDS, setCommonIDS] = useState();

    const setChatHandler = (e) => { setCrChat(e); }
    const [searchValue, setSearchValue] = useState();

    const getSearch = async (data) => {
        setSearchValue(data);
        const searchKey = data.replace(/\s+/g, '');
        const resp = await searchChatListAPI(searchKey);
        if (resp && resp.message) {
            let data = resp?.data;
            data = data.filter((e) => e.id !== currentUser.id);
            setSearchData(data);
        } else {
            setSearchData();
        }
    }

    useEffect(() => {
        if (crChat) {
            const combinedId = currentUser?.id > crChat?.uid ? currentUser?.id + ',' + crChat?.uid : crChat?.uid + ',' + currentUser?.id;
            setCommonIDS(combinedId);
            const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
            return () => {
                unSub();
            };
        }
    }, [crChat]);


    useEffect(() => {
        const crId = currentUser?.id + ',buildThis';
        if (crId) {
            const uSub = onSnapshot(doc(db, "userChats", crId), (doc) => {
                if (doc.exists()) {
                    setChatUserData(doc.data().userInfo);
                }
            });
            return () => {
                uSub();
            };
        }
    }, [commonIDS]);

    const clickHandler = async (e) => {
        setWaiting(true);
        const time = moment().unix();
        const combinedId = currentUser.id > e.id ? currentUser.id + ',' + e.id : e.id + ',' + currentUser.id;
        setCommonIDS(combinedId);
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
            }
            const crId = e?.id + ',buildThis';
            if (crId) {
                const res2 = await getDoc(doc(db, "userChats", crId));
                if (!res2.exists()) {
                    // If the document does not exist, create it with the user info
                    console.log("Document does not exist, creating new document...");
                    await setDoc(doc(db, "userChats", crId), {
                        combinedId: combinedId,
                        userInfo: [{
                            uid: currentUser.id,
                            displayName: currentUser.full_name,
                            photoURL: currentUser.pr_image,
                            date: time,
                        }],
                    });
                } else {
                    // If the document exists, update the userInfo
                    console.log("Document exists, updating...");
                    const existingData = res2.data();
                    let updatedUserInfo = existingData.userInfo || [];
                    // Check if the user already exists in userInfo array
                    const existingUserIndex = updatedUserInfo.findIndex(user => user.uid === currentUser.id);
                    if (existingUserIndex !== -1) {
                        // Update the existing user info
                        updatedUserInfo[existingUserIndex] = {
                            uid: currentUser.id,
                            displayName: currentUser.full_name,
                            photoURL: currentUser.pr_image,
                            date: time,
                        };
                    } else {
                        // Add new user to the userInfo array
                        updatedUserInfo.push({
                            uid: currentUser.id,
                            displayName: currentUser.full_name,
                            photoURL: currentUser.pr_image,
                            date: time,
                        });
                    }

                    await updateDoc(doc(db, "userChats", crId), {
                        userInfo: updatedUserInfo
                    });
                }
                const crUserId = currentUser?.id + ',buildThis';
                const res3 = await getDoc(doc(db, "userChats", crUserId));
                if (!res3.exists()) {
                    // If the document does not exist, create it with the user info
                    console.log("Document does not exist, creating new document...");
                    await setDoc(doc(db, "userChats", crUserId), {
                        combinedId: combinedId,
                        userInfo: [{
                            uid: e.id,
                            displayName: e.full_name,
                            photoURL: e.pr_image,
                            date: time,
                        }],
                    });
                } else {
                    // If the document exists, update the userInfo
                    console.log("Document exists, updating...");
                    const existingData = res2.data();
                    let updatedUserInfo = existingData.userInfo || [];
                    // Check if the user already exists in userInfo array
                    const existingUserIndex = updatedUserInfo.findIndex(user => user.uid === e.id);

                    if (existingUserIndex !== -1) {
                        // Update the existing user info
                        updatedUserInfo[existingUserIndex] = {
                            uid: e.id,
                            displayName: e.full_name,
                            photoURL: e.pr_image,
                            date: time,
                        };
                    } else {
                        // Add new user to the userInfo array
                        updatedUserInfo.push({
                            uid: e.id,
                            displayName: e.full_name,
                            photoURL: e.pr_image,
                            date: time,
                        });
                    }
                    await updateDoc(doc(db, "userChats", crUserId), {
                        userInfo: updatedUserInfo
                    });
                }
            }

        } catch (error) {
            console.log("error---", error);
        } finally {
            setWaiting(false);
            setSearchValue();
            setSearchData();
        }
        // finally {
        //     const data = chatUserData.some((u) => u.id === e.id);
        //     setChatHandler(e);
        //     if (data) {
        //         setChatUserData(chatUserData.sort((a, b) => {
        //             if (a.id === e.id) return -1; // Move the element with e.id to the top
        //             if (b.id === e.id) return 1;
        //             return 0; // Keep the order of other elements the same
        //         }));
        //         setSearchData();

        //     } else {
        //         setChatUserData((prevChatUser) => [e, ...prevChatUser]);
        //         setSearchData();
        //     }
        // }
    };

    const handleSend = async (msg) => {
        const time = moment().unix();
        await updateDoc(doc(db, "chats", commonIDS), {
            messages: arrayUnion({
                id: uuid(),
                text: msg,
                senderId: currentUser.id,
                date: time,
            }),
        });

        // await updateDoc(doc(db, "userChats", currentUser.id), {
        //     [data.chatId + ".lastMessage"]: {
        //         text,
        //     },
        //     [data.chatId + ".date"]: time,
        // });

        // await updateDoc(doc(db, "userChats", data.user.uid), {
        //     [data.chatId + ".lastMessage"]: {
        //         text,
        //     },
        //     [data.chatId + ".date"]: time,
        // });

    };

    return <>
        <Stack direction='vertical' gap={3}>
            <Box>
                <Heading Heading={'Chats'} SubHeading={'invite user as your team members'} />
            </Box>

            <Box >
                <Row>
                    <Col md={7} lg={5} xl={4} >
                        <Stack direction='vertical' gap={3}>

                            <Stack direction='horizontal' gap={0} style={{ justifyContent: "space-between" }}>

                                <Stack direction='horizontal' gap={3} >
                                    <SelectDropdown title={'Message'} icon={<IoIosArrowDown />} />
                                    <Badge bg="dark" pill>12</Badge>
                                </Stack>

                                {/* <FaCirclePlus fontSize={'2rem'} className='text-primary' onClick={() => setModalShow(true)} /> */}

                            </Stack>

                            <hr className='mt-0' />

                            <Stack direction='vertical' gap={2}>
                                <LiveChatSearch className={'bg-light'} value={searchValue} getSearch={getSearch} searchData={searchData} clickHandler={clickHandler} />
                                {/* <SearchPanel id='search' className={'bg-light'} /> */}
                            </Stack>

                            <ListBox style={{ minHeight: "70vh" }}>
                                <ListGroup variant="flush">
                                    {chatUserData.map((e, i) => (
                                        <ListGroup.Item onClick={() => setChatHandler(e)} key={i}>
                                            <ChatUser user={e} />
                                        </ListGroup.Item>

                                    ))}

                                </ListGroup>
                            </ListBox>

                        </Stack>
                    </Col>
                    <Col md={5} lg={7} xl={8} style={{ borderLeft: "2px solid gray" }}>
                        {crChat &&
                            <ChatBox chat={crChat} handleSend={handleSend} messages={messages} currentUser={currentUser} />
                        }
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