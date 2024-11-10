import React, { useEffect, useState } from 'react';

const Carousel = () => {
    const [picSeconds, setPicSeconds] = useState(0);
    const [writeSeconds, setWriteSeconds] = useState(0);
    const [showPic, setShowPic] = useState(false);
    const [buttonDisabledPic, setButtonDisabledPic] = useState(false);
    const [buttonDisabledWrite, setButtonDisabledWrite] = useState(true);

    useEffect(() => {
        let picInterval, writeInterval;

        if (picSeconds > 0) {
            picInterval = setInterval(() => {
                setPicSeconds(prev => prev - 1);
            }, 1000);
        } else if (picSeconds === 0 && buttonDisabledPic) {
            setShowPic(false); 
            setButtonDisabledPic(true);
            setButtonDisabledWrite(false); // Enable "Start Writing" after "Show Picture" completes
        }

        if (writeSeconds > 0) {
            writeInterval = setInterval(() => {
                setWriteSeconds(prev => prev - 1);
            }, 1000);
        }

        return () => {
            clearInterval(picInterval);
            clearInterval(writeInterval);
        };
    }, [picSeconds, writeSeconds, buttonDisabledPic]);

    const startTimerPic = () => {
        setPicSeconds(4); 
        setShowPic(true);
        setButtonDisabledPic(true); 
        setButtonDisabledWrite(true); // Disable "Start Writing" while picture is being shown
    };

    const startTimerWrite = () => {
        setWriteSeconds(240); 
        setButtonDisabledWrite(true); // Disable "Start Writing" once it starts
    };

    const reset = () => {
        setButtonDisabledPic(false);
        setButtonDisabledWrite(true);
        setPicSeconds(0);
        setWriteSeconds(0);
        setShowPic(false);
    };

    return (
        <div className="card glass w-[90%] md:w-[80%] lg:w-[60%]">
            <figure>
                {showPic ? (
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Displayed"
                    />
                ) : (
                    <div className="flex items-center justify-center h-48 text-2xl text-gray-300">
                        Hidden
                    </div>
                )}
            </figure>
            <div className="card-body">
                <h1 className="flex justify-center text-5xl mb-2">
                    {picSeconds > 0 ? picSeconds : writeSeconds > 0 ? writeSeconds : ''}
                </h1>
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={startTimerPic}
                        disabled={buttonDisabledPic}
                    >
                        Show Picture
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={startTimerWrite}
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

export default Carousel;
