import React from 'react'

const Button = React.forwardRef(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : ""
  
  return (
    <button
      ref={ref}
      className={`btn btn-${variant} ${sizeClass} ${className}`}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }