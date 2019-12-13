import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Editor, EditorState, RichUtils } from 'draft-js'

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
  }, [value]) // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current
}

function oldEditorStateIsValid(oldPreviousState) {
  const isValid =
    typeof oldPreviousState === 'object' &&
    'editorState' in oldPreviousState &&
    oldPreviousState.editorState instanceof EditorState

  return isValid
}

function oldStateShouldBeDifferent(oldPreviousState, editorState) {
  const oldText = oldPreviousState.editorState
    .getCurrentContent()
    .getPlainText()
  const currentText = editorState.getCurrentContent().getPlainText()

  return currentText !== oldText
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
  const oldPreviousState = usePrevious({ editorState })

  useEffect(() => {
    const contentState = editorState.getCurrentContent()
    parentTypingCallback(contentState)

    const isValid = oldEditorStateIsValid(oldPreviousState)
    let oldEditorStateTextIsValid = false
    if (isValid) {
      oldEditorStateTextIsValid = oldStateShouldBeDifferent(
        oldPreviousState,
        editorState
      )
    }

    if (required && isValid && oldEditorStateTextIsValid) {
      // eslint-disable-next-line no-use-before-define
      setRequiredFieldIsVisible(contentState.hasText())
    }
  }, [editorState, oldPreviousState, parentTypingCallback, required])

  const [requiredFieldIsHidden, setRequiredFieldIsVisible] = React.useState(
    !error
  )

  useEffect(() => {
    setRequiredFieldIsVisible(!error)
  }, [error])

  const toggleBulletPoints = () => {
    updateEditorStateByRichUtilsCommand('unordered-list-item')
  }

  const toggleOrderList = () => {
    updateEditorStateByRichUtilsCommand('ordered-list-item')
  }

  function updateEditorStateByRichUtilsCommand(command) {
    setEditorState(
      RichUtils.toggleBlockType(
        editorState,
        command
      )
    )
  }

  return (
    <Wrapper>
      <section>
        <button onClick={toggleBulletPoints}>Bullet points</button>
        <button onClick={toggleOrderList}>Order List</button>
      </section>
      
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
  parentTypingCallback: PropTypes.func.isRequired,
}

export default PlaygroundEditor
