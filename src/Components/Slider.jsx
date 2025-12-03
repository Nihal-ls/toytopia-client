import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLoaderData } from "react-router";


const Slider = () => {
    const data = useLoaderData()
    console.log(data)
    const sliderdata = data.slice(7, 13)
    console.log(sliderdata)
    return (
        <div className="w-full sm:w-4/4 md:max-w-7xl lg:max-w-7xl  mx-auto my-10">
          <h1 className="text-center text-3xl font-bold">New Arrivals</h1>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
            >
                <div className="bg-pink-200 h-48 flex items-center justify-center text-xl font-bold">
                    {
                        sliderdata.map(toy => <SwiperSlide>
                            <img className="h-[250px] mx-auto" src={toy.pictureURL} />

                        </SwiperSlide>)
                    }
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;

