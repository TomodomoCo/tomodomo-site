/**
 * External Dependencies
 */
import { filter } from 'lodash'

/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks'
import {
  PanelBody,
  Button,
  IconButton,
  BaseControl,
} from '@wordpress/components'
import {
  dispatch,
  select,
} from '@wordpress/data'
import { InspectorControls } from '@wordpress/editor'
import { Fragment } from '@wordpress/element'
import { __ } from '@wordpress/i18n'

/**
 *
 * @param {object} props component props
 * @returns {object} Component
 */
const Inspector = (props) => {
  const {
    attributes: {
      logos,
    },
    backgroundColor,
    clientId,
    setAttributes,
    setBackgroundColor,
  } = props

  /**
   * Add Logo
   */
  const onAddLogo = () => {
    const newLogo = 0

    // Create a new logo block
    const block = createBlock('tomodomo/logo')

    // Insert the block
    dispatch('core/editor').insertBlock(block, logos.length, clientId)

    // Update the logos attribute
    setAttributes({
      logos: logos.concat(newLogo),
    })
  }

  /**
   * Delete Logo
   */
  const onDeleteLogo = (logoIndex) => {
    // Grab all the blocks
    var logo = select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks[logoIndex]

    // Remove the nested block
    dispatch('core/editor').removeBlock(logo.clientId, false)

    // Update the attributes in the parent
    const updatedLogos = filter(logos, (logo, index) => (
      logoIndex !== index
    ))

    setAttributes({
      logos: updatedLogos,
    })
  }

  // Inspector Controls
  return (
    <InspectorControls>
      <PanelBody title={__('Logos')} initialOpen>
        {logos.map((logo, index) => (
          <Fragment key={`logo-${index}`}>
            <div className='tomodomo-block-logos__logo'>
              <Button
                onClick={() => onDeleteLogo(index)}
                className='tomodomo-block-logos__button--delete button-link-delete'
              >
                {__('Delete')}
              </Button>
            </div>
          </Fragment>
        ))}

        <IconButton
          icon='plus'
          className='button tomodomo-block-logos__button--add'
          onClick={onAddLogo}
        >
          {__('Add a Logo')}
        </IconButton>
      </PanelBody>
    </InspectorControls>
  )
}

export default Inspector
