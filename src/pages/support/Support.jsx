import React from "react";
import "./support.scss";
import { BsTruck } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { GrReturn } from "react-icons/gr";

const Support = () => {
  const supportData = [
    {
      id: 1,
      logo: <BsTruck />,
      title: "Доставка",
      desc: "Регионы доставки в Казахстане. Сроки и условия. Стоимость доставки ковровых изделий.",
    },
    {
      id: 2,
      logo: <MdOutlineAccountBalanceWallet />,
      title: "Оплата",
      desc: "Способы покупки. Информация об оплате. Ковры в рассрочку.Банки-партнеры.",
    },
    {
      id: 3,
      logo: <GrReturn />,
      title: "Возвраты",
      desc: "Информация про возвраты. Как быстро вернуть товар? Товары не подлежащие возврату",
    },
  ];
  return (
    <div className="container support">
      <div className="support__header">
        <h2>Центр поддержки</h2>
      </div>
      <div className="support__cards">
        {supportData.map((item) => (
          <div className="support__card" key={item.id}>
            <div className="support__card__logo">
              {item.logo} <h3>{item.title}</h3>
            </div>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;
