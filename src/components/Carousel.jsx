import axios from "axios";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  ButtonDisabledPic,
  ButtonDisabledWrite,
  Data,
  PicSeconds,
  ShowPic,
  WriteSeconds,
} from "../atoms/CarouselAtom";

const Carousel = () => {
  const [picSeconds, setPicSeconds] = useRecoilState(PicSeconds);
  const [writeSeconds, setWriteSeconds] = useRecoilState(WriteSeconds);
  const [showPic, setShowPic] = useRecoilState(ShowPic);
  const [buttonDisabledPic, setButtonDisabledPic] =
    useRecoilState(ButtonDisabledPic);
  const [buttonDisabledWrite, setButtonDisabledWrite] =
    useRecoilState(ButtonDisabledWrite);
  const [data, setData] = useRecoilState(Data);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const picIntervalRef = useRef(null);
  const writeIntervalRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        
        // Comprehensive null and token checks
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Validate id
        if (!id) {
          throw new Error("No post ID provided");
        }

        const response = await axios.get(
          `https://ssbtutor-backend.onrender.com/ppdt/${id}`, 
          {
            headers: {
              Authorization: token,
            },
          }
        );

        // Null checks on response data
        if (response?.data?.post) {
          setData(response.data.post);
        } else {
          throw new Error("Invalid response format");
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data");
        setData(null); // Reset data on error
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [id]);

  // Start the picture timer
  const startPicTimer = useCallback(() => {
    setPicSeconds(30);
    setShowPic(true);
    setButtonDisabledPic(true);
    setButtonDisabledWrite(true);

    picIntervalRef.current = setInterval(() => {
      setPicSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  // Start the writing timer
  const startWriteTimer = useCallback(() => {
    setWriteSeconds(240);
    setButtonDisabledWrite(true);

    writeIntervalRef.current = setInterval(() => {
      setWriteSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  // Stop the timer when seconds reach zero
  useEffect(() => {
    if (picSeconds === 0 && picIntervalRef.current) {
      clearInterval(picIntervalRef.current);
      picIntervalRef.current = null;
      setShowPic(false);
      setButtonDisabledWrite(false);
    }

    if (writeSeconds === 0 && writeIntervalRef.current) {
      clearInterval(writeIntervalRef.current);
      writeIntervalRef.current = null;
    }
  }, [picSeconds, writeSeconds]);

  // Reset function
  const reset = useCallback(() => {
    if (picIntervalRef.current) clearInterval(picIntervalRef.current);
    if (writeIntervalRef.current) clearInterval(writeIntervalRef.current);
    setPicSeconds(0);
    setWriteSeconds(0);
    setShowPic(false);
    setButtonDisabledPic(false);
    setButtonDisabledWrite(true);
  }, []);

  // Handle image load event
  const handleImageLoad = () => {
    startPicTimer(); // Start the timer only when the image has fully loaded
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card glass w-[90%] md:w-[80%] lg:w-[60%] mb-5">
      <figure>
        {showPic && data?.link ? (
          <img
            src={data.link}
            alt="Displayed"
            onLoad={handleImageLoad}
            className="object-contain max-h-[500px] w-full"
          />
        ) : (
          <div className="flex items-center justify-center h-48 text-2xl text-gray-300">
            No Image Available
          </div>
        )}
      </figure>
      <div className="card-body">
        <TimerDisplay 
          picSeconds={picSeconds} 
          writeSeconds={writeSeconds} 
        />
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowPic(true)}
            disabled={buttonDisabledPic || !data?.link}
          >
            Show Picture
          </button>
          <button
            className="btn btn-primary"
            onClick={startWriteTimer}
            disabled={buttonDisabledWrite}
          >
            Start Writing
          </button>
          <button 
            className="btn btn-primary" 
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// Separate Timer Display Component
const TimerDisplay = React.memo(({ picSeconds, writeSeconds }) => {
  const formatTime = (seconds) => {
    if (seconds == null) return "";
    return seconds > 0 ? seconds : "";
  };

  return (
    <h1 className="flex justify-center text-5xl mb-2">
      {formatTime(picSeconds) || formatTime(writeSeconds)}
    </h1>
  );
});

export default Carousel;