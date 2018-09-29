/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import {
  InnerBlocks,
  getColorClassName,
} from '@wordpress/editor'

/**
 * Block render component
 */
const Renderer = (props) => {
  const {
    className,
    attributes: {
      backgroundColor,
    },
  } = props

  const classes = classnames(
    className,
    'logos__logo',
    getColorClassName('background', backgroundColor),
  )

  // UI
  return (
    <div className={classes}>
      <InnerBlocks.Content />
    </div>
  )
}

export default Renderer
