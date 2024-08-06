import React from "react";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  remove,
} from "../../context/slices/cartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SwiperProducts from "../../components/swiperProducts/SwiperProducts";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  let cartData = useSelector((state) => state.cart.value);
  let dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist.value);
  let navigate = useNavigate();

  return (
    <div className="cart container">
      <div className="cart__header">
        <h2>
          Корзина <sup>{cartData?.length}</sup>
        </h2>
      </div>
      <div className="cart__body">
        <table>
          <thead>
            <tr>
              <th>Название товара</th>
              <th>Цена за шт.</th>
              <th>Кол-во</th>
              <th>Итог</th>
              <th>buttons</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.map((item) => (
              <tr key={item.id}>
                <td className="cart__card">
                  <Link to={`/product/${item.id}`} className="cart__card__left">
                    {item.images && item.images[0] ? (
                      <img src={item.images[0]} alt="" />
                    ) : (
                      <img src="placeholder-image.png" alt="Placeholder" />
                    )}
                  </Link>
                  <div className="cart__card__right">
                    <h3>{item?.title}</h3>
                    <p>Код товара: BAL733 </p>
                    <p>Размер {item.size} см</p>
                    <span>
                      Частями по {(item?.price / 12).toFixed(2)} Т / мес
                    </span>
                  </div>
                </td>
                <td>{item.price} Т</td>
                <td>
                  <div className="cart__counter-btns">
                    <button
                      disabled={item.amount === 1}
                      onClick={() => dispatch(decreaseAmount(item))}
                    >
                      -
                    </button>
                    <span className="text-2xl">{item.amount}</span>
                    <button
                      disabled={item.amount === item.count}
                      onClick={() => dispatch(increaseAmount(item))}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.price * item.amount} Т</td>
                <td className="cart__buttons">
                  <button onClick={() => dispatch(remove(item))}>
                    <RiDeleteBinLine />
                  </button>
                  <button onClick={() => dispatch(toggleHeart(item))}>
                    {wishlistData.some((el) => el.id === item?.id) ? (
                      <FaHeart color="crimson" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sub__table">
          <h1>
            Итого: {cartData.reduce((a, b) => a + b.price * b.amount, 0)} Т
          </h1>
        </div>
        <div className="checkout__btns">
          <button onClick={() => navigate("/checkout")}>
            Перейти к оформлению
          </button>
          <button>Купить в рассрочку</button>
        </div>
        <div className="cart__body__bottom">
          <h3>Доставка от Bayan Sulu</h3>
        </div>
      </div>
      <div className="cart__bottom">
        <h1>Рекомендуем</h1>
        <SwiperProducts showHeader={false} />
      </div>
    </div>
  );
};

export default Cart;
