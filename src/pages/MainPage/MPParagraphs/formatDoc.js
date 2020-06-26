/* eslint-disable */
export default (docHtml, docName, allDocsFragments) => {
  console.log('docHtml', docHtml);
  console.log('docName', docName);
  console.log('allDocsFragments', allDocsFragments);
  let formatted = docHtml.replace(/(?:\r\n|\r|\n)/g, ' ').replace(/\s\s+/g, ' ')
  formatted = formatted.replace(/ALIGN=JUSTIFY/g, 'class=western')
  const ids = []
  const countObj = {}
  const wrapElement = fr => { // side effect function
    const pos = formatted.indexOf(fr)
    if (!countObj[fr]) { countObj[fr] = 0 }
    countObj[fr]++

    if (ids.includes(fr)) return
    if (pos < 1) return
    ids.push(fr)
    const symbolsBeforeWrapperFr = formatted.slice(0, pos)
    const newWrappedFr = `<span name=${fr.replace(/ /g, '_')}><a id='noneStyleDecoration' style='color: rgb(0,0,0,0.65)' id='${fr}'>${fr}</a></span>`
    const symbolsAfterWrapperFr = formatted.slice(pos + fr.length)

    formatted = `${symbolsBeforeWrapperFr}${newWrappedFr}${symbolsAfterWrapperFr}`
  }

  const fragments = allDocsFragments[docName] || []

  fragments.forEach(fr => {
    const frToCut = 67
    const frCutted = fr['Фрагмент 1'].substring(0) // "Настоящий Порядок разработан в соответствии с подп"
    wrapElement(frCutted)
  })
  console.log('countObj', countObj);
  return { formatted, countObj, ids }
}
