'use client'
import { translations } from '@/app/configuration/language';
import { cartState, languageState } from '@/components/atom/atom'
import React, { useState, useEffect } from "react";
import { FiTrash2, FiX, FiCopy } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";

const Checkout = () => {
    const language = useRecoilValue<string>(languageState);
    const [showCart, setShowCart] = useRecoilState(cartState);
    const [showCheckout, setShowCheckout] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
    const [shippingAddress, setShippingAddress] = useState({
        recipientName: "",
        address: "",
        province: "",
        city: "",
        phoneNumber: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    });
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // Sample cart data
    const sampleProducts = [
        {
        id: 1,
        name: "Modern Kitchen Faucet",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1584652868574-0669f4292976",
        quantity: 1
        },
        {
        id: 2,
        name: "Luxury Bathroom Vanity",
        price: 899.99,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101",
        quantity: 1
        }
    ];

    useEffect(() => {
        setCart(sampleProducts);
    }, []);

    type errors = {
        shippingName?: string;
        shippingAddress?: string;
        shippingCity?: string;
        shippingPostal?: string;
        cardNumber?: string;
        expiryDate?: string;
        cvv?: string;
    };

    const validateForm = () => {
        const errors: errors = {};
        
        if (!shippingAddress.recipientName) errors.shippingName = "Receipient name is required";
        if (!shippingAddress.address) errors.shippingAddress = "Address is required";
        if (!shippingAddress.province) errors.shippingCity = "Province is required";
        if (!shippingAddress.city) errors.shippingCity = "City is required";
        if (!shippingAddress.phoneNumber) errors.shippingPostal = "Phone number is required";

        if (paymentMethod === "credit") {
        if (!cardDetails.cardNumber) errors.cardNumber = "Card number is required";
        if (!cardDetails.expiryDate) errors.expiryDate = "Expiry date is required";
        if (!cardDetails.cvv) errors.cvv = "CVV is required";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAutofill = () => {
        // Simulated autofill data
        const autoFillData = {
            recipientName: "John Doe",
            address: "123 Main St",
            province: "10001",
            city: "New York",
            phoneNumber: ""
        };
        setShippingAddress(autoFillData);
    };

    const shippingMethods = [
        { id: "standard", name: "Standard Shipping", price: 15, time: "5-7 business days" },
        { id: "express", name: "Express Shipping", price: 25, time: "2-3 business days" },
        { id: "overnight", name: "Overnight Shipping", price: 35, time: "Next business day" }
    ];

    const calculateTotal = () => {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shippingCost = 15;
        const tax = subtotal * 0.1;
        return {
        subtotal,
        shippingCost,
        tax,
        total: subtotal + shippingCost + tax
        };
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const removeItem = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleCheckout = (e: any) => {
        e.preventDefault();
        // Implement checkout logic here
        console.log("Order placed", { shippingAddress, paymentMethod, order: calculateTotal() });
    };

    return (
        <>
        {/* Cart Slide-in Panel */}
        <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform ${showCart ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
            <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{translations[language].checkout.cart}</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded">
                <FiX className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                <p className="text-center text-gray-500">{translations[language].checkout.empty}</p>
                ) : (
                cart.map(item => (
                    <div key={item.id} className="flex gap-4 mb-4 p-4 border rounded">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded">
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded">
                            +
                        </button>
                        </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <FiTrash2 />
                    </button>
                    </div>
                ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="p-4 border-t">
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                    <span>{translations[language].checkout.subtotal}</span>
                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>{translations[language].checkout.shippingCost}</span>
                    <span>${calculateTotal().shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>{translations[language].checkout.tax}</span>
                    <span>${calculateTotal().tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                    <span>{translations[language].checkout.grandTotal}</span>
                    <span>${calculateTotal().total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                    }}
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
                >
                    {translations[language].checkout.checkout}
                </button>
                </div>
            )}
            </div>
        </div>

        {/* Enhanced Checkout Form */}
        {showCheckout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded">
                    <FiX className="w-6 h-6" />
                </button>
                </div>

                <form onSubmit={handleCheckout} className="space-y-6">
                {/* Shipping Address */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium mb-4">{translations[language].checkout.shipping}</h3>
                    <button
                        type="button"
                        onClick={handleAutofill}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        <FiCopy /> Autofill
                    </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Recipient Name"
                        value={shippingAddress.recipientName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, recipientName: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Address (optional)"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Province"
                        value={shippingAddress.province}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="City"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={shippingAddress.phoneNumber}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phoneNumber: e.target.value })}
                        className="p-2 border rounded w-full"
                        required
                    />
                    </div>
                    
                </div>

                {/* <div>
                    <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Shipping Address</h3>
                    <button
                        type="button"
                        onClick={handleAutofill}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                        <FiCopy /> Autofill
                    </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                        type="text"
                        placeholder="Full Name"
                        value={shippingAddress.recipientName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, recipientName: e.target.value })}
                        className={`p-2 border rounded w-full ${formErrors.shippingName ? 'border-red-500' : ''}`}
                        required
                        />
                        {formErrors.shippingName && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.shippingName}</p>
                        )}
                    </div>
                    </div>
                </div> */}

                {/* Shipping Method */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
                    <div className="space-y-2">
                    {shippingMethods.map((method) => (
                        <label key={method.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                            <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="h-4 w-4"
                            />
                            <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.time}</p>
                            </div>
                        </div>
                        <span className="font-medium">${method.price.toFixed(2)}</span>
                        </label>
                    ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    {paymentMethod === "credit" && (
                    <div className="space-y-4">
                        <div>
                        <input
                            type="text"
                            placeholder="Card Number"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            className={`p-2 border rounded w-full ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                            max={"16"}
                            // maxLength="16"
                        />
                        {formErrors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                        )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            className={`p-2 border rounded w-full ${formErrors.expiryDate ? 'border-red-500' : ''}`}
                            max="5"
                            // maxLength="5"
                            />
                            {formErrors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.expiryDate}</p>
                            )}
                        </div>
                        <div>
                            <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className={`p-2 border rounded w-full ${formErrors.cvv ? 'border-red-500' : ''}`}
                            max={"3"}
                            // maxLength="3"
                            />
                            {formErrors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.cvv}</p>
                            )}
                        </div>
                        </div>
                    </div>
                    )}
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                    <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{translations[language].checkout.subtotal}</span>
                            <span>${calculateTotal().subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{translations[language].checkout.shippingCost}</span>
                            <span>${calculateTotal().shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{translations[language].checkout.tax}</span>
                            <span>${calculateTotal().tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>{translations[language].checkout.grandTotal}</span>
                            <span>${calculateTotal().total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
                    onClick={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                        handleCheckout(e);
                    }
                    }}
                >
                    Place Order
                </button>
                </form>
            </div>
            </div>
        )}

        </>
    );
};

export default Checkout;
