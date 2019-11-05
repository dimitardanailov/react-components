import React from 'react'
import PropTypes from 'prop-types'

import { ContentState } from 'draft-js'

import styled from 'styled-components'

const CustomLink = styled.a`
  font-weight: bold;
  color: #cc0000;
`

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    )
  }, callback)
}

function Link({ contentState, entityKey, children }) {
  const { url } = contentState.getEntity(entityKey).getData()

  return <CustomLink href={url}>{children}</CustomLink>
}

Link.propTypes = {
  contentState: PropTypes.instanceOf(ContentState),
  entityKey: PropTypes.string,
  children: PropTypes.array,
}

export { Link, findLinkEntities }
