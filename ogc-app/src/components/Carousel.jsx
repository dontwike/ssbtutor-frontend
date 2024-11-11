import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const Carousel = () => {
    const [picSeconds, setPicSeconds] = useState(0);
    const [writeSeconds, setWriteSeconds] = useState(0);
    const [showPic, setShowPic] = useState(false);
    const [buttonDisabledPic, setButtonDisabledPic] = useState(false);
    const [buttonDisabledWrite, setButtonDisabledWrite] = useState(true);
    const [data, setData] = useState();

    const picIntervalRef = useRef(null);
    const writeIntervalRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/ppdt/${id}`, {
                    headers: {
                        Authorization : localStorage.getItem('token')
                    }
                });
                setData(response.data.post);
            } catch (error) {
                console.error("Error fetching data:", error);
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
            setPicSeconds((prev) => prev - 1);
        }, 1000);
    }, []);

    // Start the writing timer
    const startWriteTimer = useCallback(() => {
        setWriteSeconds(240);
        setButtonDisabledWrite(true);

        writeIntervalRef.current = setInterval(() => {
            setWriteSeconds((prev) => prev - 1);
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

    return (
        <div className="card glass w-[90%] md:w-[80%] lg:w-[60%]">
            <figure>
                {showPic ? (
                    <img
                        src={data?.link}
                        alt="Displayed"
                        onLoad={handleImageLoad} // Trigger timer start on load
                    />
                ) : (
                    <div className="flex items-center justify-center h-48 text-2xl text-gray-300">
                        Hidden
                    </div>
                )}
            </figure>
            <div className="card-body">
                <TimerDisplay picSeconds={picSeconds} writeSeconds={writeSeconds} />
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowPic(true)} // Just display the image
                        disabled={buttonDisabledPic}
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
    return (
        <h1 className="flex justify-center text-5xl mb-2">
            {picSeconds > 0 ? picSeconds : writeSeconds > 0 ? writeSeconds : ''}
        </h1>
    );
});

export default Carousel;
