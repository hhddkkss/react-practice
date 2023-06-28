import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/carousel.css";

// import required modules
import { Navigation, Pagination, Autoplay } from "swiper";

function Carousel() {
  const slidesImg = [
    "https://picsum.photos/id/217/1920/600",
    "https://picsum.photos/id/227/1920/600",
    "https://picsum.photos/id/137/1920/600",
    "https://picsum.photos/id/127/1920/600",
    "https://picsum.photos/id/117/1920/600",
    "https://picsum.photos/id/119/1920/600",
  ];

  return (
    <Swiper
      pagination={{
        dynamicBullets: true, // 動態的pagination
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false, //設置為false 並且在用戶後不會自動播放
      }}
      loop={true} //是否可以循環 最後一張 => 第一張
      navigation={true} // navigation bar
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper"
    >
      {slidesImg.map((v, i) => (
        <SwiperSlide key={i}>
          <img src={v} alt="dog" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
