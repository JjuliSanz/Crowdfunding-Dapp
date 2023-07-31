import React, { useState } from "react";
import { Header, Footer, Notification, Logo, Loader } from "../Components";
import { useStateContext } from "../Context/NFTs";

const Nftsapi = () => {
  const { loading } = useStateContext();
  const [notification, setNotification] = useState("");

  const apiEndpoint = [
    {
      title: "Get All NFTs",
      description:
        "Welcome to NFTs Api, access to all the nfts uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/nfts",
    },
    {
      title: "Get Single NFT",
      description:
        "Single NFT Api endpoint, get access to single nft uploaded to IPFS, by following the mention steps down below",
      method: "GET",
      endpoint: "http://localhost:3000/api/v1/nfts/Id",
    },
    {
      title: "Create Image Upload",
      description:
        "This endpoint will allow you to make post request on the server to upload the image",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/nfts/create",
    },
    {
      title: "Login Endpoint",
      description:
        "Allow api user to use the NFTs API authentication to log user in",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/login",
    },
    {
      title: "SignUp Endpoint",
      description:
        "Allow api user to use the NFTs API for creating account to signup user",
      method: "POST",
      endpoint: "http://localhost:3000/api/v1/user/signup",
    },
  ];
  return (
    <div className="home">
      <Header notification={notification} setNotification={setNotification} />
      <div className="header">
        <h1>How To Use NFTs API</h1>
      </div>

      <div className="api-body">
        {apiEndpoint.map((api, i) => (
          <div className="api-left" key={i}>
            <h3 className="api-title">{api.title}</h3>
            <p>{api.description}</p>
            <p>Method: {api.method}</p>
            <p>Endpoint: {api.endpoint}</p>
          </div>
        ))}
      </div>

      <Footer />

      {/* NOTIFICATION */}
      {notification != "" && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      {/* LOADER */}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Nftsapi;
