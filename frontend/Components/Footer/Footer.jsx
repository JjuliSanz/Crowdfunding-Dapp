import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialTwitter,
} from "react-icons/ti";
import Style from "./Footer.module.css";
import { Logo } from "../index";
import Link from "next/link";

const Footer = () => {
  const menuList = ["Home, About, Product, Contract, ICO, Membership"];
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <Link href="/">
            <div className={Style.footer_box_social_div}>
              <Logo className={Style.footer_box_social_logo} />
              <div className={Style.hover_shadow}>
                <div className={Style.hover_shadow_shadow}></div>
              </div>
            </div>
          </Link>
          <p className={Style.footer_box_social_info}>
            The world first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs).
          </p>
          <div className={Style.footer_social}>
            <a href="#">
              <TiSocialFacebook />
            </a>
            <a href="#">
              <TiSocialInstagram />
            </a>
            <a href="#">
              <TiSocialLinkedin />
            </a>
            <a href="#">
              <TiSocialYoutube />
            </a>
            <a href="#">
              <TiSocialTwitter />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <div className={Style.menu}>
            {menuList.map((el, i) => (
              <p key={i + 1}>{el}</p>
            ))}
          </div>
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>

          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>Discover, collect, and sell extraordinary NFTs.</p>
          </div>
        </div>
      </div>
      <div className={Style.footer_shadow}></div>
    </div>
  );
};

export default Footer;
