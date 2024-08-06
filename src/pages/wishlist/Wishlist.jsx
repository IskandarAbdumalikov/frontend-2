import React from "react";
import "./wishlist.scss";
import SwiperProducts from "../../components/swiperProducts/SwiperProducts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlistData = useSelector((state) => state.wishlist.value);
  const navigate = useNavigate();

  return (
    <div className="wishlist container">
      <h1>Избранное</h1>
      {wishlistData && wishlistData.length > 0 ? (
        <SwiperProducts isWishlist={true} showHeader={false} />
      ) : (
        <div className="empty-wishlist">
          <h3>
            У вас пока нет сохраненных товаров. Сохраняйте понравившиеся товары
            в избранное простым нажатием на сердечко.
          </h3>
          <button
            className="empty__wishlist-btn"
            onClick={() => navigate("/catalog/Ковры")}
          >
            Перейти в каталог
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
