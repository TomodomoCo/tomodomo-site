/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks'
import {
  PanelBody,
  Button,
  IconButton,
  BaseControl,
  PanelColor,
} from '@wordpress/components'
import {
  dispatch,
  select,
} from '@wordpress/data'
import {
  ColorPalette,
  InspectorControls,
} from '@wordpress/editor'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

/**
 *
 * @param {object} props component props
 * @returns {object} Component
 */
const Inspector = (props) => {
  const {
    backgroundColor,
    setBackgroundColor,
  } = props

  // Inspector Controls
  return (
    <InspectorControls>
      <PanelColorSettings
        title={ __( 'Color Settings' ) }
        initialOpen={ false }
        colorSettings={ [
          {
            value: backgroundColor.color,
            onChange: setBackgroundColor,
            label: __( 'Background Color' ),
          },
        ] }
      />
    </InspectorControls>
  )
}

export default Inspector
