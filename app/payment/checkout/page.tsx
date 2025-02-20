"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/authContext"
import { useCart } from "../../context/cartContext"
import { useOrders } from "../../context/orderContext"
import { Button } from "../../components/ui/Button"
import { motion, AnimatePresence } from "framer-motion"
import { User, ShoppingBasket, Check, X, CreditCard } from "lucide-react"
import type { PaymentMethod, Order, OrderItem } from "@/lib/types/user"

interface PaymentFormData {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
}

interface CheckoutForm {
  name: string
  email: string
  phone?: string
  address: {
    street: string
    city: string
    state: string
    postcode: string
    country: string
  }
  paymentMethod: PaymentFormData | PaymentMethod
}

const steps = [
  { number: 1, title: "Account", icon: User },
  { number: 2, title: "Details", icon: ShoppingBasket },
  { number: 3, title: "Payment", icon: CreditCard },
  { number: 4, title: "Review", icon: Check }
]

export default function CheckoutPage() {
  const { user } = useAuth()
  const { cartItems, cartTotal, clearCart } = useCart()
  const { addOrder } = useOrders()
  const router = useRouter()
  const [step, setStep] = useState(user ? 2 : 1)
  const [isGuest, setIsGuest] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")

  const [formData, setFormData] = useState<CheckoutForm>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      postcode: user?.address?.postcode || "",
      country: user?.address?.country || "",
    },
    paymentMethod: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
    },
  })

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderItems: OrderItem[] = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    const defaultPaymentMethod: PaymentMethod = {
      id: 'default',
      type: 'card',
      cardBrand: 'Default',
      last4: '****',
      expiryMonth: '**',
      expiryYear: '****',
      cardType: 'Default'
    };

    const orderData: Order = {
      id: `order_${Date.now()}`,
      items: orderItems,
      total: cartTotal,
      shippingAddress: formData.address,
      paymentMethod: user?.paymentMethods?.find((m) => m.id === selectedPaymentMethod) ?? defaultPaymentMethod,
      status: 'pending',
      date: new Date().toISOString()
    };

    await addOrder(orderData)
    clearCart()
    setShowConfirmModal(false)
    if (user) {
      router.push("/account/profile")
    } else {
      router.push("/")
    }
  }

  const handleCancelOrder = () => {
    clearCart()
    setShowCancelModal(false)
    if (user) {
      router.push("/account/profile")
    } else {
      router.push("/")
    }
  }

  const isPaymentFormData = (payment: PaymentFormData | PaymentMethod): payment is PaymentFormData => {
    return "cardNumber" in payment
  }

  const getPaymentFormValue = (field: keyof PaymentFormData) => {
    if (isPaymentFormData(formData.paymentMethod)) {
      return formData.paymentMethod[field]
    }
    return ""
  }

  const renderPaymentMethod = (method: PaymentMethod) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <CreditCard className="h-6 w-6 text-gray-500" />
        <div>
          <p className="font-medium">{method.cardBrand} •••• {method.last4}</p>
          <p className="text-sm text-gray-500">
            Expires {method.expiryMonth}/{method.expiryYear}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="relative">
            {/* Step Connector Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            
            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((s) => {
                const isActive = s.number <= step
                const isPast = s.number < step
                const Icon = s.icon
                
                return (
                  <div key={s.number} className="flex flex-col items-center">
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-200 bg-white
                        ${isActive 
                          ? 'border-green-600 text-green-600' 
                          : 'border-gray-300 text-gray-300'
                        }
                        ${isPast ? 'bg-green-600 text-white border-green-600' : ''}
                      `}
                    >
                      <Icon className="w-6 h-6" />
                      {isPast && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Check className="w-6 h-6 text-white" />
                        </motion.div>
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {s.title}
                      </div>
                      <div className={`text-xs ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                        Step {s.number}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Step 1: Authentication Choice */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Choose Checkout Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Button
                  onClick={() => {
                    setIsGuest(true)
                    setStep(2)
                  }}
                  className="p-6 h-auto flex flex-col items-center"
                >
                  <ShoppingBasket className="w-8 h-8 mb-2" />
                  <span>Continue as Guest</span>
                </Button>
                <Button
                  onClick={() => router.push("/account/login")}
                  className="p-6 h-auto flex flex-col items-center bg-white text-green-600 border border-green-600 hover:bg-green-50"
                >
                  <User className="w-8 h-8 mb-2" />
                  <span>Sign In</span>
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address.street" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address.street"
                      id="address.street"
                      value={formData.address.street}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      id="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      id="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address.postcode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="address.postcode"
                      id="address.postcode"
                      value={formData.address.postcode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      id="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                </div>
              </form>
              <Button onClick={() => setStep(3)} className="w-full">
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
              {user?.paymentMethods && user.paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {user.paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPaymentMethod === method.id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="mr-4 text-green-600 focus:ring-green-500"
                      />
                      {renderPaymentMethod(method)}
                    </label>
                  ))}
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="paymentMethod.cardholderName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="paymentMethod.cardholderName"
                      id="paymentMethod.cardholderName"
                      value={getPaymentFormValue("cardholderName")}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="paymentMethod.cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="paymentMethod.cardNumber"
                      id="paymentMethod.cardNumber"
                      value={getPaymentFormValue("cardNumber")}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      maxLength={16}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="paymentMethod.expiryMonth"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Month
                      </label>
                      <input
                        type="text"
                        name="paymentMethod.expiryMonth"
                        id="paymentMethod.expiryMonth"
                        value={getPaymentFormValue("expiryMonth")}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        maxLength={2}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="paymentMethod.expiryYear"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Year
                      </label>
                      <input
                        type="text"
                        name="paymentMethod.expiryYear"
                        id="paymentMethod.expiryYear"
                        value={getPaymentFormValue("expiryYear")}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        maxLength={4}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="paymentMethod.cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="paymentMethod.cvv"
                        id="paymentMethod.cvv"
                        value={getPaymentFormValue("cvv")}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </form>
              )}
              <Button onClick={() => setStep(4)} className="w-full">
                Review Order
              </Button>
            </div>
          )}

          {/* Step 4: Order Review */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">Review Order</h2>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Items</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} x ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p>{formData.name}</p>
                  <p>{formData.address.street}</p>
                  <p>
                    {formData.address.city}, {formData.address.state} {formData.address.postcode}
                  </p>
                  <p>{formData.address.country}</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  {user?.paymentMethods && selectedPaymentMethod ? (
                    <div>
                      {renderPaymentMethod(user.paymentMethods.find((m) => m.id === selectedPaymentMethod) as PaymentMethod)}
                    </div>
                  ) : (
                    <div className="payment-method-display">
                      <p className="text-sm text-gray-600">
                        {isPaymentFormData(formData.paymentMethod) &&
                          `Card ending in ${formData.paymentMethod.cardNumber.slice(-4)}`}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-xl font-semibold flex justify-between">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button onClick={() => setShowCancelModal(true)} variant="outline" className="w-1/2">
                  Cancel Order
                </Button>
                <Button onClick={() => setShowConfirmModal(true)} className="w-1/2">
                  Confirm Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-6 text-green-600">
                    <Check size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Confirm Order</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">Are you sure you want to place this order?</p>
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button onClick={() => setShowConfirmModal(false)} variant="outline" className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="w-full sm:w-auto">
                      Confirm
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-6 text-red-600">
                    <X size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Cancel Order</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">Are you sure you want to cancel this order?</p>
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button onClick={() => setShowCancelModal(false)} variant="outline" className="w-full sm:w-auto">
                      Go Back
                    </Button>
                    <Button onClick={handleCancelOrder} variant="destructive" className="w-full sm:w-auto">
                      Cancel Order
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function getCardBrand(cardNumber: string): string {
  if (cardNumber.startsWith("4")) return "Visa"
  if (cardNumber.startsWith("5")) return "Mastercard"
  if (cardNumber.startsWith("3")) return "American Express"
  if (cardNumber.startsWith("6")) return "Discover"
  return "Unknown"
}

