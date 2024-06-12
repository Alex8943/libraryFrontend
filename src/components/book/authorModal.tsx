import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Text, VStack, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BookCard from './bookCard';
import FavoritedButton from './favorited';
import { useUser } from '../user/userContext';
import { currentConfig } from '../../../config';
import { GiFeather } from 'react-icons/gi';
import { Book } from '../../types/book';

interface AuthorInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    author: any;
}

const AuthorInfoModal: React.FC<AuthorInfoModalProps> = ({ isOpen, onClose, author }) => {
    const [booksByAuthor, setBooksByAuthor] = useState([]);
    const { user } = useUser();
    const endpoint = currentConfig.apiEnvEndpoint;

    useEffect(() => {
        if (isOpen) {
            console.log('author: ', author);
            axios.get(`${endpoint}/author/${author.author_id}/books`)
                .then((response) => {
                    console.log(response);
                    setBooksByAuthor(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching books by author:', error);
                });
        }
    }, [isOpen, author]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="light.gradient">
                <Box background="red.gradient" className="modul_banner">
                    <div className="feather">
                        <GiFeather />
                    </div>
                    <ModalCloseButton color="light.solid" />
                </Box>

                <ModalBody>
                    <VStack spacing={4}>
                        <h2><b>{author.username || 'No Author Information'}</b></h2>
                        {user.user ? (
                            <FavoritedButton id="favorite_author_button" author={author} user={user.user} />
                        ) : (<></>)}
                        <p>{author.total_books}: Published Books</p>
                        <Box id="slider" className="overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
                            {booksByAuthor.map((book: Book, index) => (
                                <Box key={book.book_id || index} className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300">
                                    <BookCard book={book} />
                                </Box>
                            ))}
                        </Box>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthorInfoModal;
