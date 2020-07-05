/*eslint-disable*/
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { List } from 'antd'
import './index.styl'

const Source = () => {
  const selectedWordFileName = useSelector(state => state.source.selectedWordFileName)
  const fragmentForSearching = useSelector(state => state.source.fragmentForSearching)
  const fragmentForSearchingList = useSelector(state => state.source.fragmentForSearchingList)
  const allDocsFragments = useSelector(state => state.source.allDocsFragments)
  const [arr, setArr] = useState([])
  const [percents, setPercents] = useState([])

  useEffect(() => {
    if (fragmentForSearching) {
      const tempArr = allDocsFragments[selectedWordFileName] || []
      const filterArr = tempArr.filter(i => fragmentForSearchingList.includes(i['Фрагмент 1'])) // исходные положения 
      setArr(filterArr)
      setPercents(tempArr.map(p => p))
    }
  }, [fragmentForSearching])

  const nameFunc = (propValue, name) => {
    if (!propValue) return <div style={{ color: '#81e4ff' }}>0.00</div>
    const currentValue = Number(propValue.replace('%', ''))

    const red = '#81e4ff', yellow = '#00caff', green = '#0089f8', blue = '#006ac8'

    switch (name) {
      case 'Жаккар':
        if (currentValue <= 45) {
          return <div style={{ color: red, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 45 && currentValue <= 65) {
          return <div style={{ color: yellow, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 65 && currentValue <= 96.6) {
          return <div style={{ color: green, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else return <div style={{ color: blue, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
      case 'Минимум':
        if (currentValue <= 65) {
          return <div style={{ color: red, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 65 && currentValue <= 80) {
          return <div style={{ color: yellow, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 80 && currentValue <= 98) {
          return <div style={{ color: green, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else return <div style={{ color: blue, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
      case 'Косинус':
        if (currentValue <= 90) {
          return <div style={{ color: red, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 90 && currentValue <= 93) {
          return <div style={{ color: yellow, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else if (currentValue > 93 && currentValue <= 99) {
          return <div style={{ color: green, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
        } else return <div style={{ color: blue, fontSize: '12px' }}>{(currentValue / 100).toFixed(2)}</div>
      default:
        break;
    }
  }


  return (
    <div className='Source-root'>
      <div className='sourse-all-text'>
        <List
          dataSource={arr}
          itemLayout='horizontal'
          renderItem={item => (
            <List.Item style={{ alignItems: 'flex-start' }}>
              <div style={{ marginRight: '15px' }}>
                <div>{nameFunc(item['Жаккар'], 'Жаккар')}</div>
                <div>{nameFunc(item['Минимум'], 'Минимум')}</div>
                <div>{nameFunc(item['Косинус'], 'Косинус')}</div>
              </div>
              <List.Item.Meta
                title={<div>{item['Файл 2']}</div>}
                description={item['Фрагмент 2']}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default Source
