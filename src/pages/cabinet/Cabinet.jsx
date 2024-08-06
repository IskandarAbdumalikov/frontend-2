import React, { useState } from "react";
import "./cabinet.scss";
import userImg from "../../assets/user.svg";
import { BsBox2 } from "react-icons/bs";
import { AiOutlineIdcard } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { CiCreditCard2 } from "react-icons/ci";
import { RiVisaFill } from "react-icons/ri";

const Cabinet = () => {
  let [tab, setTab] = useState(1);
  return (
    <div className="cabinet container">
      <div className="cabinet__left">
        <div className="cabinet__left__card">
          <img width={70} height={70} src={userImg} alt="" />
          <div>
            <p>Здравствуйте,</p>
            <h3 style={{ fontSize: "18px"}}>
              Дмитрий Бондарчук
            </h3>
          </div>
        </div>
        <div
          onClick={() => setTab(1)}
          className={`cabinet__left__card ${tab === 1 ? "active" : ""}`}
        >
          <BsBox2 />
          <h3>Мои заказы</h3>
        </div>
        <div
          onClick={() => setTab(2)}
          className={`cabinet__left__card ${tab === 2 ? "active" : ""}`}
        >
          <AiOutlineIdcard />
          <h3>Моя информация</h3>
        </div>
        <div
          onClick={() => setTab(3)}
          className={`cabinet__left__card ${tab === 3 ? "active" : ""}`}
        >
          <IoHomeOutline />
          <h3>Адресная книга</h3>
        </div>
        <div
          onClick={() => setTab(4)}
          className={`cabinet__left__card ${tab === 4 ? "active" : ""}`}
        >
          <CiCreditCard2 />
          <h3>Способы оплаты</h3>
        </div>
      </div>
      <div className="cabinet__right">
        {tab === 1 ? (
          <div className="cabinet__right__cards">
            <div style={{ padding: "15px" }} className="cabinet__right__card">
              <h2>МОИ ЗАКАЗЫ</h2>
            </div>
            <div className="cabinet__right__card">
              <div className="cabinet__right__card__header">
                <div>
                  <h3>Заказ от 21 июня 2021 года</h3>
                  <p style={{ fontSize: "14px", color: "#618C78" }}>
                    38621264-0015
                  </p>
                </div>
                <p>489.000 Т, оплачено</p>
              </div>
              <div className="cabinet__right__card__body">
                <div className="cabinet__right__card__body__header">
                  <p>Статус заказа:</p> <span>Отправлен</span>
                </div>
                <div className="cabinet__right__card__body__body">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/1877/2933/3a98f65572c518d65fe59a64c0d0c4d2?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=goRAsYPHXPCp7aPr44ERA~jKWvUhpTYW47Beh58g2ceQ~qTIVW1QtTCzeioO163WnM829Y5voTfqByxWSscfwM-7qHLd1H86jJdS2UDYkoF9EKZ42UJWFR~-kmNaFdQ~zL4RB0QraHI~HKLTkVl2Ws7TDx8oCavskGqlPdnRmB~0mGhpJ8qdaek4KfjoShDGLFD8~TjmzT9aBF1Ju78XqAeL55-LWqTbDyv1NI87cm34pie~A~~qbx0HohmSgmvcsa-a4JKooh~eCZ97UeOqsgmlRhZAZvmt8GMz~b1SfckKJs0lhA2j8ksFMRMIM2LjrNFxL6GjQ1r04qtnhetoHQ__"
                    alt=""
                  />
                </div>
              </div>
              <div className="cabinet__right__card__footer">
                <h3>Дата доставки: 30 июня 2021</h3>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {tab === 2 ? (
          <div className="cabinet__right__cards">
            <div style={{ padding: "15px" }} className="cabinet__right__card">
              <h2>МОЯ ИНФОРМАЦИЯ</h2>
            </div>
            <div className="cabinet__right__card">
              <div className="input__group">
                <label htmlFor="name">Имя</label>
                <input id="name" value={"Дмитрий"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Фамилия</label>
                <input id="name" value={"Бондарчук"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Адрес электронной почты</label>
                <input id="name" value={"lokamnoka@gmail.com"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Номер телефона</label>
                <input id="name" value={"+7 952 721 16 21"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Дата Рождения:</label>
                <div className="date__selects">
                  <select name="" id="">
                    <option value="17">17</option>
                  </select>
                  <select name="" id="">
                    <option value="Январь">Январь</option>
                  </select>
                  <select name="" id="">
                    <option value="2001">2001</option>
                  </select>
                </div>
              </div>
              <div className="input__group">
                <button>Сохранить изменения</button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {tab === 3 ? (
          <div className="cabinet__right__cards">
            <div style={{ padding: "15px" }} className="cabinet__right__card">
              <h2>МОЯ ИНФОРМАЦИЯ</h2>
            </div>
            <div className="cabinet__right__card">
              <div className="input__group">
                <label htmlFor="name">Улица, номер дома, квартира</label>
                <input id="name" value={"Онежская 12, кв 98"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Город</label>
                <input id="name" value={"Атырау"} type="text" />
              </div>
              <div className="input__group">
                <label htmlFor="name">Регион</label>
                <select name="" id="">
                  <option value="Выберите регион">Выберите регион</option>
                </select>
              </div>
              <div className="input__group">
                <label htmlFor="name">Почтовый индекс</label>
                <input id="name" value={"628001"} type="text" />
              </div>
              <div className="input__group">
                <button
                  style={{
                    background: "#CB4A4A",
                    color: "white",
                    borderColor: "#CB4A4A",
                  }}
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {tab === 4 ? (
          <div className="cabinet__right__cards">
            <div style={{ padding: "15px" }} className="cabinet__right__card">
              <h2>СПОСОБЫ ОПЛАТЫ</h2>
              <button
                className="btn"
                style={{
                  background: "#CB4A4A",
                  color: "white",
                  borderColor: "#CB4A4A",
                }}
              >
                Добавить новую карту
              </button>
            </div>
            <div style={{ padding: "15px" }} className="cabinet__right__card">
              <p>
                <RiVisaFill />  Visa Debit (5993)
              </p>
              <p>Истекает 07/22</p>
              <p>Vyacheslav Dmitrishin</p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Cabinet;
