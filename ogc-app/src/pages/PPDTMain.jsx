import React, { useState, useEffect, useRef } from "react";
import Tab from "../components/Tab";
import axios from "axios";
import TabUnPurchased from "../components/TabUnPurchased";

const PPDTMain = () => {
  const [purchasedPosts, setPurchasedPosts] = useState([]);
  const [unpurchasedPosts, setUnpurchasedPosts] = useState([]);
  const effectRan = useRef(false); // Prevent double execution

  useEffect(() => {
    if (effectRan.current) return; // Skip subsequent calls
    effectRan.current = true; // Set flag
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

  async function handleUnpurchasedClick(e) {
    alert("This is the unpurcased item u can not access it");
    e.preventDefault();
  }

  return (
    <div className="flex mt-7 flex-wrap gap-6 items-center justify-center">
      {purchasedPosts.map((item, index) => (
        <Tab key={index} link={item.id} name={item.name} />
      ))}

      {unpurchasedPosts.map((item, index) => (
        <TabUnPurchased
          key={index}
          link={""}
          name={item.name}
          onClick={() => handleUnpurchasedClick(item.name)}
        />
      ))}
    </div>
  );
};

export default PPDTMain;
