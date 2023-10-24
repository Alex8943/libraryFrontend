import { data } from "../../mockData/data"
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Button } from "@chakra-ui/react";



export function getFavoriteBooks() {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  }

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  }

  return (
    <>
      <div className="hero">
        <h1 className="hero_text">Your Library</h1>
        <div>
          <p>Within 7 days of borrowing a book it will be delivered to you, for free. Unless of course you fail to deliver it back after 31 days. You understand. Enjoy! </p>
        </div>
        <Button variant="primary" width="100%" marginTop="30">Sign Up</Button>
      </div>
      <div className='relative flex items-center'>
        <div
          id='slider'
          className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {data.map((item) => (
            <img
              className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
              src={item.img}
              alt='/'
            />
          ))}
        </div>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  );
}


export function getSavedBooks() {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  }

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  }

  return (
    <>
      <div className='relative flex items-center'>
        <div
          id='slider'
          className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {data.map((item) => (
            <img
              className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
              src={item.img}
              alt='/'
            />
          ))}
        </div>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  );
}

export function getSubjectsBooks() {
  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  }

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  }


  return (
    <>
      <div className='relative flex items-center bottom-row-margin' >
        <div
          id='slider'
          className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide'
        >
          {data.map((item) => (
            <img
              className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
              src={item.img}
              alt='/'
            />
          ))}
        </div>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
    </>
  );
}

