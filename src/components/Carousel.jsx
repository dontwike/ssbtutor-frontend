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

  // Prevent overlapping intervals
  const picTimerActive = useRef(false);
  const writeTimerActive = useRef(false);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

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

        if (response?.data?.post) {
          setData(response.data.post);
        } else {
          throw new Error("Invalid response format");
        }

        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to fetch data");
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      // Clear all timers when unmounting
      clearInterval(picIntervalRef.current);
      clearInterval(writeIntervalRef.current);
      picTimerActive.current = false;
      writeTimerActive.current = false;
    };
  }, [id]);

  const startPicTimer = useCallback(() => {
    if (picTimerActive.current) return; // Prevent multiple intervals
    picTimerActive.current = true;

    setPicSeconds(30);
    setShowPic(true);
    setButtonDisabledPic(true);
    setButtonDisabledWrite(true);

    picIntervalRef.current = setInterval(() => {
      setPicSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(picIntervalRef.current);
          picIntervalRef.current = null;
          picTimerActive.current = false;
          setShowPic(false);
          setButtonDisabledWrite(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const startWriteTimer = useCallback(() => {
    if (writeTimerActive.current) return; // Prevent multiple intervals
    writeTimerActive.current = true;

    setWriteSeconds(240);
    setButtonDisabledWrite(true);

    writeIntervalRef.current = setInterval(() => {
      setWriteSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(writeIntervalRef.current);
          writeIntervalRef.current = null;
          writeTimerActive.current = false;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    clearInterval(picIntervalRef.current);
    clearInterval(writeIntervalRef.current);
    picIntervalRef.current = null;
    writeIntervalRef.current = null;
    picTimerActive.current = false;
    writeTimerActive.current = false;

    setPicSeconds(0);
    setWriteSeconds(0);
    setShowPic(false);
    setButtonDisabledPic(false);
    setButtonDisabledWrite(true);
  }, []);

  const handleImageLoad = () => {
    startPicTimer(); // Start the timer only when the image has fully loaded
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
            Click on Show Picture Button
          </div>
        )}
      </figure>
      <div className="card-body">
        <TimerDisplay picSeconds={picSeconds} writeSeconds={writeSeconds} />
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
          <button className="btn btn-primary" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

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
