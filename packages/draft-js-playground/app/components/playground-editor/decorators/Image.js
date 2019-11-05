import React from 'react'
import PropTypes from 'prop-types'

import { ContentState } from 'draft-js'

import styled from 'styled-components'

const ImageFrame = styled.div`
  position: relative;

  display: inline-block;

  border: 2px solid #ccc;
  border-radius: 2px;
`

function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'IMAGE'
    )
  }, callback)
}

function Image({ contentState, entityKey }) {
  const { height, src, width } = contentState.getEntity(entityKey).getData()

  return (
    <ImageFrame>
      <figure>
        <img
          src={src}
          height={height}
          width={width}
          alt="simple custom decator element"
        />
      </figure>
    </ImageFrame>
  )
}

Image.propTypes = {
  contentState: PropTypes.instanceOf(ContentState),
  entityKey: PropTypes.string,
}

export { Image, findImageEntities }
