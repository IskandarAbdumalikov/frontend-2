import React, { useEffect, useState } from "react";
import "./singlePage.scss";
import { useGetProductByIdQuery } from "../../context/api/productApi";
import { Link, useParams } from "react-router-dom";
import star from "../../assets/star.svg";
import halfStar from "../../assets/starHalf.svg";
import starRegular from "../../assets/starRegular.svg";
import returnImg from "../../assets/return.svg";
import truck from "../../assets/truck.svg";
import installment from "../../assets/installment.svg";
import t from "../../assets/t.svg";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  add,
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import { IoLogoWhatsapp } from "react-icons/io";
import SwiperProducts from "../../components/swiperProducts/SwiperProducts";

const SinglePage = () => {
  let { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  let [index, setIndex] = useState(0);
  let [tab, setTab] = useState(1);
  let { data } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.value);
  const wishlistData = useSelector((state) => state.wishlist.value);
  const selectedData = cartData.find((product) => product.id === data?.id);

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

  return (
    <div className="single-page container">
      <div className="single-page__header">
        <h2>{data?.title}</h2>
        <div className="single-page__header__bottom">
          <div className="single-page__header__bottom__left">
            <div className="stars">{getRating(data?.rating)}</div>
            <span>{data?.comments?.length} отзывов</span>
            <p>В наличии: {data?.count} штук</p>
          </div>
          <p className="single-page__header__bottom__right">
            Код товара: BAL733
          </p>
        </div>
      </div>
      <div className="single-page__middle">
        <div className="single-page__middle__left">
          <div className="small__images">
            {data?.images?.map((img, i) => (
              <img
                src={img}
                alt=""
                key={i}
                onClick={() => setIndex(i)}
                className={i === index ? "active" : ""}
              />
            ))}
          </div>
          <div className="main__image">
            <img src={data?.images[index]} alt="" />
          </div>
        </div>
        <div className="single-page__middle__right">
          <div className="prices">
            <div className="price">
              <p>Цена:</p>
              <h3>
                <span>{data?.price}</span> <img src={t} alt="" />
              </h3>
            </div>
            <div className="per-month__price">
              <p>В рассрочку :</p>
              <h3>
                <span>{(data?.price / 12)?.toFixed(2)}</span>{" "}
                <img src={t} alt="" />
              </h3>
            </div>
          </div>
          <div className="sizes">
            <p>
              Размер: <span>{data?.size}</span>
            </p>
            <p>
              Количество:{" "}
              <div className="counter-btns">
                {!selectedData ? (
                  <button
                    className="add-to-cart"
                    onClick={() => dispatch(add(data))}
                  >
                    +cart
                  </button>
                ) : (
                  <>
                    {selectedData.amount === 1 ? (
                      <button onClick={() => dispatch(remove(selectedData))}>
                        -
                      </button>
                    ) : (
                      <button
                        onClick={() => dispatch(decreaseAmount(selectedData))}
                      >
                        -
                      </button>
                    )}
                    <span>{selectedData.amount}</span>
                    <button
                      onClick={() => dispatch(increaseAmount(selectedData))}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </p>
          </div>
          <div className="sizes">
            <p className="p">Перейти к описанию</p>
            <p className="p">Подробнее о рассрочке</p>
          </div>
          <div className="single__btns">
            <div className="counter-btns">
              {!selectedData ? (
                <button
                  className="add-to-cart"
                  onClick={() => dispatch(add(data))}
                >
                  +cart
                </button>
              ) : (
                <>
                  {selectedData.amount === 1 ? (
                    <button onClick={() => dispatch(remove(selectedData))}>
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(decreaseAmount(selectedData))}
                    >
                      -
                    </button>
                  )}
                  <span>{selectedData.amount}</span>
                  <button
                    onClick={() => dispatch(increaseAmount(selectedData))}
                  >
                    +
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => dispatch(toggleHeart(data))}
              className="single__wishlist-btn"
            >
              {wishlistData.some((el) => el.id === data?.id) ? (
                <FaHeart color="crimson" />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
          <div className="delivery__card">
            <p>
              <img src={returnImg} alt="" />
              <span>Возврат в течение 14 дней</span>
            </p>
            <p>
              <img src={truck} alt="" />
              <span>Среднее время доставки 2.5 дня</span>
            </p>
            <Link>Подробнее</Link>
          </div>
          <h3>
            Нужна помощь с выбором? Просто напишите нам в WhatsApp и мы
            обязательно вам поможем!
          </h3>
          <button className="write-btn">
            <IoLogoWhatsapp />
            <span>Написать</span>
          </button>
        </div>
      </div>
      <div className="single-page__bottom">
        <div className="single-page__bottom__header">
          <button
            className={tab === 1 ? "active" : ""}
            onClick={() => setTab(1)}
          >
            Характеристики
          </button>
          <button
            className={tab === 2 ? "active" : ""}
            onClick={() => setTab(2)}
          >
            Купить в рассрочку
          </button>
          <button
            className={tab === 3 ? "active" : ""}
            onClick={() => setTab(3)}
          >
            Отзывы
          </button>
          <button
            className={tab === 4 ? "active" : ""}
            onClick={() => setTab(4)}
          >
            Написать отзыв
          </button>
        </div>
        <div className="single-page__bottom__body">
          {tab === 1 ? (
            <div className="single-page__bottom__body__information">
              <div>
                <h3>Материал</h3>
                <p>Бамбук</p>
              </div>
              <div>
                <h3>Толщина</h3>
                <p>{data?.length}</p>
              </div>
              <div>
                <h3>Вес</h3>
                <p>{data?.weight}</p>
              </div>
              <div>
                <h3>Плотность</h3>
                <p>{data?.size} узлов/м²</p>
              </div>
              <div>
                <h3>Производитель</h3>
                <p>Yusuf Hali</p>
              </div>
              <div>
                <h3>Страна</h3>
                <p>{data?.madePlace}</p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {tab === 2 ? (
            <div className="single-page__bottom__body__installment">
              <h3>Купить в рассрочку Kaspi</h3>
              <img src={installment} alt="" />
            </div>
          ) : (
            <></>
          )}
          {tab === 3 ? (
            <div className="single-page__bottom__body__comments">
              {data?.comments?.map((comment) => (
                <div className="comment" key={comment.commentId}>
                  <div>
                    <p>{comment.writer}</p>
                    <div className="stars">
                      {getRating(comment.commentRating)}
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
          {tab === 4 ? (
            <div className="single-page__bottom__body__write-comment">
              <h2>Написать отзыв</h2>
              <form action="">
                <input type="text" />
                <button>send</button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="swiper__products">
        <h2>Вам может понравиться</h2>
        <SwiperProducts showHeader={false} />
      </div>
    </div>
  );
};

export default SinglePage;
