/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/editor'

/**
 * Internal dependencies
 */
import Editor from './block/editor'
import Renderer from './block/renderer'

var settings = {
  title: __('Logo'),
  parent: [
    'tomodomo/logos'
  ],
  icon: 'columns',
  description: __('A single logo within the grid of logos.'),
  category: 'common',
  support: {
    inserter: false,
  },
  attributes: {
    backgroundColor: {
      type: 'string',
    },
    customBackgroundColor: {
      type: 'string',
    },
    imageUrl: {
      type: 'string',
      default: '',
    },
    link: {
      type: 'string',
      default: '',
    },
  },
  edit: Editor,
  save: Renderer,
}

/**
 * Register block
 */
registerBlockType('tomodomo/logo', settings)
