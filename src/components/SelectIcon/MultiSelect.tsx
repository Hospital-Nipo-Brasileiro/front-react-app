import useInputContentWidth from './hooks/useInputContentWidth.tsx'
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SelectList from './SelectList.tsx'
import { SelectListItemProps } from './SelectListItem.tsx'
import TimesIcon from './TimesIcon.tsx'

export type MultiSelectOptionItem = {
  label: string
}

export type MultiSelectProps = {
  name: string
  label?: string
  size?: 'normal' | 'small'
  optionList: MultiSelectOptionItem[]
  placeholder?: string
  value?: string[]
  valueChange?: (newValue: string[]) => void
}

export default function MultiSelect(props: MultiSelectProps) {
  const [value, setValue] = useState(props.value || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [activeItem, setActiveItem] = useState<SelectListItemProps>()
  const [extraOptions, setExtraOptions] = useState<SelectListItemProps[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const inputContentWidth = useInputContentWidth(searchTerm, inputRef)
  const inputWidth = useMemo(() => {
    const listWidth = listRef.current?.offsetWidth || 0
    return listWidth > inputContentWidth ? inputContentWidth : listWidth
  }, [inputContentWidth])

  const optionList: SelectListItemProps[] = useMemo(() => {
    const defaultOptionList = [...props.optionList, ...extraOptions]
      .filter((option) => option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
      .map((option) => ({ ...option, selected: value?.includes(option.label) || false }))
    const tempOptions: SelectListItemProps[] = [{ label: searchTerm, selected: false }]
    if (defaultOptionList.length === 0) {
      setActiveItem(tempOptions[0])
      return tempOptions
    } else if (!defaultOptionList.find((opt) => opt.label === searchTerm) && searchTerm.length) {
      setActiveItem(tempOptions[0])
      return [...tempOptions, ...defaultOptionList]
    } else if (defaultOptionList.length === 1) {
      setActiveItem(defaultOptionList[0])
    }
    return defaultOptionList
  }, [props.optionList, value, searchTerm, extraOptions])

  const mappedValue: SelectListItemProps[] = useMemo(
    () =>
      value
        .map((label) => [...props.optionList, ...extraOptions].find((option) => option.label === label))
        .filter((option) => !!option) as SelectListItemProps[],
    [props.optionList, value, extraOptions],
  )

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const changeValue = (item?: SelectListItemProps) => {
    const usedItem = item || activeItem
    if (usedItem) {
      setSearchTerm('')
      let newValue: string[] = []
      if (value.includes(usedItem.label)) {
        newValue = value.filter((v) => v !== usedItem.label)
        if (extraOptions.find((opt) => opt.label === usedItem.label)) {
          setExtraOptions(extraOptions.filter((v) => v.label !== usedItem.label))
        }
      } else {
        newValue = [...value, usedItem.label]
        if (
          !props.optionList.find((opt) => opt.label === usedItem.label) &&
          !extraOptions.find((opt) => opt.label === usedItem.label)
        ) {
          setExtraOptions([...extraOptions, usedItem])
        }
      }
      setValue(newValue)
      if (props.valueChange) {
        props.valueChange(newValue)
      }
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      if (!activeItem) {
        setActiveItem(optionList[0])
      } else if (optionList.indexOf(activeItem) !== optionList.length - 1) {
        setActiveItem(optionList[optionList.indexOf(activeItem) + 1])
      }
    } else if (event.key === 'ArrowUp') {
      if (!activeItem) {
        setActiveItem(optionList[optionList.length - 1])
      } else if (optionList.indexOf(activeItem) !== 0) {
        setActiveItem(optionList[optionList.indexOf(activeItem) - 1])
      }
    } else if (event.key === 'Enter') {
      changeValue()
    } else if (event.key === 'Escape') {
      inputRef.current?.blur()
    } else if (event.key === 'Backspace') {
      if (searchTerm === '') {
        if (extraOptions.find((opt) => opt.label === value[value.length - 1])) {
          setExtraOptions(extraOptions.filter((v) => v.label !== value[value.length - 1]))
        }
        setValue(value.slice(0, value.length - 1))
      }
    }
  }

  const selectItem = (label: string) => {
    let item = [...props.optionList.map((opt) => ({ ...opt, selected: false })), ...extraOptions].find(
      (opt) => opt.label === label,
    )
    if (!item) {
      item = { label: searchTerm, selected: false }
    }
    changeValue(item)
  }

  const removeActiveItem = () => {
    setActiveItem(undefined)
  }

  const changeSearchTerm = useCallback((change: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(change.target.value)
  }, [])

  useEffect(() => {
    if (activeItem) {
      setActiveItem(optionList.find((option) => option.label === activeItem.label))
    }
  }, [optionList, activeItem])

  return (
    <div className={'relative ' + (props.size === 'small' ? 'text-sm' : '')}>
      {props.label && (
        <label htmlFor={props.name} className='text-sm font-semibold block'>
          {props.label}
        </label>
      )}
      <div
        onClick={focusInput}
        onKeyDown={handleKeyDown}
        onMouseMove={removeActiveItem}
        className={
          'bg-slate-100 group cursor-text relative flex justify-start gap-2 w-full rounded-xl border border-solid my-1 h-9 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-offset-white focus-within:ring-orange-600 focus-within:ring-offset-0 px-1 ' +
          (props.size === 'small' ? ' text-sm' : '')
        }
      >
        <ul className='flex items-center justify-start gap-1 flex-wrap max-w-full w-full' ref={listRef}>
          {(mappedValue || []).map((item) => (
            <li
              key={item.label}
              className='flex items-center justify-between bg-slate-100 rounded-lg p-1 gap-4 max-w-full'
            >
              <span className='whitespace-nowrap overflow-hidden text-ellipsis'>{item.label}</span>
              <span className='cursor-pointer' onClick={() => changeValue(item)}>
                <TimesIcon className='text-opacity-90 text-black text-sm w-2 hover:text-opacity-100' />
              </span>
            </li>
          ))}
          <li className='min-w-max pl-2' style={{ width: inputWidth }}>
            <input
              ref={inputRef}
              type='text'
              className='bg-slate-100 p-0 m-0 border-transparent focus:border-transparent focus:ring-0 w-full outline-none'
              id={props.name}
              name={props.name}
              autoComplete='off'
              value={searchTerm}
              onChange={changeSearchTerm}
              placeholder={value.length ? '' : props.placeholder}
            />
          </li>
        </ul>
        <div className='invisible max-w-full min-w-0 group-focus-within:visible left-0 shadow-lg rounded-lg bg-white border-borderGray border absolute top-full w-full mt-1'>
          <SelectList optionList={optionList} activeItem={activeItem} onSelect={selectItem} />
        </div>
      </div>
    </div>
  )
}