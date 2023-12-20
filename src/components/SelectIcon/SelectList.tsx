import SelectListItem, { SelectListItemProps } from './SelectListItem.tsx'
import React from 'react'

export type SelectListProps = {
  optionList: SelectListItemProps[]
  activeItem?: SelectListItemProps
  onSelect?: (label: string) => void
}

export default function SelectList(props: SelectListProps) {
  return (
    <ul className='max-h-44 overflow-y-auto max-w-full' tabIndex={0}>
      {props.optionList.map((option) => (
        <SelectListItem
          key={option.label}
          {...option}
          active={option === props.activeItem}
          hasActive={!!props.activeItem}
          onClick={props.onSelect}
        />
      ))}
    </ul>
  )
}