import React from 'react'

const Tab = (props) => {
    return (
        <div className="relative w-36 h-40 p-5 bg-[#1D232A] rounded-xl border-2 border-gray-300 overflow-visible transition-all duration-500 ease-out hover:border-blue-500 hover:shadow-lg">
            <a href={`/ppdt/${props.link}`}>
                <div className="h-full grid place-content-center gap-2 text-[#a7b2c0]">
                    <p className="text-l font-bold">{props.name}</p>
                </div>
            </a>
        </div>
    )
}

export default Tab