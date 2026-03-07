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
            navigation={true} style={{width: '80%'}}>
            
            <SwiperSlide>
                <img src="/banner1.jpg" alt="" style={{width: "100%", height: '320px', objectFit: 'cover'}}/>
            </SwiperSlide>
            
            <SwiperSlide>
                <img src="/banner4.jpg" alt="" style={{width: "100%", height: '320px', objectFit: 'cover'}}/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="/banner3.jpg" alt="" style={{width: "100%", height: '320px', objectFit: 'cover'}}/>
            </SwiperSlide>
        </Swiper>
    )
}

export default Banner;