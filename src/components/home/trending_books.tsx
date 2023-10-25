import { data } from "../../mockData/data"
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Box } from "@chakra-ui/react";

export default function TrendingBooks() {
    const slideLeft = () => {
        const slider = document.getElementById('slider2');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - 500;
        }
    }

    const slideRight = () => {
        const slider = document.getElementById('slider2');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + 500;
        }
    }

    return (
        <>
            <Box margin={3} className="slider_container">
                <Box className='relative flex items-center'>
                    <Box
                        id='slider2'
                        className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                    >
                        {data.map((item) => (
                            <img
                                className='w-[10rem] h-[13rem] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
                                src={item.img}
                                alt='/'
                            />
                        ))}
                    </Box>

                </Box>
                <Box display={"grid"} justifyContent={"end"} className="slider_right">
                    <h3 className="banner_content">Trending Books</h3>
                    <Box className="flex" justifyContent={"end"} color="white">
                        <MdChevronLeft className='cursor-pointer hover:opacity-100' onClick={slideLeft} size={30} />
                        <MdChevronRight className='cursor-pointer hover:opacity-100' onClick={slideRight} size={30} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}