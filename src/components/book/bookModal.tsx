import { Modal, ModalOverlay, ModalContent, Box, ModalBody, ModalCloseButton, Text, HStack, VStack, Flex, Button, Center, Divider, Link, Spacer } from '@chakra-ui/react';
import StarRating from './stars';
import TagButton from './bookModalTags';
import { useUser } from '../user/userContext';
import axios from 'axios';
import { useState } from 'react';
import Theme from '../../theme';
import AuthorInfoModal from './authorModal';
import BookMarkButton from './bookmark';
import { currentConfig } from '../../../config';
import { Book } from '../../types/book';

interface Props {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
}

export const BookModal = ({ book, isOpen, onClose }: Props) => {
    const [availableAmount, setAvailableAmount] = useState(book.available_amount);
    const [buttonClicked, setButtonClicked] = useState(0);
    const [firstMessage, setFirstMessage] = useState('');
    const [secondMessage, setSecondMessage] = useState('');
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
    const { user } = useUser();
    const endpoint = currentConfig.apiEnvEndpoint;
    const amountAvailable = book.available_amount;
    const amountStyles = {
        color: amountAvailable === 0 ? "red" : amountAvailable <= 3 ? "yellow" : "green",
        padding: "1rem",
        textAlign: "center",
    };
    console.log("book", book)
    const handleClick = async () => {
        try {
            if (user.user != null) {
                if (buttonClicked === 0) {
                    setFirstMessage(`
                    After you confirm, you will receive an email with a receipt and tracking information.
                    This service is free for as long as you follow our one rule: 
                    Return the book in fully readable condition within 31 days. 
                    Failure to follow the rules will result in an invoice for an 800 kr. fine. 
                    Don’t worry, postal costs are taken care of, simply deliver the book in the same package it was delivered in, to your nearest post office. 
                    If the package is damaged or lost, please inform us and a new one will be sent to you, for a price. 
                    That is 50 kr. 
                    Please respect our books, and we will respect you. Enjoy!`);
                } else if (buttonClicked === 1) {
                    const response = await axios.post(`${endpoint}/user/${user.user.user_id}/borrow/${book.book_id}`);
                    setAvailableAmount((prevAmount: number) => prevAmount - 1);
                    setFirstMessage('');
                    setSecondMessage('You have confirmed! An email has been sent to you. Enjoy!');
                    console.log(response.data);
                }
                // Toggle the buttonClicked state
                setButtonClicked((prevClickCount) => prevClickCount + 1);
            } else {
                setFirstMessage('You must be logged in to borrow a book');
            }
        } catch (error) {
            console.error('Error making Axios call for borrowBook:', error);
        }
    };
    const handleClickableAuthor = () => {
        setIsAuthorModalOpen(true);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="light.gradient">
                <ModalCloseButton />
                <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img className='book_modal'
                        src={"/assets/covers/" + book.picture}
                        alt={book.picture}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '70vh',
                            alignSelf: 'center',
                        }}>
                    </img>
                    <VStack
                        spacing={4}
                        align='stretch'>
                        <Spacer />
                        <HStack justifyContent="center">
                            <Text sx={amountStyles}>Available: {availableAmount || 0}</Text>
                            {user.user && <BookMarkButton book={book} user={user.user} />}
                        </HStack>
                        <HStack justifyContent="center">
                            <Text as="b" fontSize="md" style={Theme.styles.global.h4}>{book.title || "No Title"}</Text>
                            <Link as="u" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClickableAuthor(); }}>{book.Author.username || "No Author"}</Link>
                            {book.Reviews && book.Reviews[0] && <StarRating value={book.Reviews[0].stars || 3} bookId={book.book_id} />}
                        </HStack>
                        {isAuthorModalOpen && (
                            <AuthorInfoModal
                                isOpen={isAuthorModalOpen}
                                onClose={() => setIsAuthorModalOpen(false)}
                                author={book.Author}
                            />
                        )}
                        <Box padding={5}>
                            <Text>{book.summary || "No Description"}</Text>
                        </Box>
                        <Flex justifyContent="space-between">
                            {book.Tags.map((tag: any) => (
                                <TagButton key={tag.title} tag={tag} />
                            )) || "No Genres"}
                        </Flex>
                        <Box padding={2} display="flex" flexDirection="column" alignItems="center">
                            {firstMessage && <Text>{firstMessage}</Text>}
                            {secondMessage && <Text>{secondMessage}</Text>}
                        </Box>
                        {buttonClicked < 2 && (
                            <Button
                                id="borrow_book"
                                w="30%"
                                left="30%"
                                marginBottom="2rem"
                                variant="primary"
                                onClick={handleClick}
                                isDisabled={availableAmount <= 0}
                            >
                                {availableAmount <= 0 ? 'Out of stock' : buttonClicked ? 'Confirm' : 'Borrow Book'}
                            </Button>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
