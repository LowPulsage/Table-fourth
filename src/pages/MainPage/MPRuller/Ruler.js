/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import './index.styl'
import { useSelector } from 'react-redux'


const Ruler = () => {
  const nodes = useSelector(state => state.source.allNodesRuler);
  const [selectedSeperator, setSelectedSeperator] = useState()

  const handleClickOnSeperator = (e) => {
    if (e.target.classList[2]) {
      setSelectedSeperator(e.target.classList[2])
    }
  }


  // function myFunction() {
  // var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  // var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  // var scrolled = (winScroll / height) * 100;
  //   document.getElementById("myBar").style.width = scrolled + "%";
  //   document.getElementById("stich").style.left = scrolled + "%";
  // }

  useEffect(() => {
    window.onscroll = function () { myFunction() };

    const myFunction = () => {
      var winScroll = document.querySelector('.Mainpage-paragraphs').scrollTop
      var height = document.querySelector('.Mainpage-paragraphs').scrollHeight - document.querySelector('.Mainpage-paragraphs').clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("stich").style.left = scrolled + "%";
    }
    document.querySelector('.Mainpage-paragraphs').addEventListener('scroll', myFunction);
    return () => {
      document.querySelector('.Mainpage-paragraphs').removeEventListener('scroll', myFunction)
    }
  }, [])

  return <div className='main-rooler-style'>
    <div className='Ruler-root' style={{ position: 'relative' }} onClick={handleClickOnSeperator}>
      {nodes && nodes.map(i => (
        <a href={`#${i.id}`} key={i.id} className={`seperator ${i.color} ${i.id} ${selectedSeperator === i.id ? 'selectedSeperator' : ''}`}></a>
      ))}
    </div>
    <div className="header-arrow">
      <div className="progress-container">
        <div className="progress-bar" id="myBar">
          <img width='30' id="stich" src='https://freight.cargo.site/i/90ca985324940d061e10dfb655c0013b327d7a6488f109dd88bd2a8366b03945/dark-triangle.png' />
        </div>
      </div>
    </div>
  </div>
}

export default Ruler
