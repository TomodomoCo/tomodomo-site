/**
 * External dependencies
 */
import classnames from 'classnames'
import { sum } from 'lodash'

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n'
import { Placeholder } from '@wordpress/components'
import { InnerBlocks } from '@wordpress/editor'
import { Fragment } from '@wordpress/element'

/**
 * Internal Dependencies
 */
import Inspector from '../block/inspector'

/**
 * Block edit component
 */
const Editor = (props) => {
  // Variables
  const {
    attributes: {
      logos,
    },
    className,
  } = props

  const classes = classnames(
    className,
    `logos`,
    `has-${logos.length}-logos`,
  )

  // UI for logos without any logos
  if (logos.length === 0 && sum(logos) < 1) {
    return (
      <Fragment>
        <Inspector {...{ ...props }} />
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
      <Inspector {...{ ...props }} />
      <div className={classes}>
        <InnerBlocks
          allowedBlocks={[
            'tomodomo/logo',
          ]}
          templateLock="all"
        />
      </div>
    </Fragment>
  )
}

export default Editor
