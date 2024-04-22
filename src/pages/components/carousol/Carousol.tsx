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
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
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
        modules={[Pagination, Navigation, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        loop={true}
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        }}
        className="swiper_container"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}>
        {certi.slice(0, 6).map((cer) => (
          <SwiperSlide key={cer.id}>
            <img
              src={cer.source}
              className="object-contain w-full h-full mb-3 cursor-pointer"
              alt="Certificate"
            />
          </SwiperSlide>
        ))}

        {/* <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ArrowCircleLeftRoundedIcon className="prev" />
          </div>

          <div className="swiper-button-next slider-arrow">
            <ArrowCircleRightRoundedIcon className="next" />
          </div>
        </div> */}
      </Swiper>
    </div>
  );
};

export default Carousol;
