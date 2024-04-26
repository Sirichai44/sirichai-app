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
import { CertificateList, SkillList } from '@/hook/List';
const Carousol = () => {
  const [firstSwiper, setFirstSwiper] = useState(null);
  const [secondSwiper, setSecondSwiper] = useState(null);
  const certi = CertificateList();
  const skills = SkillList();
  return (
    <div className="w-2/6 overflow-x-hidden border border-blue-400">
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
        {skills.slice(0, 6).map((skill) => (
          <SwiperSlide key={skill.id}>
            <div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md dark:bg-zinc-800 bg-zinc-200 bg-opacity-70">
                <img src={skill.source} style={{ height: 40, width: 40 }} />
              </div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md dark:bg-zinc-800 bg-zinc-200 bg-opacity-70">
                <img src={skill.source} style={{ height: 40, width: 40 }} />
              </div>
              <div className="flex items-center justify-center w-16 h-16 rounded-full shadow-md dark:bg-zinc-800 bg-zinc-200 bg-opacity-70">
                <img src={skill.source} style={{ height: 40, width: 40 }} />
              </div>
            </div>
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
