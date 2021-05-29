const capitalize = str => {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
}

const isTemplateHeader = header => {
  return header === DocumentApp.ParagraphHeading.HEADING3
}

const isListItem = item => {
  return item.getType() === DocumentApp.ElementType.LIST_ITEM
}

const isEmptyLine = line => {
  return line === '' || line === ' ' || line === '  '
}

const isNewLink = (currentLink, currentText) => {
  return !currentLink && !!currentText
}

const getDocumentBody = () => {
  return DocumentApp.getActiveDocument().getBody()
}

const getChild = index =>{
  return getDocumentBody().getChild(index)
}

const getTextForChild = index => {
  debugger
  let child = getDocumentBody().getChild(index)
  let otherThing = child.asParagraph().getText()
  debugger
  return otherThing
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

