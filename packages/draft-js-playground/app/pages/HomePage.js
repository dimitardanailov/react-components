import React from 'react'

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js'

import PlaygroundEditor from '../components/PlaygroundEditor'
import convertFromHTMLToState from '../components/convertFromHTMLToState'

const imageURL =
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

const sampleMarkup = `
  <b>Bold text</b>, <i>Italic text</i><br/ ><br />
  <a href="https://www.google.com/">Google.com</a><br /><br/ >
  <img src="${imageURL}" height="272" width="92" />
`

const editorState = convertFromHTMLToState(sampleMarkup)
const contentState = editorState.getCurrentContent()
const rawData = convertToRaw(contentState)
const rawState = EditorState.createWithContent(convertFromRaw(rawData))

const emptyEditorState = convertFromHTMLToState('')

function HomePage() {
  return (
    <section>
      <section>
        <h2>Field without fieldValue</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          previousEditorState={emptyEditorState}
        />
      </section>

      <section>
        <h3>HTML content</h3>
        <code>{sampleMarkup}</code>
        <h3>Draftjs raw data equalent</h3>
        <code>{JSON.stringify(rawData)}</code>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          previousEditorState={rawState}
        />
      </section>
    </section>
  )
}

export default HomePage
