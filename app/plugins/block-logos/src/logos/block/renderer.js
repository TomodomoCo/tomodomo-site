/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/editor'

/**
 * Block render component
 */
const Renderer = (props) => {
  const {
    attributes: {
      logos,
    },
    className,
  } = props

  const classes = classnames({
    [className]: className,
    'logos': true,
  })

  // UI
  return (
    <div className={classes}>
      <InnerBlocks.Content />
    </div>
  )
}

export default Renderer
