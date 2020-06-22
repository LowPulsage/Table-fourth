/*eslint-disable*/
import { setFragmentForSearching, setAllNodeRuler } from 'modules/session/session-actions'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react'
import formatDoc from './formatDoc'
import './index.styl'

const nameFunc = (propValue, name) => {
  if (!propValue) return 'red'
  const currentValue = propValue

  const red = '#81e4ff', yellow = '#00caff', green = '#0089f8', blue = '#006ac8'

  switch (name) {
    case 'Жаккар':
      if (currentValue <= 45) {
        return 'redBorder'
      } else if (currentValue > 45 && currentValue <= 65) {
        return 'yellowBorder'
      } else if (currentValue > 65 && currentValue <= 96.6) {
        return 'greenBorder'
      } else return 'blueBorder'
    case 'Минимум':
      if (currentValue <= 65) {
        return 'redBorder'
      } else if (currentValue > 65 && currentValue <= 80) {
        return 'yellowBorder'
      } else if (currentValue > 80 && currentValue <= 98) {
        return 'greenBorder'
      } else return 'blueBorder'
    case 'Косинус':
      if (currentValue <= 90) {
        return 'redBorder'
      } else if (currentValue > 90 && currentValue <= 93) {
        return 'yellowBorder'
      } else if (currentValue > 93 && currentValue <= 99) {
        return 'greenBorder'
      } else return 'blueBorder'
    default:
      break;
  }
}

const MPParagraphs = () => {
  const selectedWordFileName = useSelector(state => state.source.selectedWordFileName)
  const selectedExcelFileName = useSelector(state => state.source.selectedExcelFileName)
  const fragmentForSearching = useSelector(state => state.source.fragmentForSearching)
  const allDocsFragments = useSelector(state => state.source.allDocsFragments)
  const type = useSelector(state => state.source.type)
  const [htmlObj, setHtml] = useState({ __html: '' })
  const dipatch = useDispatch()

  useEffect(() => {
    if (selectedWordFileName && type) {
      // todo: recheck place. Maybe move some logic to actions?
      const documentOne = require(`modules/session/${type}-docs/${selectedWordFileName}.js`)
      const { formatted, ids, countObj } = formatDoc(documentOne?.default, selectedWordFileName, allDocsFragments)
      let selectedColor = '#bbb'
      setHtml({ __html: formatted })
      setTimeout(() => {
        ids.forEach(i => {

          const tempArr = allDocsFragments[selectedWordFileName] || []
          let filterArr = tempArr.filter(j => j['Фрагмент 1'].includes(i)) // исходные положения 
          if (filterArr.length) {
            filterArr = filterArr.map(item => ({
              Жаккар: Number(item['Жаккар'].replace('%', '')),
              Косинус: Number(item['Косинус'].replace('%', '')),
              Минимум: Number(item['Минимум'].replace('%', ''))
            }
            ))
            filterArr = filterArr.reduce((prev, current) => {
              return ({
                Жаккар: prev['Жаккар'] > current['Жаккар'] ? prev['Жаккар'] : current['Жаккар'],
                Косинус: prev['Косинус'] > current['Косинус'] ? prev['Косинус'] : current['Косинус'],
                Минимум: prev['Минимум'] > current['Минимум'] ? prev['Минимум'] : current['Минимум']
              })
            }, {
              Жаккар: 0,
              Косинус: 0,
              Минимум: 0
            })
            let maxValue = Object.entries(filterArr).reduce((prev, current) => {
              return prev[1] > current[1] ? prev : current
            }, ['Жаккар', 0])

            selectedColor = nameFunc(maxValue[1], maxValue[0])

          }
          const name = i.replace(/ /g, '_')
          const node = document.querySelector(`span[name='${name}']`)
          if (node) {
            const parent = node.closest('.western')
            if (parent) {
              let child = document.createElement('div')
              child.textContent = `${countObj[i]}`
              parent.classList.add('new-green')
              // class below should include next styles
              parent.classList.add('counter') // display: flex; flex-direction: row; position: relative; 
              child.style.cssText = 'color: darkgray; margin-left: 15px; position: absolute; right: -25px; top: calc(50% - 15px)'
              // add dynamic class name for color
              parent.currentColor = selectedColor
              parent.classList.add(selectedColor)
              // parent.style.cssText = `border-color: ${selectedColor}`
              parent.id = name
              parent.appendChild(child)
            }
          }
        })
      }, 0)
      setTimeout(() => {
        if (selectedWordFileName && type) {
          const rootRuller = document.querySelector('.Ruler-root')
          if (rootRuller) {
            const allNode = document.querySelectorAll('.western')
            const newTest1 = []
            for (let i = 0, l = allNode.length; i < l; i++) {
              const item = allNode[i]
              if (i % 5 === 1 || item.currentColor) {
                const newAnchor = 'anchorid=' + i
                if (!item.id) {
                  const anchorNode = document.createElement('a')
                  anchorNode.setAttribute('id', newAnchor)
                  allNode[i].appendChild(anchorNode)
                }
                // if (currentAnchor)
                // node = anchor
                newTest1.push({
                  id: item.id ? item.id : newAnchor,
                  color: item.currentColor || 'whiteColor',
                  anchor: window.location.pathname + "?word=" + selectedWordFileName + "&excel=" + selectedExcelFileName + "#" + item.id ? item.id : newAnchor
                })
              }
            }
            dipatch(setAllNodeRuler(newTest1))
            // move redux
            // newTest1
            // return
            // const newTest1 = allNode.map(item => {
            //   // seperator.classList.add('seperator')
            //   const obj = {
            //     id: item.id
            //   }
            //   if (item.currentColor) {
            //     return {
            //       ...obj,
            //       color: item.currentColor
            //       // anchor: 'href', window.location.pathname + "?word=" + selectedWordFileName + "&excel=" + selectedExcelFileName + "#" + item.id
            //     }
            //     seperator.setAttribute('href', window.location.pathname + "?word=" + selectedWordFileName + "&excel=" + selectedExcelFileName + "#" + item.id)
            //     seperator.classList.add(item.currentColor)
            //   } else {
            //     return { ...obj, color: 'greyColor' }
            //     seperator.classList.add('greyColor')
            //   }
            //   rootRuller.appendChild(seperator)
            // })
            // dispatch(setAllNodesRuler(newTest1))
          }
        }
      }, 0)
    }
  }, [selectedWordFileName, type])

  const selectFragment = e => {
    const parentNode = e.target.closest('p[id]') || {}
    const newId = parentNode.id
    if (newId) {
      dipatch(setFragmentForSearching(newId))

      if (fragmentForSearching) {
        const oldId = fragmentForSearching.replace(/ /g, '_')
        const node = document.getElementById(oldId)
        if (node) node.classList.remove('active-fragment')
      }

      const node = document.getElementById(newId)
      if (node) node.classList.add('active-fragment')
    }
  }
  return (
    <div
      dangerouslySetInnerHTML={htmlObj}
      className='Paragraphs-root'
      onClick={selectFragment}
    />
  )
}

export default MPParagraphs
