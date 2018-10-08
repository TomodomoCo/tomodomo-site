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
    className,
    attributes: {
      logos,
    },
  } = props

  const classes = classnames(
    className,
    'grid',
    `has-${logos}-logos`,
  )

  // UI
  return (
    <div className={classes}>
      <InnerBlocks.Content />
    </div>
  )
}

export default Renderer
