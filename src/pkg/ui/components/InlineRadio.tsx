import { useCallback } from 'react'

type RadioOption = {
  label: string
  value: string | number | boolean | undefined
}

type RadioOptionValue = string | number | boolean | undefined
type Props = {
  label: string
  name: string
  value: RadioOptionValue
  options: RadioOption[]
  onChange: (newValue: RadioOptionValue) => void
}

export default function InlineRadio({
  name,
  value,
  label,
  options,
  onChange,
}: Props) {
  function genId(optLabel: string) {
    return `id-${label}-${optLabel.replace(' ', '-')}`
  }

  const handleOnChange = useCallback(
    (newVal: RadioOptionValue) => {
      onChange(newVal)
    },
    [onChange]
  )

  return (
    <div className="flex gap-4">
      <div className="w-20">
        <span>{label}</span>
      </div>
      <div className="flex gap-2">
        {options.map((opt, index) => (
          <label
            key={index}
            className=" flex cursor-pointer gap-1 items-center justify-center"
            htmlFor={genId(opt.label)}>
            <input
              type="radio"
              id={genId(opt.label)}
              name={name}
              onChange={() => handleOnChange(opt.value)}
              className="cursor-pointer"
              checked={opt.value === value}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
