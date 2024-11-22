import React from 'react'

const TextArea = () => {
    return (
        <div className='flex items-center justify-center'>
            <textarea
                placeholder="Summary"
                className="textarea textarea-bordered textarea-lg w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] my-5 h-48"></textarea>
        </div>
    )
}

export default TextArea