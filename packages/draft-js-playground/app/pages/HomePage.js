import React from 'react'

import PlaygroundEditor from '../components/PlaygroundEditor'

const imageURL =
  'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'

const sampleMarkup = `
<b>Bold text</b>, <i>Italic text</i><br/ ><br />
<a href="https://www.google.com/">Google.com</a><br /><br/ >
<img src="${imageURL}" height="272" width="92" />
`

function HomePage() {
  return (
    <section>
      <section>
        <h2>Field without fieldValue</h2>
        <PlaygroundEditor placeholder="Simple placeholder" required />
      </section>

      <section>
        <h2>Sample HTML converted into Draft content:</h2>
        <PlaygroundEditor
          placeholder="Simple placeholder"
          required
          fieldValue={sampleMarkup}
        />
      </section>
    </section>
  )
}

export default HomePage
