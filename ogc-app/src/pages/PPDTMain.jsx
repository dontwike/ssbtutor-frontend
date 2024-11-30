import React, { useState, useEffect } from "react";
import Tab from "../components/Tab";
import Alert from "../components/Alert";
import axios from "axios";
import TabUnPurchased from "../components/TabUnPurchased";

const PPDTMain = () => {
  const [purchasedPosts, setPurchasedPosts] = useState([]);
  const [unpurchasedPosts, setUnpurchasedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ppdt", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setPurchasedPosts(response.data.purchasedPosts);
        setUnpurchasedPosts(response.data.unPurchasedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex mt-7 flex-wrap gap-6 items-center justify-center">
      {purchasedPosts.map((item, index) => (
        <Tab key={index} link={item.id} name={item.name} />
      ))}

      {unpurchasedPosts.map((item, index) => (
        <TabUnPurchased
          key={index}
          link={''}
          name={item.name}
          onClick={() => handleUnpurchasedClick(item.name)}
        />
      ))}
    </div>
  );
};

export default PPDTMain;
