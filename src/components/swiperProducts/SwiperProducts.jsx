import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "./swiperProducts.scss";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../context/api/productApi";
import t from "../../assets/t.svg";
import tWhite from "../../assets/tWhite.svg";
import star from "../../assets/star.svg";
import halfStar from "../../assets/starHalf.svg";
import starRegular from "../../assets/starRegular.svg";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import {
  add,
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import { Skeleton } from "@mui/material";

const SwiperProducts = ({ showHeader, isWishlist }) => {
  let { data: mainData, isLoading } = useGetProductsQuery();

  const getRating = (rating) => {
    let res = [];
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

  let dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist.value);
  const cartData = useSelector((state) => state.cart.value);

  let data = isWishlist ? wishlistData : mainData;
  console.log(data);

  return (
    <div className="home__products container">
      <div className="new__cards">
        {showHeader && (
          <div className="new__cards__header">
            <h2>Новые поступления</h2>
            <Link to="/products">Смотреть все</Link>
          </div>
        )}
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            570: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {isLoading
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
            : isWishlist
            ? data.map((item) => {
                const selectedData = cartData.find(
                  (product) => product.id === item.id
                );
                return (
                  <SwiperSlide className="new__cards__card" key={item.id}>
                    <div className="new__cards__item">
                      <div className="new__cards__item__img">
                        <div className="new__cards__item__btns">
                          <span>Новинка</span>
                          <button onClick={() => dispatch(toggleHeart(item))}>
                            {wishlistData.some((el) => el.id === item.id) ? (
                              <FaHeart color="crimson" />
                            ) : (
                              <FaRegHeart />
                            )}
                          </button>
                        </div>
                        <Link to={`/product/${item.id}`}>
                          <img src={item.images[0]} />
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
                          <p className="sena">Цена</p>
                          <p className="sena">В рассрочку</p>
                        </div>
                        <div className="prices">
                          <h3>
                            <span>{item.price}</span> <img src={t} alt="" />
                          </h3>
                          <span>
                            <span>
                              {(item.price / 12)?.toFixed(2)}{" "}
                              <img src={tWhite} alt="" />
                            </span>{" "}
                            х 12 мес
                          </span>
                        </div>
                      </div>
                    </div>
                    {isWishlist && (
                      <div className="counter-btns">
                        {!selectedData ? (
                          <button
                            className="add-to-cart"
                            onClick={() => dispatch(add(item))}
                          >
                            В корзину
                          </button>
                        ) : (
                          <>
                            {selectedData.amount === 1 ? (
                              <button
                                className="remove-from-cart"
                                onClick={() => dispatch(remove(selectedData))}
                              >
                                -
                              </button>
                            ) : (
                              <button
                                className="remove-from-cart"
                                onClick={() =>
                                  dispatch(decreaseAmount(selectedData))
                                }
                              >
                                -
                              </button>
                            )}
                            <span>{selectedData.amount}</span>
                            <button
                              className="remove-from-cart"
                              onClick={() =>
                                dispatch(increaseAmount(selectedData))
                              }
                            >
                              +
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </SwiperSlide>
                );
              })
            : data
                ?.filter((el) => el.status === "new")
                .map((item) => {
                  const selectedData = cartData.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <SwiperSlide className="new__cards__card" key={item.id}>
                      <div className="new__cards__item">
                        <div className="new__cards__item__img">
                          <div className="new__cards__item__btns">
                            <span>Новинка</span>
                            <button onClick={() => dispatch(toggleHeart(item))}>
                              {wishlistData.some((el) => el.id === item.id) ? (
                                <FaHeart color="crimson" />
                              ) : (
                                <FaRegHeart />
                              )}
                            </button>
                          </div>
                          <Link to={`/product/${item.id}`}>
                            <img src={item.images[0]} />
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
                            <p className="sena">Цена</p>
                            <p className="sena">В рассрочку</p>
                          </div>
                          <div className="prices">
                            <h3>
                              <span>{item.price}</span> <img src={t} alt="" />
                            </h3>
                            <span>
                              <span>
                                {(item.price / 12)?.toFixed(2)}{" "}
                                <img src={tWhite} alt="" />
                              </span>{" "}
                              х 12 мес
                            </span>
                          </div>
                        </div>
                      </div>
                      {isWishlist && (
                        <div className="counter-btns">
                          {!selectedData ? (
                            <button
                              className="add-to-cart"
                              onClick={() => dispatch(add(item))}
                            >
                              В корзину
                            </button>
                          ) : (
                            <>
                              {selectedData.amount === 1 ? (
                                <button
                                  className="remove-from-cart"
                                  onClick={() => dispatch(remove(selectedData))}
                                >
                                  -
                                </button>
                              ) : (
                                <button
                                  className="remove-from-cart"
                                  onClick={() =>
                                    dispatch(decreaseAmount(selectedData))
                                  }
                                >
                                  -
                                </button>
                              )}
                              <span>{selectedData.amount}</span>
                              <button
                                className="remove-from-cart"
                                onClick={() =>
                                  dispatch(increaseAmount(selectedData))
                                }
                              >
                                +
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </SwiperSlide>
                  );
                })}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperProducts;
