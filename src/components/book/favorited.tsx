import { Box } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { currentConfig } from '../../../config';
import { Author } from '../../types/author';
import { User } from '../../types/user';

interface Props {
    author: Author;
    user: User;
    id?: string;
}

const FavoritedButton = ({ author, user, id }: Props) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const endpoint = currentConfig.apiEnvEndpoint;

    useEffect(() => {
        // Check if the author is already favorited by the user
        axios.get(`${endpoint}/user/${user.user_id}/author/${author.author_id}`)
            .then((response) => {
                if (response.data.favorited_id) {
                    setIsFavorited(true);
                } else {
                    setIsFavorited(false);
                }
                console.log("Response", response, "IsFavorited", isFavorited);
            }).catch((error) => {
                console.log(error);
            });
    }, [user, author]);

    const toggleFavorited = () => {
        if (isFavorited) {
            axios.delete(`${endpoint}/user/${user.user_id}/author/${author.author_id}`)
                .then((response) => {
                    setIsFavorited(false);
                    console.log("Unfavorited", response);
                }).catch((error) => {
                    console.log(error);
                });
        } else {
            axios.post(`${endpoint}/user/${user.user_id}/author/${author.author_id}`, { "authToken": Cookies.get('authToken') })
                .then((response) => {
                    setIsFavorited(true);
                    console.log("Favorited", response);
                }).catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Box id={id}>
            {isFavorited ? (
                <FaHeart color="red" onClick={toggleFavorited} style={{ cursor: 'pointer' }} />
            ) : (
                <FaRegHeart onClick={toggleFavorited} style={{ cursor: 'pointer' }} />
            )}
        </Box>
    );
};

export default FavoritedButton;
