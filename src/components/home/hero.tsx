import { Box } from "@chakra-ui/react";
import { useUser } from "../../components/user/userContext";
import SignUp from '../user/signup';
import { useEffect, useState } from 'react';
import BookCard from '../book/bookCard';
import { BookModal } from '../book/bookModal';
import { currentConfig } from '../../../config';

function Hero() {
    const { user } = useUser();
    const [selectedBook, setSelectedBook] = useState(null);
    const [data, setBooks] = useState([]);
    const endpoint = currentConfig.apiEnvEndpoint;

    useEffect(() => {
        fetchBooksFromBackend();
    }, []);

    const fetchBooksFromBackend = () => {
        fetch(`${endpoint}/books`)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            })
            .catch(error => console.error('Error fetching books:', error));
    };

    const openModal = (book: any) => {
        setSelectedBook(book);
    };

    const closeModal = () => {
        setSelectedBook(null);
    };


    return (
        <>
            <Box id="hero_container">
                <Box id="hero_left" className="hero">
                    <Box id="hero_element" bg={"light.solid"}></Box>
                    <h1 className="hero_text">Your Library</h1>
                    <Box className="hero_p">
                        <p>Within 7 days of borrowing a book it will be delivered to you, for free. Unless of course you fail to deliver it back after 31 days. You understand. Enjoy! </p>
                    </Box>
                    <br />
                    {user.user ? (
                        <h3>Welcome {user.user.UserName.first_name}</h3>
                    ) : (
                        <SignUp />
                    )}
                </Box>
                <Box id="hero_right" color="dark" bg="light.gradient" className="hero_book_container" margin={3}>

                    <Box
                        width={230} height={318} bg="gold.solid" borderRadius={3} marginTop={-10}
                        className='inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
                    >
                        {data.length > 0 && (
                            <BookCard book={data[0]} openModal={() => openModal(data[0])} />
                        )}
                        {selectedBook && (
                            <BookModal book={selectedBook} isOpen={!!selectedBook} onClose={closeModal} />
                        )}
                    </Box>
                    <Box className="flex" margin="1rem">
                        <h3>
                            Book of the Month
                        </h3>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Hero