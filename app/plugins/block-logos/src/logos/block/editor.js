/**
 * External dependencies
 */
import classnames from 'classnames'
import { sum } from 'lodash'

/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks'
import {
  Placeholder,
  Toolbar,
} from '@wordpress/components'
import {
  dispatch,
  select,
} from '@wordpress/data'
import {
  BlockControls,
  InnerBlocks,
} from '@wordpress/editor'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

/**
 * Block edit component
 */
const Editor = (props) => {
  // Variables
  const {
    className,
    clientId,
  } = props

  const classes = classnames(
    className,
    `logos`,
  )

  const onAdd = () => {
    // Create a new logo block
    let newLogo = createBlock('tomodomo/logo')

    // Get the parent block
    let parent = select('core/editor').getBlock(clientId)

    // Insert the block at the end
    dispatch('core/editor').insertBlock(newLogo, parent.innerBlocks.length + 1, clientId)
  }

  const isEmpty = () => {
    let block = select('core/editor').getBlock(clientId)

    return (block.innerBlocks.length < 1) ? true : false
  }

  // UI for logos without any logos
  if (isEmpty()) {
    return (
      <Fragment>
        <BlockControls>
          <Toolbar controls={[
            {
              icon: 'plus-alt',
              onClick: onAdd,
              title: 'Add logo',
            },
          ]} />
        </BlockControls>
        <Placeholder
          key='tomodomo-block-logos__placeholder'
          icon='logos'
          label={__('Logos')}
          instructions={__('Add your first logo to this grid')}
        />
      </Fragment>
    )
  }

  // UI for logos with layout
  return (
    <Fragment>
      <BlockControls>
        <Toolbar controls={[
          {
            icon: 'plus-alt',
            onClick: onAdd,
            title: 'Add logo',
          },
        ]} />
      </BlockControls>
      <div className={classes}>
        <InnerBlocks
          allowedBlocks={[
            'tomodomo/logo',
          ]}
        />
      </div>
    </Fragment>
  )
}

export default Editor
