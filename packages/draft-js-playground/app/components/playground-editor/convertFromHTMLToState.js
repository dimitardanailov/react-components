import { EditorState, ContentState, convertFromHTML } from 'draft-js'

function convertFromHTMLMarkup(markup) {
  const blocksFromHTML = convertFromHTML(markup)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  return state
}

function convertFromHTMLToStateDecator(markup, decator) {
  if (markup.length === 0) return EditorState.createEmpty()

  const state = convertFromHTMLMarkup(markup)
  const editorState = EditorState.createWithContent(state, decator)

  return editorState
}

export default function convertFromHTMLToState(markup) {
  if (markup.length === 0) return EditorState.createEmpty()

  const state = convertFromHTMLMarkup(markup)
  const editorState = EditorState.createWithContent(state)

  return editorState
}

export { convertFromHTMLToStateDecator, convertFromHTML }
