import React from 'react'

const Card = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      {...props}
    />
  )
})

Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card-header ${className}`}
      {...props}
    />
  )
})

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={`card-title ${className}`}
      {...props}
    />
  )
})

CardTitle.displayName = "CardTitle"

const CardBody = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card-body ${className}`}
      {...props}
    />
  )
})

CardBody.displayName = "CardBody"

export { Card, CardHeader, CardTitle, CardBody }