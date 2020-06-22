import { Link } from 'react-router-dom'
import folder from './folder.png'
import { Card } from 'antd'
import React from 'react'
import './index.styl'

const FolderSelection = () => {
  return (
    <div className='FolderSelection-documentList'>
      <Link to='orb-others' className='folder'>
        <Card title='ОРВ-Другие'>
          <img src={folder} alt='folder-orb-others' />
        </Card>
      </Link>
      <Link to='orb-fz' className='folder'>
        <Card title='ОРВ-ФЗ'>
          <img src={folder} alt='folder-orb-fz' />
        </Card>
      </Link>
    </div>
  )
}

export default FolderSelection
