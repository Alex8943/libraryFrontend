import {
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Spacer,
    Box,
    HStack
} from '@chakra-ui/react'
import { useUser } from '../userContext';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BookmarkButton from '../../book/bookmark';
import { currentConfig } from '../../../../config';
import { bookmarkAllUser } from '../../../types/allBookmarkUser';

export default function UserBookmarked() {
    const [bookmarks, setBookmarks] = useState([]);
    const { user } = useUser();
    const endpoint = currentConfig.apiEnvEndpoint;

    const getBookmarks = async () => {
        try {
            const response = await axios.post(`${endpoint}/user/${user.user.user_id}/bookmarks/`, { "authToken": Cookies.get('authToken') });
            setBookmarks(response.data);
            console.log("Response:", response.data)
            console.log("user:", user);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    return (
        <>
            <ModalHeader fontWeight="bold">Books favorited by you</ModalHeader>
            <ModalCloseButton color='light.solid' />
            <ModalBody>
                {bookmarks.map((bookmark: bookmarkAllUser, index) => (
                    <HStack
                        borderColor='black'
                        borderWidth='1px'
                        p='1rem'>
                        <Box>
                            <h3>{bookmark.Book.title}</h3>
                        </Box>
                        <Spacer />
                        <Box>
                            <BookmarkButton book={bookmark} user={user.user} />
                        </Box>
                    </ HStack>
                ))}
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </>
    )
}