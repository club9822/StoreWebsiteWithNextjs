import React, { useCallback } from 'react';
import { useDispatchTheme, useTheme } from "@/context/Theme.Context";
import { CHANGE_THEME, ITheme } from "@/context/Theme.types";
import dynamic from 'next/dynamic';
import SwiperCore, {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as gtag from '@/lib/gtag';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import { wrapper } from "@/redux/ReduxStore";

SwiperCore.use([Pagination, Navigation, A11y]);
const A = () => (<div style={{ height: '400px', width: '280px', backgroundColor: 'red' }}>{`${Math.random() * 1000}s`}</div>);
export default function Profile() {
  const themeState = useTheme();
  const themeDispatch = useDispatchTheme();
  const toggleTheme = useCallback(() => {
    themeDispatch({
      type: CHANGE_THEME,
      payload: { theme: themeState.theme === ITheme.White ? ITheme.Dark : ITheme.White },
    });

    /**
       * google analytics
       */

    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: 'message 111',
    });
  }, [themeState.theme]);
  return (
    <div className="container">
      <button onClick={toggleTheme}>Toggle theme</button>
      <p className={themeState.theme == ITheme.Dark ? 'dark' : 'white'}>{themeState.theme}</p>

      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide><A /></SwiperSlide>
        <SwiperSlide><A /></SwiperSlide>

        <SwiperSlide><A /></SwiperSlide>
        <SwiperSlide><A /></SwiperSlide>
        <SwiperSlide><A /></SwiperSlide>
        <SwiperSlide><A /></SwiperSlide>
      </Swiper>
      <style jsx>
        {`
        .dark{
        background: black;
        }
        .white{
        background: #0070f3;
        }
        p{
        color: aliceblue;
        }
      `}
      </style>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  const { store } = ctx;
  // store.dispatch(tickClock(false))
  return {
    props: { },
  };
});
