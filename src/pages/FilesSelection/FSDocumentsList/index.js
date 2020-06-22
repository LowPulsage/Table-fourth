import { setSelectedWordName, setSelectedExcelName, selectFolder } from 'modules/session/session-actions'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import docxIcon from './hotpng.com.png'
import { List, Avatar } from 'antd'
import exelIcon from './exel.png'
import './index.styl'

const FSDocumentsList = () => {
  const selectedExcelFileName = useSelector(state => state.source.selectedExcelFileName)
  const selectedWordFileName = useSelector(state => state.source.selectedWordFileName)
  const excelFileNames = useSelector(state => state.source.excelFileNames)
  const docxFileNames = useSelector(state => state.source.docxFileNames)
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    dispatch(selectFolder(params.type))
    dispatch(setSelectedExcelName(''))
    dispatch(setSelectedWordName(''))
  }, [])

  const goto = (word, excel) => {
    if (word && excel) {
      history.push(`/${params.type}/view?word=${word}&excel=${excel}`)
    }
  }

  const selectWord = item => {
    dispatch(setSelectedWordName(item.fileName))
    goto(item.fileName, selectedExcelFileName)
  }

  const selectExcel = item => {
    dispatch(setSelectedExcelName(item.fileName))
    goto(selectedWordFileName, item.fileName)
  }

  return (
    <div className='MainPage-documentList'>
      <List
        renderItem={item => (
          <List.Item onClick={() => selectWord(item)}>
            <List.Item.Meta
              className={`documentList-fileName ${selectedWordFileName === item.fileName ? 'selected' : ''}`}
              avatar={<Avatar src={docxIcon} />}
              title={<div>{item.fileName}</div>}
            />
          </List.Item>
        )}
        dataSource={docxFileNames}
        className='list'
        size='small'
        bordered
      />
      <List
        renderItem={item => (
          <List.Item onClick={() => selectExcel(item)}>
            <List.Item.Meta
              className={`documentList-fileName ${selectedExcelFileName === item.fileName ? 'selected' : ''}`}
              avatar={<Avatar src={exelIcon} />}
              title={<div>{item.fileName}</div>}
            />
          </List.Item>
        )}
        dataSource={excelFileNames}
        className='list'
        size='small'
        bordered
      />
    </div>
  )
}

export default FSDocumentsList
