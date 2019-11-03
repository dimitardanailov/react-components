import React from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js'

function RequiredField() {
  return <div>Required</div>
}

function convertFromHTMLToState(markup) {
  if (markup.length === 0) return ContentState.createFromText(markup)

  const blocksFromHTML = convertFromHTML(markup)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  )

  return state
}

function PlaygroundEditor({ placeholder, fieldValue, required, error }) {
  const state = convertFromHTMLToState(fieldValue)
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(state)
  )

  React.useEffect(() => {
    const contentState = editorState.getCurrentContent()

    if (required) {
      // eslint-disable-next-line no-use-before-define
      setRequiredFieldIsVisible(contentState.hasText())
    }
  }, [editorState, required])

  const [requiredFieldIsHidden, setRequiredFieldIsVisible] = React.useState(
    !error
  )

  return (
    <div>
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        onChange={setEditorState}
      />

      {!requiredFieldIsHidden && <RequiredField />}
    </div>
  )
}

PlaygroundEditor.defaultProps = {
  placeholder: '',
  fieldValue: '',
  required: false,
  error: false,
}

PlaygroundEditor.propTypes = {
  placeholder: PropTypes.string,
  fieldValue: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
}

export default PlaygroundEditor
