import React, { useState } from 'react' ;
import Header from './Header';
import Home from './Home';

export default function index() {
  const [userDisplay, setUserDisplay] = useState('');
  const searchBtn = (value) => {
    setUserDisplay(value);
  }
  return (
    <>
      <Header onSearchBtnClick={searchBtn}/>
      <Home inpValue={userDisplay} />
    </>
  )
}
