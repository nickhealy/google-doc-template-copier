function renderSidebar() {
  const sidebarContent = HtmlService.createTemplateFromFile("Index").evaluate()
  DocumentApp.getUi().showSidebar(sidebarContent)
}

const onOpen = () => {
  const menu = DocumentApp.getUi().createMenu("Templates")
  menu.addItem('Get Templates', 'renderSidebar')
  menu.addItem('Reset templates', 'renderSidebar')
  menu.addToUi()
}


