import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Banner() {
    return (
        <Swiper modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1} loop={true} 
            autoplay={{ delay: 3000, disableOnInteraction: false }} 
            pagination={{ clickable: true }}
            navigation={true} className='banner_container'>
            
            <SwiperSlide>
                <img src="/banner1.jpg" alt="" className='banner_img'/>
            </SwiperSlide>
            
            <SwiperSlide>
                <img src="/banner4.jpg" alt="" className='banner_img'/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="/banner3.jpg" alt="" className='banner_img'/>
            </SwiperSlide>
        </Swiper>
    )
}

export default Banner;