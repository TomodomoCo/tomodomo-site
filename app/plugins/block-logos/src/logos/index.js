/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'

/**
 * Internal Dependencies
 */
import Editor from './block/editor'
import Renderer from './block/renderer'
import '../style/style.scss'
import '../style/editor.scss'

var settings = {
  title: __('Logos'),
  description: __(
    'Insert a grid of logos.'
  ),
  keyword: [
    __('logos'),
    __('tomodomo'),
  ],
  icon: {
    background: '#963f69',
    foreground: '#FFFFFF',
    src: 'columns',
  },
  category: 'layout',
  attributes: {
    logos: {
      type: 'array',
      default: [],
    },
  },
  edit: Editor,
  save: Renderer,
  supports: {
    align: [
      'left',
      'right',
      'center',
      'wide',
      'full',
    ],
    customClassName: true,
  },
}

/**
 * Register block
 */
registerBlockType('tomodomo/logos', settings)
