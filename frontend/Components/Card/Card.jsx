import React from "react";
import Link from "next/link";
import Image from "next/image";
import Style from "./Card.module.css";
import images from "../Image/client/index";
import imagesNFT from "../Image/index";

const Card = ({ setNotification, image, index }) => {
  return (
    <div className={Style.card}>
      <div className={Style.content}>
        <a href={`/image/${image.imageID}`}>
          <p>
            <Image
              src={image.image}
              alt="image"
              className={Style.image}
              width={250}
              height={200}
            />
          </p>
        </a>
        <p className={Style.title}>{image.title}</p>
        <span className={Style.para}>
          <Image
            className="avatar_img"
            src={images[`client${index + 1}`]}
            width={40}
            height={40}
            alt="avatar"
          />
          <small
            className={Style.para_small}
            onClick={() => (
              setNotification("Successfully copied"),
              navigator.clipboard.writeText(image.owner)
            )}
          >
            {image.owner.slice(0, 25)}...
          </small>
        </span>

        <span>
          CreatedAt: {new Date(image.createdAt * 1000).toDateString()}
          <small className={Style.number}>#{image.imageID}</small>
        </span>
        <small className={Style.para}>
          {image.description.slice(0, 80)}...
        </small>
        <button
          onClick={() => (
            setNotification("Image URL is Successfully copied"),
            navigator.clipboard.writeText(image.image)
          )}
          className={Style.btn}
        >
          Copy URL
        </button>
      </div>
    </div>
  );
};

export default Card;
