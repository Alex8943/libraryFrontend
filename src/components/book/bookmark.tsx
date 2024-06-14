// BookmarkButton.jsx
import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { currentConfig } from '../../../config';
import { Book } from '../../types/book';

interface Props {
    book: any;
    user: any;
}

const BookmarkButton = ({ book, user }: Props) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const endpoint = currentConfig.apiEnvEndpoint;

    useEffect(() => {
        axios.get(`${endpoint}/user/${user.user_id}/bookmarked/${book.book_id}`)
            .then((response) => {
                if (response.data.length > 0) {
                    setIsBookmarked(true);
                } else {
                    setIsBookmarked(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [user, book]);

    const toggleBookmark = () => {
        if (isBookmarked) {
            axios.delete(`${endpoint}/user/${user.user_id}/bookmarked/${book.book_id}`)
                .then((response) => {
                    setIsBookmarked(false);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post(`${endpoint}/user/${user.user_id}/bookmarked/${book.book_id}`)
                .then((response) => {
                    setIsBookmarked(true);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Box>
            {isBookmarked ? (
                <FaHeart color="red" onClick={toggleBookmark} style={{ cursor: 'pointer' }} />
            ) : (
                <FaRegHeart onClick={toggleBookmark} style={{ cursor: 'pointer' }} />
            )}
        </Box>
    );
};

export default BookmarkButton;
