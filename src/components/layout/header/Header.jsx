import React, { useState } from "react";
import "./header.scss";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import x from "../../../assets/x.svg";
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineShoppingCart } from "react-icons/md";
import {
  Modal,
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchResults from "./SearchResults";
import { useGetProductsQuery } from "../../../context/api/productApi";
import HeaderSearch from "./HeaderSearch";
import { useSelector } from "react-redux";
import { GrHomeRounded } from "react-icons/gr";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Алматы");
  const [searchCountries, setSearchCountries] = useState("");
  const [search, setSearch] = useState("");
  const [cities] = useState([
    "Алматы",
    "Нур-Султан",
    "Шымкент",
    "Караганда",
    "Актобе",
    "Тараз",
    "Павлодар",
    "Усть-Каменогорск",
    "Семей",
  ]);
  let { data,isError } = useGetProductsQuery({ search });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    handleClose();
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchCountries.toLowerCase())
  );

  let cartData = useSelector((state) => state.cart.value);
  let wishlistData = useSelector((state) => state.wishlist.value);

  return (
    <>
      <header className="header__wrapper">
        <div className="header container">
          {" "}
          <nav className="header__top">
            <div className="header__top__left">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <a href="#" onClick={handleOpen}>
                <span>
                  <IoLocationOutline />
                </span>
                <span>{selectedCity}</span>
              </a>
            </div>
            <form className="header__top__middle">
              <div className="input">
                <input
                  value={search}
                  placeholder="Поиск по товарам"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search.trim() ? (
                  <button onClick={() => setSearch("")}>
                    <ImCancelCircle />
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <button>
                <CiSearch />
              </button>
              {search.trim() ? (
                <SearchResults isError={isError} setSearch={setSearch} data={data} />
              ) : (
                <></>
              )}
            </form>
            <div className="header__top__right">
              <Link style={{ fontSize: "20px" }} to="/login">
                <FaRegUserCircle />
              </Link>
              <Link style={{ fontSize: "20px" }} to="/wishlist">
                <FaRegHeart />
                <sup>{wishlistData ? wishlistData.length : 0}</sup>
              </Link>
              <Link style={{ fontSize: "20px" }} to="/cart">
                <MdOutlineShoppingCart />
                <sup>{cartData ? cartData.length : 0}</sup>
              </Link>
            </div>
          </nav>
          <nav className="header__bottom">
            <Link to="/catalog/Ковры">Ковры</Link>
            <Link to="/catalog/Коврики">Коврики</Link>
            <Link to="/catalog/Дляванной">Для ванной</Link>
            <Link to="/catalog/Дорожки">Дорожки</Link>
            <Link to="/catalog/Особенныековры">Особенные ковры</Link>
            <Link to="/support">Центр поддержки</Link>
            {/* <Link to="/catalog/Ковры">Контакты</Link> */}
          </nav>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box">
            <TextField
              label="Найти город"
              variant="outlined"
              fullWidth
              value={searchCountries}
              onChange={(e) => setSearchCountries(e.target.value)}
            />
            <List>
              {filteredCities.map((city) => (
                <ListItem
                  button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                >
                  <ListItemText primary={city} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Modal>
      </header>
      <header className="container header-media">
        <div className="header-media__top">
          <div>
            {" "}
            <button onClick={() => setShowList(true)} className="bar">
              <FaBars />
            </button>
            <Link>
              <img src={logo} alt="" />
            </Link>
          </div>
          <button onClick={() => setShowSearch(true)} className="search-btn">
            <CiSearch />
            <span>Поиск</span>
          </button>
        </div>
        <div
          className={
            showList ? "header-media__middle show" : "header-media__middle"
          }
        >
          <div>
            <NavLink onClick={() => setShowList(false)} to="/">
              Главная
            </NavLink>
            <button onClick={() => setShowList(false)}>
              <img src={x} alt="" />
            </button>
          </div>
          <Link onClick={() => setShowList(false)} to="/catalog/Ковры">
            Ковры
          </Link>
          <Link onClick={() => setShowList(false)} to="/catalog/Коврики">
            Коврики
          </Link>
          <Link onClick={() => setShowList(false)} to="/catalog/Дляванной">
            Для ванной
          </Link>
          <Link onClick={() => setShowList(false)} to="/catalog/Дорожки">
            Дорожки
          </Link>
          <Link onClick={() => setShowList(false)} to="/catalog/Особенныековры">
            Особенные ковры
          </Link>
          <Link onClick={() => setShowList(false)} to="/support">
            Центр поддержки
          </Link>
          <NavLink onClick={() => setShowList(false)} to="/login">
            Вход / Регистрация
          </NavLink>
          <div className="country">
            <a href="#">
              <span>{selectedCity}</span>
            </a>
            <p onClick={handleOpen}>Изменить</p>
          </div>
        </div>
        <div className="header-media__bottom">
          <Link style={{ fontSize: "25px" }} to="/">
            <GrHomeRounded />
          </Link>
          <Link style={{ fontSize: "25px" }} to="/wishlist">
            <FaRegHeart />
            <sup>{wishlistData ? wishlistData.length : 0}</sup>
          </Link>
          <Link style={{ fontSize: "25px" }} to="/cart">
            <MdOutlineShoppingCart />
            <sup>{cartData ? cartData.length : 0}</sup>
          </Link>
          <Link style={{ fontSize: "25px" }} to="/login">
            <FaRegUserCircle />
          </Link>
        </div>
        {showList ? (
          <div onClick={() => setShowList(false)} className="overlay"></div>
        ) : (
          <></>
        )}
        {showSearch ? (
          <HeaderSearch
            setShowSearch={setShowSearch}
            search={search}
            setSearch={setSearch}
            data={data}
          />
        ) : (
          <></>
        )}
      </header>
    </>
  );
};

export default Header;
