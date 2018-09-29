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
      <PanelColor title={__('Background Color')} colorValue={backgroundColor.value} colorName={backgroundColor.name}>
        <ColorPalette onChange={setBackgroundColor} value={backgroundColor.value} />
      </PanelColor>
    </InspectorControls>
  )
}

export default Inspector
