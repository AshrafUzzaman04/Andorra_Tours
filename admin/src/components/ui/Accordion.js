import React from 'react'

const Accordion = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`accordion ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`accordion-item ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

AccordionItem.displayName = "AccordionItem"

const AccordionHeader = React.forwardRef(({ className, children, targetId, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={`accordion-header ${className}`}
      {...props}
    >
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${targetId}`}>
        {children}
      </button>
    </h2>
  )
})

AccordionHeader.displayName = "AccordionHeader"

const AccordionBody = React.forwardRef(({ className, children, id, ...props }, ref) => {
  return (
    <div
      ref={ref}
      id={id}
      className={`accordion-collapse collapse ${className}`}
      {...props}
    >
      <div className="accordion-body">
        {children}
      </div>
    </div>
  )
})

AccordionBody.displayName = "AccordionBody"

export { Accordion, AccordionItem, AccordionHeader, AccordionBody }