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
      link,
      svgName,
      svgParams,
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
          label={__('SVG Name')}
          value={svgName}
          onChange={(svgName) => {
            setAttributes({svgName})
          }}
        />
        <TextControl
          label={__('SVG Parameters')}
          help={__('Use the PHP query string format.')}
          value={svgParams}
          onChange={(svgParams) => {
            setAttributes({svgParams})
          }}
        />
        <TextControl
          label={__('Link')}
          value={link}
          onChange={(link) => {
            setAttributes({link})
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
