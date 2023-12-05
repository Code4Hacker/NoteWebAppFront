import React, { useState } from 'react'

import loader from './home.module.css'

const Loader = () => {
    const [hide, setHide] = useState(false);
    setTimeout(() => {
        setHide(true);
    }, 6000);
  return (
    <div className={loader['loader']}>
        <div className="loader-rotate" style={{
            display:`${!hide ? 'block': 'none'}`
        }}></div>
        <div className="" style={{
            display:`${hide ? 'block': 'none'}`
        }}>
            <span>Sorry, Reload the Page Again. Something Wrong !</span>
        </div>
    </div>
  )
}

export default Loader