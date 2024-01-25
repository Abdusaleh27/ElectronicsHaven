import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

/**
 * displays basics product information on the the product card
 * @param {array} product
 */
const BriefProductDescription = ({ product }) => {
  return (
    <>
      <Link
        to={`/productdetails/${(product.name + "sku" + product.sku)
          .split("/")
          .join()}`}
      >
        <p className="product-name swiper-product-name">{product.name}</p>
      </Link>

      <p className="product-line">
        <span className="product-info-title">SKU:</span>{" "}
        <span className="product-info">{product.sku} </span>
      </p>
      <p className="product-line">
        <span className="product-info-title">Color:</span>{" "}
        <span className="product-info">{product.color} </span>
      </p>
      <p className="product-line">
        <span className="product-info-title">Condition:</span>{" "}
        <span className="product-info">{product.condition}</span>
      </p>
      <p>
        {product.customerReviewAverage === null ? (
          <>
            <Rating
              initialValue={0}
              size={15}
              allowFraction
              allowHover={false}
              readonly={true}
            />
            <small className="review-count">(0)</small>
          </>
        ) : (
          <>
            <Rating
              initialValue={product.customerReviewAverage}
              size={15}
              allowFraction
              readonly={true}
            />
            <small className="review-count">
              {" "}
              ({product.customerReviewCount}){" "}
            </small>
          </>
        )}
      </p>
    </>
  );
};

export default BriefProductDescription;
