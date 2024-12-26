'use client'

import Link from "next/link"

export function CheckoutForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-2">
        <div className="">
        <input type="checkbox" id="terms" className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        </div>
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms" className="text-sm text-gray-500">
            Your personal data will be used to process your order, enhance your website experience, and for other purposes described in our{' '}
            <Link href="#" className="font-medium text-blue-600 underline underline-offset-4">
              privacy policy
            </Link>
            .
          </label>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <div className="">
        <input type="checkbox" id="terms2" required className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
        </div>
        <div className="grid gap-1.5 leading-none">
          <label htmlFor="terms2" className="text-sm text-gray-500">
            I have read and agree to the website{' '}
            <Link href="#" className="font-medium text-blue-600 underline underline-offset-4">
              terms and conditions
            </Link>
            *
          </label>
        </div>
      </div>
    </div>
  )
}

