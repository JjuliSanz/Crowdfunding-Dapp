import React, { useState, useContext, createContext, useEffect } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useDisconnect,
  useSigner,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xF2a64f42Fa8e1b4B9aF2A0Ba7Cf1C59527976f6D"
  );

  const address = useAddress();
  const connect = useMetamask();

  // FrontEnd
  const disconnect = useDisconnect();
  const signer = useSigner();
  const [userBalance, setUserBalance] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const balance = await signer?.getBalance();
      const userBalance = address
        ? ethers.utils.formatEther(balance?.toString())
        : "";
      setUserBalance(userBalance);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ---- Functions ----

  const UploadImage = async (imageInfo) => {
    const { title, description, email, category, image } = imageInfo;
    try {
      const listingPrice = await contract.call("listingPrice");

      const uploadIPFSResult = await contract.call(
        "uploadIPFS",
        [address, image, title, description, email, category],
        {
          value: listingPrice.toString(),
        }
      );

      const response = await axios({
        method: "POST",
        url: `https://d-crowdfunding-backend.onrender.com/api/v1/nfts/create`,
        data: {
          title: title,
          description: description,
          category: category,
          image: image,
          address: address,
          email: email,
        },
      });

      console.log(response);
      console.info("contract call success", uploadIPFSResult);

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("contract call failure", error);
    }
  };

  const getUploadedImages = async () => {
    const images = await contract.call("getAllNFTs");
    console.log("getAllNFTs", images);

    const totalUpload = await contract.call("imagesCount");
    console.log("imagesCount", totalUpload);

    const listingPrice = await contract.call("listingPrice");
    console.log("listingPrice", listingPrice);

    const allImages = images.map((images, i) => ({
      owner: images.creator,
      title: images.title,
      description: images.description,
      email: images.email,
      category: images.category,
      fundraised: images.fundraised,
      image: images.image,
      imageID: images.id.toNumber(),
      createdAt: images.timestamp.toNumber(),
      listedAmount: ethers.utils.formatEther(listingPrice.toString()),
      totalUpload: totalUpload.toNumber(),
    }));

    return allImages;
  };

  const singleImage = async (id) => {
    try {
      const data = await contract.call("getImage", [id]);

      const image = {
        title: data[0],
        description: data[1],
        email: data[2],
        category: data[3],
        fundraised: ethers.utils.formatEther(data[4].toString()),
        creator: data[5],
        imageURL: data[6],
        createdAt: data[7].toNumber(),
        imageID: data[8].toNumber(),
      };
      return image;
    } catch (error) {
      console.log(error);
    }
  };

  const donateFund = async ({ amount, id }) => {
    try {
      console.log(amount, id);
      const transaction = await contract.call("donateToImage", [id], {
        value: amount.toString(),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllNftsAPI = async () => {
    const response = await axios({
      method: "GET",
      url: "https://d-crowdfunding-backend.onrender.com/api/v1/nfts",
    });
    console.log("getAllNftsAPI", response);
    return response;
  };

  const getSingleNftsAPI = async (id) => {
    const response = await axios({
      method: "GET",
      url: `https://d-crowdfunding-backend.onrender.com/api/v1/nfts/${id}`,
    });
    console.log("getSingleNftsAPI", response);
    return response;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        disconnect,
        userBalance,
        setLoading,
        loading,
        // Functions
        UploadImage,
        getUploadedImages,
        donateFund,
        singleImage,
        // API
        getAllNftsAPI,
        getSingleNftsAPI,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
