// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Thumbs,
  EffectCoverflow,
  Autoplay
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from 'react';
import { CertificateList } from '@/hook/List';
const Carousol = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const certi = CertificateList();
  return (
    <div className="overflow-x-hidden border border-blue-400 w-96">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        {certi.slice(0, 6).map((cer) => (
          <SwiperSlide key={cer.id}>
            <img
              src={cer.source}
              className="object-contain w-full h-full mb-3 cursor-pointer"
              alt="Certificate"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousol;
