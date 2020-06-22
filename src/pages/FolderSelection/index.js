import { Link } from 'react-router-dom'
import folder from './folder.png'
import { Card } from 'antd'
import React from 'react'
import './index.styl'

const FolderSelection = () => {
  return (
    <div className='FolderSelection-documentList'>
      <Link to='PiURIiPB' className='folder'>
        <Card title='ПиУРИиПБ'>
          <img src={folder} alt='folder-PiURIiPB' />
        </Card>
      </Link>
    </div>
  )
}

export default FolderSelection
