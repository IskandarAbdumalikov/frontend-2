import React from "react";
import "./home.scss";
import hero1 from "../../assets/hero1.svg";
import hero2 from "../../assets/hero2.svg";
import t from "../../assets/t.svg";
import { useGetProductsQuery } from "../../context/api/productApi";
import { Swiper, SwiperSlide } from "swiper/react";
import star from "../../assets/star.svg";
import halfStar from "../../assets/starHalf.svg";
import starRegular from "../../assets/starRegular.svg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SwiperProducts from "../../components/swiperProducts/SwiperProducts";
import { Skeleton } from "@mui/material";

const Home = () => {
  const { data, isLoading, isFetching } = useGetProductsQuery();
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist.value);

  const getRating = (rating) => {
    const res = [];
    for (let i = 0; i < Math.trunc(rating); i++) {
      res.push(<img width={16} src={star} alt="" key={`full-${i}`} />);
    }
    if (rating % 1 > 0.4) {
      res.push(<img width={16} src={halfStar} alt="" key={`half`} />);
    }
    for (let i = Math.round(rating); i < 5; i++) {
      res.push(<img width={16} src={starRegular} alt="" key={`empty-${i}`} />);
    }
    return res;
  };

  return (
    <div className="home">
      <div className="hero__wrapper">
        <div className="container hero">
          <div className="hero__left">
            <h1>Новая коллекция ковров Venetta</h1>
            <button>Смотреть все</button>
          </div>
          <div className="hero__right">
            <img src={hero1} alt="" />
            <img src={hero2} alt="" />
          </div>
          <div className="hero__right-media">
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="mySwiper"
              loop={true}
            >
              <SwiperSlide>
                <img src={hero1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={hero2} alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <SwiperProducts showHeader={true} />
      <div className="home__products container">
        <div className="new__cards">
          <div className="new__cards__header">
            <h2>Скидки</h2>
            <Link>Все скидки</Link>
          </div>
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              570: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 40 },
              1200: { slidesPerView: 4, spaceBetween: 50 },
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {isLoading || isFetching
              ? Array.from(new Array(6)).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={210}
                    height={300}
                    style={{ borderRadius: "10px" }}
                    className="new__cards__item__skeleton"
                  />
                ))
              : data
                  ?.filter((el) => el.status === "discount")
                  .map((item) => (
                    <SwiperSlide className="new__cards__item" key={item.id}>
                      <div className="new__cards__item__img">
                        <div className="new__cards__item__btns">
                          <span>-20%</span>
                          <button onClick={() => dispatch(toggleHeart(item))}>
                            {wishlistData.some((el) => el.id === item.id) ? (
                              <FaHeart color="crimson" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>
                        </div>
                        <Link to={`/product/${item.id}`}>
                          <img src={item.images[0]} alt={item.title} />
                        </Link>
                      </div>
                      <div className="new__cards__item__info">
                        <h3>{item.title}</h3>
                        <p>Размер: {item.size}</p>
                        <p>Производитель: {item.madePlace}</p>
                        <div className="rating">
                          <div className="rating__stars">
                            {getRating(item.rating)}
                          </div>
                          <p>{item.comments?.length} отзывов</p>
                        </div>
                        <div className="price__titles">
                          <p className="sena">Старая цена</p>
                          <p className="sena">Новая цена</p>
                        </div>
                        <div className="prices">
                          <h3 style={{ textDecoration: "line-through" }}>
                            <span>{item.oldPrice}</span> <img src={t} alt="" />
                          </h3>
                          <h3>
                            <span>{item.price}</span> <img src={t} alt="" />
                          </h3>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
