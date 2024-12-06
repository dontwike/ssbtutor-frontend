import React, { useState, useEffect } from "react";
import Tab from "../components/Tab";
import axios from "axios";
import TabUnPurchased from "../components/TabUnPurchased";

const PPDTMain = () => {
  const [purchasedPosts, setPurchasedPosts] = useState([]);
  const [unpurchasedPosts, setUnpurchasedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://ssbtutor-backend.onrender.com/ppdt", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        console.log(response.data)

        setPurchasedPosts(response.data?.purchasedPosts || []);
        setUnpurchasedPosts(response.data?.unPurchasedPosts || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUnpurchasedClick = (itemName) => {
    alert(`You cannot access the unpurchased item: ${itemName}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex mt-7 flex-wrap gap-6 items-center justify-center">
      {purchasedPosts?.map((item, index) => (
        <Tab 
          key={item?.id || index} 
          link={item?.id} 
          name={item?.name} 
        />
      ))}

      {unpurchasedPosts?.map((item, index) => (
        <TabUnPurchased
          key={item?.name || index}
          link=""
          name={item?.name}
          onClick={() => handleUnpurchasedClick(item?.name)}
        />
      ))}

      {purchasedPosts.length === 0 && unpurchasedPosts.length === 0 && (
        <p className="text-center text-gray-500">No posts available</p>
      )}
    </div>
  );
};

export default PPDTMain;