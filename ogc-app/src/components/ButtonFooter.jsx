import React from 'react'

const ButtonFooter = () => {

  async function handleNext() {
    
  }

  return (
    <div className=''>
      <button className="btn btn-wide mt-2">Previous</button>
      <br />
      <button className="btn btn-wide mt-2" onClick={handleNext}>Next</button>
    </div>
  )
}

export default ButtonFooter