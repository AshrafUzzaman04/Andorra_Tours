import React from 'react'

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`form-control ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }