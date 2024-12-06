import React from 'react'
import Carousel from '../components/Carousel'
import CommentSection from '../components/CommentSection'
// import ButtonFooter from '../components/buttonFooter'

const PPDT = () => {

    return (
        <>
            <div className='flex justify-center mt-3'>
                <Carousel />
            </div>

            {/* <div className='flex justify-center mt-5'>
                <ButtonFooter />
            </div> */}

            <CommentSection />
        </>
    )
}

export default PPDT