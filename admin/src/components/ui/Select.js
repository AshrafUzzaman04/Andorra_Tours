import React from 'react'

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`form-select ${className}`}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

const Option = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <option
      ref={ref}
      className={className}
      {...props}
    />
  )
})

Option.displayName = "Option"

export { Select, Option }