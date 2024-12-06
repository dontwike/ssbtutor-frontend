import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../components/Tab";
import axios from "axios";
import TabUnPurchased from "../components/TabUnPurchased";

const PPDTMain = () => {
  const [purchasedPosts, setPurchasedPosts] = useState([]);
  const [unpurchasedPosts, setUnpurchasedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();




  useEffect(() => {
    fetchData();
    console.log("PPDTMain !!!!")
  }, []);


  const fetchData = async () => {
    // Get token from localStorage with null check
    const token = localStorage.getItem("token");
    
    // If no token is found, redirect to login
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get("https://ssbtutor-backend.onrender.com/ppdt", {
        headers: {
          Authorization: token,
        },
      });
         
      if(response.status === 200){
        console.log("PPDTMAIN : "+ response?.data)
        const purchasedData = response?.data?.purchasedPosts ?? [];
        const unpurchasedData = response?.data?.unPurchasedPosts ?? [];
  
        setPurchasedPosts(purchasedData);
        setUnpurchasedPosts(unpurchasedData);
        setError(null);
      }
     
    } catch (error) {
      console.error("Error fetching data:", error);
      
      // Check for specific error types
      if (error.response?.status === 401) {
        // Unauthorized - likely expired or invalid token
        localStorage.removeItem("token");
        navigate("/login");
      } else if (error.response?.status === 404) {
        setError("Resource not found. Please contact support.");
      } else {
        setError("Failed to fetch posts. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnpurchasedClick = (itemName) => {
    alert(`You cannot access the unpurchased item: ${itemName || 'Unknown'}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p className="text-lg mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex mt-7 flex-wrap gap-6 items-center justify-center">
      {purchasedPosts?.map((item, index) => (
        <Tab 
          key={item?.id ?? index} 
          link={item?.id ?? ''} 
          name={item?.name ?? 'Unnamed Post'} 
        />
      ))}

      {unpurchasedPosts?.map((item, index) => (
        <TabUnPurchased
          key={item?.name ?? index}
          link=""
          name={item?.name ?? 'Unnamed Post'}
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