import React from 'react'
import Carousel from '../components/Carousel'
import ButtonFooter from '../components/ButtonFooter'
import TextArea from '../components/TextArea'
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

            <TextArea />
        </>
    )
}

export default PPDT