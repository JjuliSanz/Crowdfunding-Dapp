import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Card,
  Upload,
  Button,
  Profile,
  Header,
  Footer,
  Notification,
  Logo,
  Filter,
  Form,
  Loader,
} from "../Components";
import { useStateContext } from "../Context/NFTs";
import images from "../Components/Image/client/index";

const Index = () => {
  const {
    address,
    disconnect,
    contract,
    connect,
    userBalance,
    UploadImage,
    getUploadedImages,
    setLoading,
    loading,
    getAllNftsAPI,
  } = useStateContext();
  const [openProfile, setOpenProfile] = useState(false);
  const [closeForm, setCloseForm] = useState(false);
  const [file, setFile] = useState(null);
  const [display, setDisplay] = useState(null);
  const [notification, setNotification] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [activeSelect, setActiveSelect] = useState("Old Images");
  const [imagesCopy, setImagesCopy] = useState([]);

  // GET DATA
  const oldImages = [];

  const fetchImages = async () => {
    try {
      const images = await getUploadedImages();
      console.log("Images", images);
      setAllImages(images);

      const apiImages = await getAllNftsAPI();
      // console.log("apiImages", apiImages);
    } catch (error) {
      console.log("error en la carga de imagenes", error);
    }
  };

  useEffect(() => {
    if (contract) fetchImages();
  }, [address, contract]);

  useEffect(() => {
    if (allImages.length === 0) {
      console.log("Loading");
    } else {
      // console.log("allImages", allImages);
      allImages.map((el) => oldImages.push(el));
    }
  }, [allImages]);

  // IMAGE DATA
  const [category, setCategory] = useState("");
  const [imageInfo, setImageInfo] = useState({
    title: "",
    description: "",
    email: "",
    category: "",
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setImageInfo({ ...imageInfo, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCloseForm(true);
    setLoading(true);
    if (file) {
      try {
        setNotification("Uploading file..."); 
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `e059cbf3522e6cc22ecb`,
            pinata_secret_api_key: `106c3b2bc7f8ae38b167190cb5e0827acb0864511613e16b79b31d5f6a5634ae`,
            "Content-Type": "multipart/form-data",
          },
        });
        const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        await UploadImage({
          ...imageInfo,
          image: image,
          category: category,
        });
        setFile(null);
        setLoading(false);
        setNotification("File uploaded successfully!");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setNotification("Error uploading file!"); 
      }
    }
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    e.preventDefault();
  };

  // TAKE IMAGE
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDisplay(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>Create 1000 NFTs for Free</h1>
      </div>

      {/* UPLOAD */}
      <div className="upload">
        {loading ? (
          <Loader />
        ) : (
          <>
            <Upload
              onImageChange={onImageChange}
              display={display}
              address={address}
              retrieveFile={retrieveFile}
            />
            <div className="upload-info">
              <h1>Welcome to NFTs IPFS Upload</h1>
              <p>
                Our products help you securely distribute any type of media at
                scale, freeing you from restrictive platforms, middlemen, and
                algorithms that limit your creative agency.
              </p>
              <div className="avatar">
                <Button
                  address={address}
                  disconnect={disconnect}
                  connect={connect}
                  file={file}
                />

                {address && (
                  <p>
                    <Image
                      className="avatar_img"
                      src={images.client1}
                      width={40}
                      height={40}
                      onClick={() => setOpenProfile(true)}
                      alt="avatar"
                    />
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <h1 className="subheading">All NFTs of Marketplace</h1>

      {/* CARD */}
      {allImages.length === 0 ? (
        <Loader />
      ) : allImages === undefined ? (
        <h1>No Images</h1>
      ) : (
        <>
          <Filter
            setImagesCopy={setImagesCopy}
            imagesCopy={imagesCopy}
            setAllImages={setAllImages}
            allImages={allImages}
            oldImages={oldImages}
            activeSelect={activeSelect}
            setActiveSelect={setActiveSelect}
          />
          <div className="card">
            {allImages.map((image, i) => (
              <Card
                key={i + 1}
                index={i}
                image={image}
                setNotification={setNotification}
              />
            ))}
          </div>
        </>
      )}

      <Footer />

      {/* NOTIFICATION */}
      {notification !== "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* PROFILE */}
      {openProfile && (
        <div className="profile">
          <Profile
            setOpenProfile={setOpenProfile}
            userBalance={userBalance}
            address={address}
          />
        </div>
      )}

      {/* LOADER */}
      {/* {loading && <Loader />} */}

      {/* FORM */}
      {file && !closeForm && (
        <div className="form">
          <div className="form_inner">
            <Form
              setFile={setFile}
              setDisplay={setDisplay}
              handleFormFieldChange={handleFormFieldChange}
              handleSubmit={handleSubmit}
              setCategory={setCategory}
              setCloseForm={setCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
