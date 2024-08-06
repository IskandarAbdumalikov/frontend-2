import React, { useEffect, useState } from "react";
import "./catalog.scss";
import { useGetProductsQuery } from "../../context/api/productApi";
import {
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
} from "@mui/material";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toggleHeart } from "../../context/slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import star from "../../assets/star.svg";
import halfStar from "../../assets/starHalf.svg";
import starRegular from "../../assets/starRegular.svg";
import t from "../../assets/t.svg";
import tWhite from "../../assets/tWhite.svg";

const Catalog = () => {
  let { category } = useParams();
  console.log("Category from URL:", category);

  if (category === "Дляванной") {
    category = "Дляванной";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const { data, error, isLoading } = useGetProductsQuery({ category });

  console.log("Fetched Data:", data);
  console.log("Error:", error);
  console.log("Is Loading:", isLoading);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState([0, 5]);
  const [count, setCount] = useState([0, 10]);
  const [selectedMadePlaces, setSelectedMadePlaces] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleCountChange = (event, newValue) => {
    setCount(newValue);
  };

  const handleCheckboxChange = (setter) => (event) => {
    const { name, checked } = event.target;
    setter((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  const handleResetFilters = () => {
    setPriceRange([0, 1000]);
    setRating([0, 5]);
    setCount([0, 10]);
    setSelectedMadePlaces([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.wishlist.value);

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

  const filteredProducts = data?.filter((product) => {
    const passesPriceFilter =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const passesRatingFilter =
      product.rating >= rating[0] && product.rating <= rating[1];
    const passesCountFilter =
      product.count >= count[0] && product.count <= count[1];
    const passesMadePlaceFilter =
      selectedMadePlaces.length === 0 ||
      selectedMadePlaces.includes(product.madePlace);
    const passesSizeFilter =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);
    const passesColorFilter =
      selectedColors.length === 0 || selectedColors.includes(product.color);

    console.log(
      `Product ${product.title} - Price: ${passesPriceFilter}, Rating: ${passesRatingFilter}, Count: ${passesCountFilter}, MadePlace: ${passesMadePlaceFilter}, Size: ${passesSizeFilter}, Color: ${passesColorFilter}`
    );

    return (
      passesPriceFilter &&
      passesRatingFilter &&
      passesCountFilter &&
      passesMadePlaceFilter &&
      passesSizeFilter &&
      passesColorFilter
    );
  });

  console.log("Filtered Products:", filteredProducts);

  return (
    <div className="catalog container">
      <div className="catalog__left">
        <div className="catalog__left__card">
          <div className="catalog__left__card__header">
            <div>
              <h3>Фильтры</h3>
              <p>Найдено {filteredProducts?.length} товаров</p>
            </div>
            <p style={{ cursor: "pointer" }} onClick={handleResetFilters}>
              Сбросить
            </p>
          </div>
        </div>
        <div className="catalog__left__card__slider catalog__left__card">
          <p>Цена, тенге</p>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            aria-labelledby="price-range-slider"
          />
        </div>

        <div className="catalog__left__card__slider catalog__left__card">
          <p>Рейтинг</p>
          <Slider
            value={rating}
            onChange={handleRatingChange}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            aria-labelledby="rating-slider"
          />
        </div>

        <div className="catalog__left__card__slider catalog__left__card">
          <p>Количество</p>
          <Slider
            value={count}
            onChange={handleCountChange}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            aria-labelledby="count-slider"
          />
        </div>

        <div className="catalog__left__card__filters catalog__left__card">
          <h4>Место производства</h4>
          <FormGroup>
            {["Turkey", "China", "India"].map((place) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={place}
                    checked={selectedMadePlaces.includes(place)}
                    onChange={handleCheckboxChange(setSelectedMadePlaces)}
                  />
                }
                label={place}
                key={place}
              />
            ))}
          </FormGroup>
        </div>

        <div className="catalog__left__card__filters catalog__left__card">
          <h4>Размер</h4>
          <FormGroup>
            {["120x150", "140x200", "160x230"].map((size) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={size}
                    checked={selectedSizes.includes(size)}
                    onChange={handleCheckboxChange(setSelectedSizes)}
                  />
                }
                label={size}
                key={size}
              />
            ))}
          </FormGroup>
        </div>

        <div className="catalog__left__card__filters catalog__left__card">
          <h4>Цвет</h4>
          <FormGroup>
            {["Blue", "Red", "Green", "Gold"].map((color) => (
              <FormControlLabel
                control={
                  <Checkbox
                    name={color}
                    checked={selectedColors.includes(color)}
                    onChange={handleCheckboxChange(setSelectedColors)}
                  />
                }
                label={color}
                key={color}
              />
            ))}
          </FormGroup>
        </div>
      </div>

      <div className="catalog__right">
        <h2>{category}</h2>
        <div className="new__catalog__cards">
          {isLoading ? (
            Array.from(new Array(3)).map((_, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
                key={index}
              >
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={210}
                  height={300}
                  style={{borderRadius: "10px"}}
                  className="new__cards__item__skeleton"
                />
              </div>
            ))
          ) : error ? (
            <p>Ошибка получения данных.</p>
          ) : filteredProducts?.length > 0 ? (
            filteredProducts?.map((item) => (
              <div className="new__cards__item" key={item.id}>
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
                    <img src={item.images[0]} alt={item.title} />
                  </Link>
                </div>
                <div className="new__cards__item__info">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                  <div className="new__cards__item__price">
                    <h4>{item.oldPrice ? `${item.oldPrice} тенге` : ""}</h4>
                    <h3>{item.price} тенге</h3>
                  </div>
                  <div className="new__cards__item__rating">
                    {getRating(item.rating)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Товары не найдены.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
