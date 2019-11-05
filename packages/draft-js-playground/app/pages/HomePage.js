import React from 'react'

import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  CompositeDecorator,
} from 'draft-js'

import PlaygroundEditor from '../components/playground-editor/Editor'
import convertFromHTMLToState, {
  convertFromHTMLToStateDecator,
} from '../components/playground-editor/convertFromHTMLToState'

import {
  Link,
  findLinkEntities,
} from '../components/playground-editor/decorators/Link'

const imageURL =
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

const sampleMarkup = `
  <b>Bold text</b>, <i>Italic text</i><br/ ><br />
  <a href="https://www.google.com/">Google.com</a><br /><br/ >
  <img src="${imageURL}" height="272" width="92" />
`

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
])

const editorState = convertFromHTMLToState(sampleMarkup)
const contentState = editorState.getCurrentContent()
const rawData = convertToRaw(contentState)
const rawState = EditorState.createWithContent(
  convertFromRaw(rawData),
  decorator
)

function HomePage() {
  const playgroundEditorTypingCallback = childContentState => {
    console.log('contentState:', convertToRaw(childContentState))
  }

  return (
    <section>
      <section>
        <h2>Field without fieldValue</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={convertFromHTMLToState('')}
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
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={rawState}
        />
      </section>

      <section>
        <h2>Field without fieldValue. Decator is enable</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={convertFromHTMLToStateDecator('', decorator)}
        />
      </section>
    </section>
  )
}

export default HomePage
