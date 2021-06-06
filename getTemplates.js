let inputVariables = {}

const getTemplateHeaders = () => {
  const headers = []
  for (const index of getHeadersPositions()) {
    headers.push({
      index,
      text: getTextForChild(index)
      })
  }
  return headers
}

const getHeadersPositions = () => {
  const headersPositions = []
  const document = getDocumentBody()
  for (let i = 0; i < document.getNumChildren(); i++) {
    const data = document.getChild(i).getAttributes()
    if (isTemplateHeader(data['HEADING'])) {
      headersPositions.push(i)
    }
  }

  return headersPositions
}

const getFullTemplate = (selectedHeaderIdx, nextHeaderIdx, variables) => {
  // set these in global state, so can use them later
  inputVariables = {
    ...variables
  }

  const numChildren = getDocumentBody().getNumChildren()
  const endLoopAt = selectedHeaderIdx < nextHeaderIdx 
    ? nextHeaderIdx
    : numChildren
  const returnArr = []
  // we don't want header part of our payload, so we start at one past 
  for (let i = selectedHeaderIdx + 1; i < endLoopAt; i++) {
    const child = getDocumentBody().getChild(i)
    if (isListItem(child)) {
      const {listMetaData, indexOffSet} = constructListFromIndex(i) 
      i += indexOffSet 
      returnArr.push(listMetaData)
    } else {
      returnArr.push(...constructItemsFromLine(child))
    }
    
    returnArr.push(breakMetaData())
  }

  return returnArr
}

// create an array of list items (children), starting from passed in index. return this array as the "children" of the list  
const constructListFromIndex = listIndex => {
  let currentChild = getChild(listIndex)
  const listItems = []
  while(isListItem(currentChild)) {
    listItems.push(constructItemsFromLine(currentChild))
    currentChild = currentChild.getNextSibling()
  }

  return {
    listMetaData: listMetaData(listItems), 
    // by how much we should increment the iteration counter
    indexOffSet: listItems.length - 1
  }
}


// translates line data from google docs into format the html generator can process
const constructItemsFromLine = line => {
  const lineText = line.getText()
  const metadataForLine = []
  let currentText = '';
  let currentLink = '';
  
  if (isEmptyLine(lineText)) {
      return metadataForLine
  }

  for (let i = 0; i < lineText.length; i++) {
    const linkUrl = line.asText().getLinkUrl(i)

    if (linkUrl) { 
      if (!currentLink) {
        // we are starting to read a new hyperlink, so we want to load up currently stored text
        if (currentText) {
          metadataForLine.push(textMetaData(currentText))
          currentText = ''
        }
        // store new hyperlink 
        currentLink = linkUrl
      }
    } else {
     if (currentLink) {
        // we have finished reading a hyperlink, so load the text and href to the return array and reset the cache
        metadataForLine.push(linkMetaData(currentText, currentLink))
        currentLink = ''
        currentText = ''
      } 
    }

    currentText += lineText[i]
  }
  // replace form variables with corresponding values 
  currentText = withTemplateVars(currentText)
  // cleanup whatever is left over
  if (currentLink) {
    metadataForLine.push(linkMetaData(currentText, currentLink))
  } else if (currentText){
    metadataForLine.push(textMetaData(currentText))
  }

  return metadataForLine
}

const withTemplateVars = text => {
  return text.replace(/<contact>|<company>/gi, matched => inputVariables[matched])
}



