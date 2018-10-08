/**
 * WordPress Dependencies
 */
import {
  Dropdown,
  IconButton,
} from '@wordpress/components'

const DropdownButton = (props) => {
  const {
    buttonProps,
    dropdownProps,
    icon,
    renderContent,
    title,
  } = props

  const openOnArrowDown = (event) => {
    if (!isOpen && event.keyCode === DOWN) {
      event.preventDefault()
      event.stopPropagation()
      onToggle
    }
  }

  return (
    <Dropdown
      position="bottom right"
      renderToggle={({onToggle, isOpen}) => {
        return (
          <IconButton
            icon={icon}
            onClick={onToggle}
            title={title}
            onKeyDown={openOnArrowDown}
            aria-expanded={openOnArrowDown}
            aria-haspopup="true"
            className="components-toolbar__control"
            {...buttonProps}
          />
        )
      }}
      renderContent={(args) => {
        return renderContent(args)
      }}
      {...dropdownProps}
    />
  )
}

export default DropdownButton
