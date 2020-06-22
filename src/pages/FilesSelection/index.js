import { HomeOutlined } from '@ant-design/icons'
import FSDocumentsList from './FSDocumentsList'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import React from 'react'
import './index.styl'

const FilesSelection = () => {
  return (
    <div>
      <div className='FilesSelection-header'>
        <Breadcrumb>
          <Breadcrumb.Item><Link to='/'><HomeOutlined /></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Исходные положения</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <FSDocumentsList />
    </div>
  )
}

export default FilesSelection
