import { setSelectedWordName, setSelectedExcelName, selectFolder } from 'modules/session/session-actions'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import MPParagraphs from './MPParagraphs'
import React, { useEffect } from 'react'
import { Breadcrumb, Card } from 'antd'
import Source from './MPSource/Source'
import './index.styl'
import Ruler from './MPRuller/Ruler'

const MainPage = () => {
  const selectedExcelName = useSelector(state => state.source.selectedExcelFileName)
  const selectedWordName = useSelector(state => state.source.selectedWordFileName)
  const type = useSelector(state => state.source.type)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    if (!type) {
      dispatch(selectFolder(params.type))
    }
    const res = new URLSearchParams(location.search)
    if (!selectedExcelName) {
      dispatch(setSelectedExcelName(res.get('excel')))
    }
    if (!selectedWordName) {
      dispatch(setSelectedWordName(res.get('word')))
    }
  }, [])

  return (
    <div className='MainPage-root'>
      <div className='header'>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={`/${params.type}`}>Исходные положения</Link></Breadcrumb.Item>
          <Breadcrumb.Item>{selectedWordName}</Breadcrumb.Item>
          <Breadcrumb.Item>{selectedExcelName}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className='MainPage-ruler'>
        <Ruler />
      </div>
      <div className='content'>
        <div className='Mainpage-paragraphs'>
          <Card title='Исходный файл'>
            <MPParagraphs />
          </Card>
        </div>
        <div className='Mainpage-source'>
          <Card title='Исходные положения'>
            <Source />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MainPage
