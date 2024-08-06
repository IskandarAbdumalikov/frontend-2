import React, { useState, useEffect } from "react";
import "./footer.scss";
import { Link } from "react-router-dom";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { MdOutlineMail, MdOutlineMailOutline } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const [toggleState, setToggleState] = useState({
    catalog: false,
    account: false,
    support: false,
    contacts: false,
    newsletter: false,
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLinks = (section) => {
    setToggleState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <footer>
      <div className="footer container">
        <ul>
          <h3 onClick={() => isMobile && toggleLinks("catalog")}>
            Каталог товаров {isMobile && (toggleState.catalog ? "-" : "+")}
          </h3>
          {(toggleState.catalog || !isMobile) && (
            <>
              <Link>Ковры</Link>
              <Link>Коврики</Link>
              <Link>Дорожки</Link>
              <Link>Для ванной</Link>
              <Link>Особенные ковры</Link>
            </>
          )}
        </ul>
        <ul>
          <h3 onClick={() => isMobile && toggleLinks("account")}>
            Личный кабинет {isMobile && (toggleState.account ? "-" : "+")}
          </h3>
          {(toggleState.account || !isMobile) && (
            <>
              <Link>Личный кабинет</Link>
              <Link>Мои заказы</Link>
              <Link>Избранное</Link>
            </>
          )}
        </ul>
        <ul>
          <h3 onClick={() => isMobile && toggleLinks("support")}>
            Центр поддержки {isMobile && (toggleState.support ? "-" : "+")}
          </h3>
          {(toggleState.support || !isMobile) && (
            <>
              <Link>Контакты</Link>
              <Link>Доставка</Link>
              <Link>Возвраты</Link>
            </>
          )}
        </ul>
        <ul>
          <h3 onClick={() => isMobile && toggleLinks("contacts")}>
            Помощь и контакты {isMobile && (toggleState.contacts ? "-" : "+")}
          </h3>
          {(toggleState.contacts || !isMobile) && (
            <>
              <Link>
                <FaPhone /> +7 775 657 66 76
              </Link>
              <Link>
                <MdOutlineMailOutline /> info@kilem.kz
              </Link>
              <div className="socials">
                <a href="https://web.whatsapp.com/">
                  <IoLogoWhatsapp />
                </a>
                <a href="https://www.instagram.com/">
                  <RiInstagramFill />
                </a>
                <a href="https://www.facebook.com/">
                  <FaFacebook />
                </a>
              </div>
            </>
          )}
        </ul>
        <ul>
          <h3 onClick={() => isMobile && toggleLinks("newsletter")}>
            Рассылка {isMobile && (toggleState.newsletter ? "-" : "+")}
          </h3>
          {(toggleState.newsletter || !isMobile) && (
            <>
              <p>
                Подпишитесь, чтобы всегда <br /> быть в курсе наших новых акций
              </p>
              <form action="">
                <input placeholder="Ваш email" type="text" />
                <button>
                  <MdOutlineMail />
                </button>
              </form>
            </>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
