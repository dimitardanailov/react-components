import { EditorState, ContentState, convertFromHTML } from 'draft-js'

export default function convertFromHTMLToState(markup) {
  if (markup.length === 0) return EditorState.createEmpty()

  const blocksFromHTML = convertFromHTML(markup)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  const editorState = EditorState.createWithContent(state)

  return editorState
}
