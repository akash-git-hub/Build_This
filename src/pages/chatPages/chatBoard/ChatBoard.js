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
import { getAllUserListAPI, getMyProjects_API, searchChatListAPI, uploadGroupImage } from "../../../APIServices/service";
import { MyContext } from "../../../App";
import { useContext } from "react";
import moment, { unix } from "moment-timezone";
import { db } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { getDoc, setDoc, updateDoc, doc, onSnapshot, arrayUnion, addDoc, collection, where, documentId, query } from "firebase/firestore";
import { Select } from "../../../components/Select";
import NewSelect from "../../../components/NewSelect";
import { errorAlert, successAlert } from "../../../components/Alert";
import { GroupsList } from "./GroupsList";
import { GroupChatBox } from "./GroupChatBox";

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
    const [projectList, setProjectList] = useState();
    const [myGrProjectIds, setMyGrProjectIds] = useState();
    const [groupsName, setGroupsName] = useState([]);
    const [grChatHandler, setGrChatHandler] = useState();
    const [grpImg, setGrpImg] = useState();
    const [groupMessages, setGroupMessages] = useState([]);

    const items = [
        { "id": 1, "name": 'Chat' },
        { "id": 2, "name": 'Groups' },
    ]

    const [prInput, setPrInput] = useState({ 'grName': "", "prId": '' });
    const [feedback, setFeedback] = useState({ "grName": "", "prId": "", });


    const [prOption, setPrOption] = useState();

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
        const prIDS = myGrProjectIds?.projectIds || [];// myGrProjectIds || [];// ["2", "1"];

        if (prIDS.length > 0) {
            const q = query(collection(db, "groups"), where(documentId(), "in", prIDS));
            const unSub = onSnapshot(q, (querySnapshot) => {
                const groupsData = [];
                querySnapshot.forEach((doc) => {
                    if (doc.exists()) {
                        groupsData.push(doc.data());
                    }
                });
                setGroupsName(groupsData); // Assuming you're expecting an array of group data
            });

            return () => unSub();
        }
    }, [myGrProjectIds]);



    useEffect(() => {
        const crUser = currentUser?.id.toString();
        if (crUser) {
            const unSub = onSnapshot(doc(db, "groupUsers", crUser), (doc) => {
                doc.exists() && setMyGrProjectIds(doc.data());
            });
            return () => {
                unSub();
            };
        }
    }, []);

    useEffect(() => {
        if (grChatHandler) {
            const prId = grChatHandler?.projectId;
            const unSub = onSnapshot(doc(db, "GroupChats", prId), (doc) => {
                doc.exists() && setGroupMessages(doc.data().messages);
            });
            return () => {
                unSub();
            };
        }
    }, [grChatHandler]);


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


    const my_projects = async () => {
        const resp = await getMyProjects_API();
        const data = resp.data;
        setProjectList(data);
        let pre = [];
        data.forEach((e) => {
            pre.push({ "name": e.project_name, "value": e.id });
        });
        setPrOption(pre);
    }


    useEffect(() => {
        my_projects();
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
    };



    const [options, setOptions] = useState(1);

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



    const GroupHandleSend = async (msg) => {
        const time = moment().unix();
        const { pr_image } = currentUser;
        const { groupName, projectId } = grChatHandler;

        const res = await getDoc(doc(db, "GroupChats", projectId));
        if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "GroupChats", projectId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: msg,
                    senderId: currentUser.id,
                    date: time,
                    image: pr_image
                }),
            });
        } else {
            await updateDoc(doc(db, "GroupChats", projectId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: msg,
                    senderId: currentUser.id,
                    date: time,
                    image: pr_image
                }),
            });
        }
    };



    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setPrInput((pre) => ({ ...pre, [name]: value }));
        setFeedback((pre) => ({ ...pre, [name]: "" }));
    }

    const imageHandler = async (e) => {
        const { name, value } = e;
        let fData = new FormData();
        fData.append('image', value);
        const resp = await uploadGroupImage(fData);
        if (resp) {
            const url = resp?.data;
            setGrpImg(url)
        }
    }


    const createGrHandler = async () => {
        let isValid = true;
        const { prId, grName } = prInput;

        // Check if the project exists in the project list
        const project = projectList.find((e) => e.id == prId);

        if (!project) {
            setFeedback((prev) => ({ ...prev, "prId": "Project not found" }));
            isValid = false;
        } else {
            let team = [...project.team_userId];  // Spread the team array to avoid mutation
            if (project.created__by) {
                team.push(project?.created__by.toString());  // Ensure it's a string
            }

            // Field validations
            if (!prId) {
                setFeedback((prev) => ({ ...prev, "prId": "Required" }));
                isValid = false;
            }
            if (!grName) {
                setFeedback((prev) => ({ ...prev, "grName": "Required" }));
                isValid = false;
            }

            if (isValid) {
                setWaiting(true);
                const time = moment().unix(); // Get the current Unix timestamp
                const groupData = {
                    groupName: grName,
                    time: time,
                    projectId: prId,
                    createdBy: project.created__by,
                    groupImage: grpImg
                };

                // Create the main group document if not exists
                const groupRef = doc(db, "groups", prId);  // The group document uses prId as the ID

                const groupDoc = await getDoc(groupRef);
                if (groupDoc.exists()) {
                    errorAlert("This project group already exists");
                    setWaiting(false);
                    return;  // Exit if the group already exists

                } else {
                    try {
                        // Create the main group document with project data
                        await setDoc(groupRef, groupData);
                        console.log("Group document created with ID:", prId);
                        setPrInput({ grName: "", prId: "" });  // Clear input fields
                        setFeedback({ "grName": "", "prId": "" });  // Clear feedback
                    } catch (error) {
                        console.error("Error creating group document: ", error);
                    }
                }

                // Handle the groupUsers collection for each user in the team
                for (const userId of team) {
                    const groupUsersRef = doc(db, "groupUsers", userId); // Reference to the user's document
                    const groupUsersDoc = await getDoc(groupUsersRef);

                    if (groupUsersDoc.exists()) {
                        // If the document exists, update it by adding the new projectId to the user's array
                        await updateDoc(groupUsersRef, {
                            projectIds: arrayUnion(prId)  // Add prId to the existing array, ensuring no duplicates
                        });
                        console.log(`Group user for ${userId} updated with projectId.`);
                    } else {
                        // If the document doesn't exist, create a new document for the user with just the projectIds array
                        try {
                            await setDoc(groupUsersRef, {
                                projectIds: [prId]  // Initialize projectIds with the current prId
                            });
                            console.log(`New groupUsers document created for user ${userId}.`);
                        } catch (error) {
                            console.error(`Error creating groupUsers document for user ${userId}: `, error);
                        }
                    }
                }
                successAlert("Group Creation Success");
                setModalShow(false)
                setWaiting(false);
            }
            setWaiting(false);
        }
        setWaiting(false);
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
                                    <SelectDropdown title={'Message'} items={items} setOptions={setOptions} icon={<IoIosArrowDown />} />
                                    {/* <Badge bg="dark" pill>12</Badge> */}
                                </Stack>

                                <FaCirclePlus fontSize={'2rem'} className='text-primary' onClick={() => setModalShow(true)} />

                            </Stack>

                            <hr className='mt-0' />

                            {options === 1 ?
                                <>
                                    <Stack direction='vertical' gap={2}>
                                        <LiveChatSearch className={'bg-light'} value={searchValue} getSearch={getSearch} searchData={searchData} clickHandler={clickHandler} />
                                        {/* <SearchPanel id='search' className={'bg-light'} />   */}
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
                                </>
                                :
                                <ListBox style={{ minHeight: "70vh" }}>
                                    <ListGroup variant="flush">
                                        {groupsName.map((e, i) => (
                                            <ListGroup.Item onClick={() => setGrChatHandler(e)} key={i}>
                                                <GroupsList groups={e} />
                                            </ListGroup.Item>
                                        ))}

                                    </ListGroup>
                                </ListBox>
                            }

                        </Stack>
                    </Col>
                    {options === 1 ?
                        <Col md={5} lg={7} xl={8} style={{ borderLeft: "2px solid gray" }}>
                            {crChat &&
                                <ChatBox chat={crChat} handleSend={handleSend} messages={messages} currentUser={currentUser} />
                            }
                        </Col>
                        :
                        <Col md={5} lg={7} xl={8} style={{ borderLeft: "2px solid gray" }}>
                            {grChatHandler &&
                                <GroupChatBox chat={grChatHandler} handleSend={GroupHandleSend} messages={groupMessages} currentUser={currentUser} />
                            }
                        </Col>
                    }
                </Row>
            </Box>

        </Stack>

        <PopupModal
            show={modalShow}
            size={'sm'}
            modalTitle={'Create Group'}
            modalBody={<Stack direction='vertical' gap={2}>
                <ImgBox>
                    <UploadImage
                        label={"Upload Logo"}
                        name="logo"
                        controlId="formProfilePic"
                        onChange={imageHandler}
                    />
                </ImgBox>
                <NewSelect
                    name={"prId"}
                    value={prInput.prId}
                    onChange={onChangeHandler}
                    error={feedback.prId}
                    Array={prOption}
                    FormLabel={'Select Project name'}
                    SelectOption={'select'} />
                <InputField
                    label={'Group Name'}
                    placeholder={'enter group name'}
                    isInvalid={feedback.grName} feedback={feedback.grName}
                    name={'grName'} value={prInput.grName}
                    onChange={onChangeHandler}
                    className={'rounded'} />

            </Stack>
            }
            btn1label={'close'}
            btn1variant={'outline-primary'}
            btn2label={'create'}
            btn2variant={'primary'}
            createGrHandler={createGrHandler}
            onHide={() => setModalShow(false)}
        />
    </>
}