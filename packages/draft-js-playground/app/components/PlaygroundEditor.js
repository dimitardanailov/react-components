import React from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js'

import 'draft-js/dist/Draft.css'

import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ErrorText = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 300;
  color: red;
`

function RequiredField() {
  return <ErrorText>Required</ErrorText>
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

function PlaygroundEditor({
  placeholder,
  required,
  error,
  previousEditorState,
  parentTypingCallback,
}) {
  const [editorState, setEditorState] = React.useState(previousEditorState)

  React.useEffect(() => {
    const contentState = editorState.getCurrentContent()
    parentTypingCallback(contentState)

    if (required) {
      // eslint-disable-next-line no-use-before-define
      setRequiredFieldIsVisible(contentState.hasText())
    }
  }, [editorState, parentTypingCallback, required])

  const [requiredFieldIsHidden, setRequiredFieldIsVisible] = React.useState(
    !error
  )

  return (
    <Wrapper>
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        onChange={setEditorState}
      />

      {!requiredFieldIsHidden && <RequiredField />}
    </Wrapper>
  )
}

PlaygroundEditor.defaultProps = {
  placeholder: '',
  required: false,
  error: false,
  previousEditorState: EditorState.createEmpty(),
}

PlaygroundEditor.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  previousEditorState: PropTypes.instanceOf(EditorState),
  parentTypingCallback: PropTypes.func,
}

export default PlaygroundEditor
