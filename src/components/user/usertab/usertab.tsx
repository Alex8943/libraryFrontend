import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    Image,
    useDisclosure,
    ModalCloseButton,
    Box,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import Theme from '../../../theme';
import Userdata from './userdata';
import Userborrowed from './userborrowed';
import UserFavoritedAuthors from "./userauthors";
import UserReviews from "./userreviews";
import UserBookmarked from "./userbookmarks";
import { useUser } from "../userContext";

export default function usertab() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeTab, setActiveTab] = useState("userinfo");

    const avatar_img_style = {
        width: '3rem',
        cursor: 'pointer'
    }

    const button_row_style = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    const handleTabChange = (e: any) => {
        const { name } = e.target;
        setActiveTab(name);
    };

    const { user } = useUser();

    return (
        <>
            <Image id="user_tab_image" src="assets/userLogo.svg" style={avatar_img_style} onClick={onOpen} />
            <Modal isOpen={isOpen} size={'lg'} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg='light.gradient'>
                    <Box background='red.gradient' className='modul_banner'>
                        <img src="assets/userLogo.svg" alt="userlogo" />

                        <Button className="settings" onClick={handleTabChange} name='userinfo'><SettingsIcon /></Button>
                    </Box>
                    <br /> <h2 className='center_this'>{user.user.UserName.first_name + " " + user.user.UserName.last_name}</h2><br />
                    <div style={button_row_style}>
                        <Button onClick={handleTabChange} name='bookmarks'>Bookmarks</Button>
                        <Button onClick={handleTabChange} name='borrowed'>Borrowed</Button>
                        <Button onClick={handleTabChange} name='authors'>Authors</Button>
                        <Button onClick={handleTabChange} name='reviews'>Reviews</Button>

                    </div>
                    <div>
                        {activeTab === 'bookmarks' ?
                            <UserBookmarked />
                            : activeTab === 'borrowed' ?
                                <Userborrowed />
                                : activeTab === 'authors' ?
                                    <UserFavoritedAuthors />
                                    : activeTab === 'reviews' ?
                                        <UserReviews />
                                        : activeTab === 'userinfo' ?
                                            <Userdata onClose={onClose} />
                                            : null}
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}