/**
 * External dependencies
 */
import classnames from 'classnames'

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n'
import {
  TextControl,
  Toolbar,
} from '@wordpress/components'
import {
  dispatch,
  select,
} from '@wordpress/data'
import {
  BlockControls,
  ColorPalette,
  withColors,
  getColorClassName,
} from '@wordpress/editor'
import { Fragment } from '@wordpress/element'

/**
 * Internal Dependencies
 */
import DropdownButton from '../../components/dropdown-button'
import Inspector from './inspector'

/**
 * Block edit component
 */
const Editor = withColors('backgroundColor')((props) => {
  // Variables
  const {
    attributes: {
      customBackgroundColor,
      imageUrl,
    },
    backgroundColor,
    className,
    clientId,
    setBackgroundColor,
  } = props

  const backgroundClass = getColorClassName('background-color', backgroundColor.slug)

  const classes = classnames({
    [backgroundClass]: backgroundClass,
    [className]: true,
    'logos__logo': true,
  })

  const style = {
    backgroundColor: backgroundClass ? undefined : customBackgroundColor,
  }

  const onDelete = () => {
    dispatch('core/editor').removeBlock(clientId, false)
  }

  // UI for columns with layout
  return (
    <Fragment>
      <Inspector {...{ ...props }} />
      <BlockControls>
        <Toolbar>
          <DropdownButton
            icon="admin-appearance"
            title="Choose background color"
            buttonProps={{
              style: {
                color: backgroundColor.color,
              }
            }}
            renderContent={() => {
              return (
                <ColorPalette
                  onChange={setBackgroundColor}
                  value={backgroundColor.color}
                />
              )
            }}
          />
        </Toolbar>
        <Toolbar controls={[
          {
            icon: 'trash',
            onClick: onDelete,
            title: 'Delete',
          },
        ]} />
      </BlockControls>
      <div
        className={classes}
        style={style}
      >
        <img src={imageUrl} />
      </div>
    </Fragment>
  )
})

export default Editor
