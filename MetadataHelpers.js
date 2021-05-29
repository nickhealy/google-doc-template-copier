const DOC_ITEM_TYPES = {
  LINK: 'link', 
  TEXT: 'text', 
  BREAK: 'break', 
  LIST: 'list', 
}

const BASE_META_DATA = {
  type: '', 
  text: '', 
  href: '',
  children: []
}

const breakMetaData = () => {
  return {
    ...BASE_META_DATA, 
    type: DOC_ITEM_TYPES.BREAK
  }
}

const linkMetaData = (text, href) => {
  return {
    ...BASE_META_DATA, 
    type: DOC_ITEM_TYPES.LINK, 
    text, 
    href,
  }
}

const textMetaData = (text) => {
  return {
    ...BASE_META_DATA, 
    type: DOC_ITEM_TYPES.TEXT, 
    text,
  }
}

const listMetaData = (children) => {
  return {
    ...BASE_META_DATA, 
    type: DOC_ITEM_TYPES.LIST, 
    children
  }
}

