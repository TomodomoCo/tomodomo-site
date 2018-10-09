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
    attributes: {
      backgroundColor,
      customBackgroundColor,
      imageUrl,
    },
    className,
  } = props

  const backgroundClass = getColorClassName('background-color', backgroundColor)

  const classes = classnames({
    [backgroundClass]: backgroundClass,
    [className]: className,
    'logo-grid__logo': true,
  })

  const style = {
    backgroundColor: backgroundClass ? undefined : customBackgroundColor,
  }

  // UI
  return (
    <div
      className={classes}
      style={style}
    >
      <img src={imageUrl} />
    </div>
  )
}

export default Renderer
