/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import './index.styl'
import { useSelector } from 'react-redux'


const Ruler = () => {
  const nodes = useSelector(state => state.source.allNodesRuler);
  const [selectedSeperator, setSelectedSeperator] = useState()

  const handleClickOnSeperator = (e) => {
    console.log(e.target, 'sdadasdasdasd')
    if (e.target.classList[2]) {
      setSelectedSeperator(e.target.classList[2])
    }
  }

  useEffect(() => {
    let initialPos = ''
  }, ['e.target.classList[2]'])
  debugger
  return (
    <div className='Ruler-root' style={{ position: 'relative' }} onClick={handleClickOnSeperator}>
      {nodes && nodes.map(i => (
        <a href={`#${i.id}`} key={i.id} className={`seperator ${i.color} ${i.id} ${selectedSeperator === i.id ? 'selectedSeperator' : ''}`}></a>
      ))}
    </div>
  )
}

export default Ruler
