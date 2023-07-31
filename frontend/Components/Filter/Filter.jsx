import { useState, useEffect } from "react";
import Image from "next/image";
import images from "../Image/index";
import Style from "./Filter.module.css";

const Filter = ({
  activeSelect,
  setActiveSelect,
  setImagesCopy,
  imagesCopy,
  setAllImages,
  allImages,
  oldImages,
}) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const onHandleSerch = (value) => {
    const filteredImages = allImages.filter(({ owner }) =>
      owner.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredImages.length === 0) {
      setAllImages(imagesCopy);
    } else {
      setAllImages(filteredImages);
    }
  };

  const onClearSearch = () => {
    if (allImages.length && imagesCopy.length) {
      setAllImages(imagesCopy);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);
    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    setAllImages(oldImages);
    setImagesCopy(oldImages);
    if (search) {
      onHandleSerch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const filter = [
    {
      name: "Old Images",
    },
    {
      name: "Recent Images",
    },
  ];

  useEffect(() => {
    if (activeSelect == "Old Images") {
      setAllImages(oldImages);
    } else {
      setAllImages(oldImages.reverse());
    }
  }, [activeSelect]);

  return (
    <div className={Style.inputFilter}>
      <div className={Style.inputFilter_box}>
        <Image src={images.search} width={20} height={20} alt="filter"/>
        <input
          type="text"
          placeholder="search address"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        className={Style.toggleFilter}
        onClick={() => (toggle ? setToggle(false) : setToggle(true))}
      >
        <div className={Style.toggleFilter_title}>
          <h4>{activeSelect}</h4>
          <Image src={images.arrow} width={10} height={10} alt="filterArrow"/>
        </div>

        {toggle && (
          <div className={Style.toggleFilter_box}>
            {filter.map((el, i) => (
              <p key={i} onClick={() => setActiveSelect(el.name)}>
                {el.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
