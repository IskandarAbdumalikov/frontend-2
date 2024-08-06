import React, { useState } from "react";
import "./checkout.scss";
import { useDispatch, useSelector } from "react-redux";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Ensure you have this for navigation
import { removeAll } from "../../context/slices/cartSlice";
import { toast } from "react-toastify";

const BOT_TOKEN = "7177289161:AAHsDSL97FVQ4fn-YiMr9oWa9udUems4nvU";
const CHAT_ID = "-1002195368941,";

const Checkout = () => {
  const cartData = useSelector((state) => state.cart.value);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    comment: "",
    method: "Доставка",
  });
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.firstName.trim() &&
      !formData.lastName.trim() &&
      !formData.phone.trim() &&
      !formData.email.trim()
    ) {
      toast.error("Заполните все поля");
      return;
    }

    let text = `Checkout Info %0A`;
    text += `First Name: ${formData.firstName} %0A`;
    text += `Last Name: ${formData.lastName} %0A`;
    text += `Phone: ${formData.phone} %0A`;
    text += `Email: ${formData.email} %0A`;
    text += `Comment: ${formData.comment} %0A`;
    text += `Method: ${formData.method} %0A`;

    cartData.forEach((item, index) => {
      text += `Product ${index + 1}: ${item.title} - ${item.price} Т x ${
        item.amount
      } %0A`;
    });

    const totalAmount = cartData.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );
    text += `Total Amount: ${totalAmount.toFixed(2)} Т %0A`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    const api = new XMLHttpRequest();
    api.open("GET", url, true);
    api.send();
    dispatch(removeAll());
    toast.success("Заказ успешно оформлен!");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMethodChange = (method) => {
    setFormData({
      ...formData,
      method,
    });
  };

  return (
    <div className="checkout container">
      <div className="checkout__header">
        <h1>Оформление заказа</h1>
      </div>
      <div className="checkout__body">
        <div className="checkout__body__left">
          <div className="checkout__body__left__top">
            <h2>Введите ваши данные</h2>
            <form
              className="checkout__body__left__top__bottom"
              onSubmit={handleSubmit}
            >
              <div className="checkout__body__left__top__bottom__top">
                <input
                  placeholder="Ваше имя"
                  type="text"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="Ваша фамилия"
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="+7 (___) ___ - ___ - ___"
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <input
                  placeholder="Ваш email"
                  type="text"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <textarea
                placeholder="Комментарий к заказу"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
              ></textarea>
            </form>
          </div>
          <div className="checkout__body__left__bottom">
            <h2>Выберите способ получения товара</h2>
            <div className="checkout__body__left__bottom__btns">
              <button
                onClick={() => handleMethodChange("Доставка")}
                className={formData.method === "Доставка" ? "active" : ""}
              >
                Доставка
              </button>
              <button
                onClick={() => handleMethodChange("Самовывоз")}
                className={formData.method === "Самовывоз" ? "active" : ""}
              >
                Самовывоз
              </button>
            </div>
            <h2>Нет сохраненных адресов</h2>
            <button>Выбрать адрес доставки</button>
          </div>
        </div>
        <div className="checkout__body__right">
          <div className="checkout__body__right__top">
            <div>
              <h3>Ваш заказ</h3>
            </div>
            {cartData?.map((item) => (
              <div className="checkout__body__right__top__info" key={item.id}>
                <h3>{item.title}</h3>
                <h3>{item.amount}</h3>
                <h3>{(item.price * item.amount).toFixed(2)} Т</h3>
              </div>
            ))}
            <div className="checkout__body__right__top__info">
              <h3>Сумма заказа</h3>
              <h3>
                {cartData
                  .reduce((a, b) => a + b.price * b.amount, 0)
                  .toFixed(2)}{" "}
                Т
              </h3>
            </div>
            <div className="checkout__body__right__top__info">
              <h3>Доставка</h3>
              <h3 style={{ color: "#618C78" }}>Бесплатно</h3>
            </div>
            <div className="checkout__body__right__top__info">
              <h3>Итого к оплате:</h3>
              <h3>
                {" "}
                {cartData
                  .reduce((a, b) => a + b.price * b.amount, 0)
                  .toFixed(2)}{" "}
                Т
              </h3>
            </div>
            <button
              className="checkout__body__right__top__btn"
              onClick={handleSubmit}
            >
              Оплатить онлайн
            </button>
          </div>
          <div className="checkout__body__right__bottom">
            <div className="checkout__body__right__bottom__card">
              <h3>% Промокод или сертификат</h3>{" "}
              <span
                onClick={() => setShowForm(!showForm)}
                style={{ cursor: "pointer", color: "#618C78" }}
              >
                {showForm ? <FaMinusCircle /> : <FaPlusCircle />}
              </span>
            </div>
            {showForm && (
              <form action="">
                <input type="text" placeholder="Введите код" />
                <button>Применить промокод</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
