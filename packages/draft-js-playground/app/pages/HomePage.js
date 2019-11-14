import React from 'react'

import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  CompositeDecorator,
} from 'draft-js'

import styled from 'styled-components'

import PlaygroundEditor from '../components/playground-editor/Editor'
import convertFromHTMLToState, {
  convertFromHTMLToStateDecator,
} from '../components/playground-editor/convertFromHTMLToState'

import {
  Link,
  findLinkEntities,
} from '../components/playground-editor/decorators/Link'

import {
  Image,
  findImageEntities,
} from '../components/playground-editor/decorators/Image'

const Pre = styled.pre`
  position: relative;

  display: block;
  padding: 10px;

  background: #ccc;
  border-radius: 5px;
`

const Code = styled.code`
  display: block;
  white-space: pre-wrap;
`

const SectionExample = styled.section`
  position: relative;

  display: block;
  padding-bottom: 10px;
  border-bottom: 1px dashed #ccc;
`

const imageURL =
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

const sampleMarkup = `<b>Bold text</b>, <i>Italic text</i><br/ ><br />
<a href="https://www.google.com/">Google.com</a><br /><br/ >
<img src="${imageURL}" height="92" width="272" />
`

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
  {
    strategy: findImageEntities,
    component: Image,
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
    // console.log('contentState:', convertToRaw(childContentState))
  }

  return (
    <section>
      <SectionExample>
        <h2>Field without previousEditorState</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
        />
      </SectionExample>

      <SectionExample>
        <h2>Field without fieldValue</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={convertFromHTMLToState('')}
        />
      </SectionExample>

      <SectionExample>
        <h3>HTML content</h3>
        <Pre>
          <Code>{sampleMarkup}</Code>
        </Pre>
        <h3>Draftjs raw data equalent</h3>
        <Pre>
          <Code>{JSON.stringify(rawData)}</Code>
        </Pre>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={rawState}
        />
      </SectionExample>

      <SectionExample>
        <h2>Field without fieldValue. Decator is enable</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={convertFromHTMLToStateDecator('', decorator)}
        />
      </SectionExample>

      <SectionExample>
        <h2>Field with default error</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          parentTypingCallback={playgroundEditorTypingCallback}
          previousEditorState={convertFromHTMLToState('')}
          error
        />
      </SectionExample>
    </section>
  )
}

export default HomePage
