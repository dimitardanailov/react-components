import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState } from 'draft-js'

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

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef()

  // Store current value in ref
  useEffect(() => {
    ref.current = value
    console.log('value', value)
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

function PlaygroundEditor({
  placeholder,
  required,
  error,
  previousEditorState,
  parentTypingCallback,
}) {
  const [editorState, setEditorState] = React.useState(previousEditorState)

  // Get the previous value (was passed into hook on last render)
  const prevEditorState = usePrevious({ editorState })

  console.log('here ....')

  useEffect(() => {
    const contentState = editorState.getCurrentContent()
    parentTypingCallback(contentState)

    console.log(
      'plain text',
      previousEditorState.getCurrentContent().getPlainText()
    )

    console.log('plain text: current', contentState.getPlainText())
    contentState.getPlainText()

    /*
    console.log(
      'prevEditorState',
      prevEditorState.getCurrentContent().getPlainText()
    ) */

    if (required) {
      // eslint-disable-next-line no-use-before-define
      setRequiredFieldIsVisible(contentState.hasText())
    }
  }, [
    editorState,
    error,
    parentTypingCallback,
    prevEditorState,
    previousEditorState,
    required,
  ])

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
