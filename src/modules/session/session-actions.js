/*eslint-disable*/
import React from 'react'
import {
  SET_SELECECTED_EXEL,
  SET_SELECTED_WORD,
  SELECT_FOLDER,
  SET_IS_CLICK,
  SET_ALL_NODE_RULER
} from 'modules/session/session-constants'
import { notification } from 'antd'

const getFragments = r => r.reduce((acc, i) => {
  const fileName = i['Файл 1']
  if (!acc[fileName]) acc[fileName] = []
  acc[fileName].push(i)
  return acc
}, {})

export const setSelectedWordName = payload => ({ type: SET_SELECTED_WORD, payload })

export const setSelectedExcelName = selectedExcelFileName => {
  return (dispatch, getState) => {
    const type = getState().source.type
    if (type) {
      const doc = selectedExcelFileName
        ? require(`./${type}-files/${selectedExcelFileName}.js`) || {}
        : {}
      const allDocsFragments = getFragments(doc.allRows || [])
      dispatch({ type: SET_SELECECTED_EXEL, payload: { selectedExcelFileName, allDocsFragments } })
    }
  }
}

export const setFragmentForSearching = payload => ({ type: SET_IS_CLICK, payload })

export const selectFolder = type => {
  return dispatch => {
    if (type === 'orb-others' || type === 'orb-fz') {
      const excel = require(`./excel-file-${type}.js`) || {}
      const doc = require(`./${type}-files.js`) || {}

      dispatch({
        type: SELECT_FOLDER,
        payload: {
          excelFileNames: excel.default || [],
          docxFileNames: doc.default || [],
          type,
        },
      })
    } else {
      notification.error({
        message: (
          <div>Не верный тип "{type}". Тип должен существовать и быть metrologiya или roskomnadzor.
            <br />
            <a href='/'>Перейти на главную</a>
          </div>
        ),
      })
    }
  }
}

export const setAllNodeRuler = allNodeRuler => ({type: SET_ALL_NODE_RULER, allNodeRuler})