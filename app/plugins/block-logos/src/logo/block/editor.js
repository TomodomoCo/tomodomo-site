/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  InnerBlocks,
  withColors,
  getColorClassName,
} from '@wordpress/editor'
import { Fragment } from '@wordpress/element'

/**
 * Internal Dependencies
 */
import Inspector from '../block/inspector'

/**
 * Block edit component
 */
const Editor = withColors('backgroundColor')((props) => {
  // Variables
  const {
    attributes: {
      backgroundColor,
    },
    className,
  } = props

  const classes = classnames(
    className,
    `logos__logo`,
    getColorClassName('background', backgroundColor),
  )

  // UI for columns with layout
  return (
    <Fragment>
      <Inspector {...{ ...props }} />
      <div className={classes}>
        <InnerBlocks
          allowedBlocks="all"
          templateLock={false}
        />
      </div>
    </Fragment>
  )
})

export default Editor
