/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks'
import {
  PanelBody,
  TextControl,
} from '@wordpress/components'
import {
  dispatch,
  select,
} from '@wordpress/data'
import {
  ColorPalette,
  InspectorControls,
  PanelColorSettings,
} from '@wordpress/editor'
import { __ } from '@wordpress/i18n'

/**
 *
 * @param {object} props component props
 * @returns {object} Component
 */
const Inspector = (props) => {
  const {
    attributes: {
      imageUrl,
    },
    backgroundColor,
    setAttributes,
    setBackgroundColor,
  } = props

  // Inspector Controls
  return (
    <InspectorControls>
      <PanelBody title="Test">
        <TextControl
          label={__('Image URL')}
          value={imageUrl}
          onChange={(imageUrl) => {
            setAttributes({imageUrl})
          }}
        />
      </PanelBody>
      <PanelColorSettings
        title={__('Color Settings')}
        initialOpen={false}
        colorSettings={[
          {
            value: backgroundColor.color,
            onChange: setBackgroundColor,
            label: __('Background Color'),
          },
        ]}
      />
    </InspectorControls>
  )
}

export default Inspector
