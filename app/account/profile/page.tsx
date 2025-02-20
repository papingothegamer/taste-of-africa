"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../context/authContext"
import { useWishlist } from "../../context/wishlistContext"
import { useCart } from "../../context/cartContext"
import { useOrders } from "../../context/orderContext"
import { Button } from "../../components/ui/Button"
import {
  User,
  ShoppingBasket,
  Heart,
  LogOut,
  TriangleAlert,
  CreditCard,
  Plus,
  Trash2,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import ProductCard from "../../components/ProductCard"
import { motion, AnimatePresence } from "framer-motion"
import type { UserAddress, PaymentMethod } from "@/lib/types/user"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface ExtendedFormData {
  name: string
  email: string
  phone: string
  address: UserAddress
}

interface NewCardState {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
}

interface ExpandedOrders {
  [key: string]: boolean
}

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { orders } = useOrders()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showAddCard, setShowAddCard] = useState(false)
  const [expandedOrders, setExpandedOrders] = useState<ExpandedOrders>({})
  const [newCard, setNewCard] = useState<NewCardState>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  })
  const [formData, setFormData] = useState<ExtendedFormData>({
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
  })

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = () => {
    logout()
    setShowLogoutModal(false)
    router.push("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      if (parent === "address") {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [child]: value,
          },
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(formData)
    setIsEditing(false)
  }

  const handleDeleteAccount = () => {
    logout()
    localStorage.clear()
    setShowDeleteModal(false)
    router.push("/")
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    const last4 = newCard.cardNumber.slice(-4)
    const cardBrand = getCardBrand(newCard.cardNumber)

    const paymentMethod: PaymentMethod = {
      id: `card_${Date.now()}`,
      type: "card",
      cardBrand,
      last4,
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: !user?.paymentMethods?.length,
    }

    updateUser({
      ...user,
      paymentMethods: [...(user?.paymentMethods || []), paymentMethod],
    })

    setShowAddCard(false)
    setNewCard({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
    })
  }

  const handleRemoveCard = (cardId: string) => {
    if (user?.paymentMethods) {
      const updatedMethods = user.paymentMethods.filter((method) => method.id !== cardId)
      updateUser({
        ...user,
        paymentMethods: updatedMethods,
      })
    }
  }

  const handleSetDefaultCard = (cardId: string) => {
    if (user?.paymentMethods) {
      const updatedMethods = user.paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === cardId,
      }))
      updateUser({
        ...user,
        paymentMethods: updatedMethods,
      })
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  if (!user) {
    router.push("/account/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Sidebar */}
          <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "bg-gray-50 text-green-600 hover:bg-white"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <User
                  className={`${
                    activeTab === "profile" ? "text-green-600" : "text-gray-400"
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`${
                  activeTab === "orders"
                    ? "bg-gray-50 text-green-600 hover:bg-white"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <ShoppingBasket
                  className={`${
                    activeTab === "orders" ? "text-green-600" : "text-gray-400"
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Orders</span>
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`${
                  activeTab === "wishlist"
                    ? "bg-gray-50 text-green-600 hover:bg-white"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <Heart
                  className={`${
                    activeTab === "wishlist" ? "text-green-600" : "text-gray-400"
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Wishlist</span>
              </button>

              <button
                onClick={() => setActiveTab("payment")}
                className={`${
                  activeTab === "payment"
                    ? "bg-gray-50 text-green-600 hover:bg-white"
                    : "text-gray-900 hover:text-gray-900 hover:bg-gray-50"
                } group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full`}
              >
                <CreditCard
                  className={`${
                    activeTab === "payment" ? "text-green-600" : "text-gray-400"
                  } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                />
                <span className="truncate">Payment Methods</span>
              </button>

              <button
                onClick={handleLogoutClick}
                className="text-gray-900 hover:text-gray-900 hover:bg-gray-50 group rounded-md px-3 py-2 flex items-center text-sm font-medium w-full"
              >
                <LogOut className="text-gray-400 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                <span className="truncate">Log out</span>
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            {activeTab === "profile" && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                        <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>
                      </div>
                      <Button type="button" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                            !isEditing ? "bg-gray-50" : ""
                          }`}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                            !isEditing ? "bg-gray-50" : ""
                          }`}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                            !isEditing ? "bg-gray-50" : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">Address</h3>
                      <div className="mt-6 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="address.street"
                            id="address.street"
                            value={formData.address.street}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                              !isEditing ? "bg-gray-50" : ""
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            id="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                              !isEditing ? "bg-gray-50" : ""
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="address.state" className="block text-sm font-medium text-gray-700">
                            State / Province
                          </label>
                          <input
                            type="text"
                            name="address.state"
                            id="address.state"
                            value={formData.address.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                              !isEditing ? "bg-gray-50" : ""
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-2">
                          <label htmlFor="address.postcode" className="block text-sm font-medium text-gray-700">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="address.postcode"
                            id="address.postcode"
                            value={formData.address.postcode}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                              !isEditing ? "bg-gray-50" : ""
                            }`}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="address.country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <input
                            type="text"
                            name="address.country"
                            id="address.country"
                            value={formData.address.country}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                              !isEditing ? "bg-gray-50" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                        Save changes
                      </Button>
                    </div>
                  )}
                </form>

                <div className="px-4 py-3 bg-gray-50 sm:px-6">
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Order History</h3>
                  <p className="mt-2 text-sm text-gray-500 mb-6">View your past orders and their status.</p>

                  {orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
                        >
                          {/* Clickable Order Card Header */}
                          <button onClick={() => toggleOrderExpansion(order.id)} className="w-full text-left">
                            <div className="p-4 bg-white">
                              {/* Top Section */}
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="text-lg font-medium text-gray-900">Order #{order.id}</h4>
                                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                                  <p className="text-sm text-gray-500">
                                    Paid with {order.paymentMethod.cardBrand} •••• {order.paymentMethod.last4}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                      order.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "processing"
                                          ? "bg-blue-100 text-blue-800"
                                          : order.status === "shipped"
                                            ? "bg-purple-100 text-purple-800"
                                            : order.status === "delivered"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                              </div>

                              {/* Items Preview Row */}
                              <div className="flex items-center space-x-2">
                                {order.items.slice(0, 5).map((item) => (
                                  <div key={item.id} className="relative w-12 h-12">
                                    <img
                                      src={item.image || "/images/placeholder.jpg"}
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded-md"
                                    />
                                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                      {item.quantity}
                                    </span>
                                  </div>
                                ))}
                                {order.items.length > 5 && (
                                  <div className="flex items-center text-gray-500">
                                    <Plus className="h-4 w-4" />
                                    <span className="text-sm">{order.items.length - 5}</span>
                                  </div>
                                )}
                              </div>

                              {/* Expand/Collapse Icon */}
                              <div className="flex justify-center mt-2">
                                {expandedOrders[order.id] ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>
                          </button>

                          {/* Expandable Order Details */}
                          <AnimatePresence>
                            {expandedOrders[order.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="border-t border-gray-200"
                              >
                                <div className="p-4 bg-gray-50">
                                  {/* Order Details */}
                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <h5 className="text-sm font-medium text-gray-900">Shipping Address</h5>
                                      <p className="text-sm text-gray-500">
                                        {order.shippingAddress.street}
                                        <br />
                                        {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                        {order.shippingAddress.postcode}
                                        <br />
                                        {order.shippingAddress.country}
                                      </p>
                                    </div>
                                    <div>
                                      <h5 className="text-sm font-medium text-gray-900">Payment Method</h5>
                                      <p className="text-sm text-gray-500">
                                        {order.paymentMethod.cardBrand} •••• {order.paymentMethod.last4}
                                        <br />
                                        Expires {order.paymentMethod.expiryMonth}/{order.paymentMethod.expiryYear}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Items List */}
                                  <div className="max-h-64 overflow-y-auto">
                                    <div className="divide-y divide-gray-200">
                                      {order.items.map((item) => (
                                        <Link
                                          key={item.id}
                                          href={`/product/${item.id}`}
                                          className="flex items-center py-3 hover:bg-gray-100 transition-colors duration-150 rounded-lg px-2"
                                        >
                                          <img
                                            src={item.image || "/images/placeholder.jpg"}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                          />
                                          <div className="ml-4 flex-1">
                                            <h6 className="text-sm font-medium text-gray-900">{item.name}</h6>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                          </div>
                                          <div className="text-sm font-medium text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Order Total */}
                                  <div className="mt-4 flex justify-end border-t border-gray-200 pt-4">
                                    <div className="text-right">
                                      <p className="text-sm font-medium text-gray-900">
                                        Total: ${order.total.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here!</p>
                      <div className="mt-6">
                        <Button onClick={() => router.push("/shop")} className="inline-flex items-center">
                          Start Shopping
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Wishlist</h3>
                  <p className="mt-2 text-sm text-gray-500 mb-6">View and manage your wishlist items.</p>
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No items in wishlist</h3>
                      <p className="mt-1 text-sm text-gray-500">Start adding some items to your wishlist!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {wishlistItems.map((item) => {
  const { id, ...itemWithoutId } = item; // Destructure id from item
  
  const productCardProps = {
    ...itemWithoutId,
    id, // Add id back explicitly
    category: item.category || "Unknown",
    rating: item.rating || 0,
    variant: "wishlist" as const,
    onAddToCart: () => handleAddToCart(item),
    onRemove: () => removeFromWishlist(id),
    image: item.image || "/images/placeholder.jpg",
  };
  
  return <ProductCard key={id} {...productCardProps} />;
})}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Methods</h3>
                      <p className="mt-1 text-sm text-gray-500">Manage your saved payment methods</p>
                    </div>
                    <Button onClick={() => setShowAddCard(true)} className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add New Card</span>
                    </Button>
                  </div>

                  <div className="mt-6 space-y-4">
                    {user?.paymentMethods?.map((method) => (
                      <div
                        key={method.id}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-4">
                          <CreditCard className={`h-6 w-6 ${method.isDefault ? "text-green-600" : "text-gray-400"}`} />
                          <div>
                            <p className="font-medium">
                              {method.cardBrand} •••• {method.last4}
                              {method.isDefault && <span className="ml-2 text-sm text-green-600">Default</span>}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expiryMonth}/{method.expiryYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!method.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSetDefaultCard(method.id)}
                              className="text-sm"
                            >
                              Make Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCard(method.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {(!user?.paymentMethods || user.paymentMethods.length === 0) && (
                      <div className="text-center py-6">
                        <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Add a payment method to save it for future purchases.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
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
                    <TriangleAlert size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Delete Account</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">
                    Are you sure you want to delete your account? This action cannot be undone.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-6 text-gray-600">
                    <LogOut size={48} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">Confirm Logout</h3>
                  <p className="text-sm text-gray-500 text-center mb-8">
                    Are you sure you want to log out of your account?
                  </p>
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setShowLogoutModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                      onClick={handleLogoutConfirm}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Add Card Modal */}
      <AnimatePresence>
        {showAddCard && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddCard(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 px-4 sm:px-0">
              <motion.div
                className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
                  <form onSubmit={handleAddCard} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                      <input
                        type="text"
                        value={newCard.cardholderName}
                        onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        maxLength={16}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Month</label>
                        <input
                          type="text"
                          value={newCard.expiryMonth}
                          onChange={(e) => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          maxLength={2}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                          type="text"
                          value={newCard.expiryYear}
                          onChange={(e) => setNewCard({ ...newCard, expiryYear: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          maxLength={4}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="password"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowAddCard(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Card</Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to determine card brand
function getCardBrand(cardNumber: string): string {
  if (cardNumber.startsWith("4")) return "Visa"
  if (cardNumber.startsWith("5")) return "Mastercard"
  if (cardNumber.startsWith("3")) return "American Express"
  if (cardNumber.startsWith("6")) return "Discover"
  return "Unknown"
}

