'use client'
import React, { useState, useEffect } from "react";
import { FiTrash2, FiX } from "react-icons/fi";

const Checkout = () => {
    const [language, setLanguage] = useState<keyof typeof cartTranslations>("en");
    const [showCart, setShowCart] = useState(true);
    const [showCheckout, setShowCheckout] = useState(false);
    const [cart, setCart] = useState<any[]>([]);
    const [shippingAddress, setShippingAddress] = useState({
        recipientName: "",
        address: "",
        province: "",
        city: "",
        phoneNumber: ""
      });
    const [paymentMethod, setPaymentMethod] = useState("cod");

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

    // Add cart translations
    const cartTranslations = {
        en: {
            cart: "Shopping Cart",
            checkout: "Checkout",
            empty: "Your cart is empty",
            total: "Total",
            quantity: "Quantity",
            remove: "Remove",
            shipping: "Shipping Address",
            payment: "Payment Method",
            placeOrder: "Place Order",
            credit: "Credit Card",
            paypal: "PayPal",
            orderSummary: "Order Summary",
            subtotal: "Subtotal",
            shippingCost: "Shipping Cost",
            tax: "Tax",
            grandTotal: "Grand Total"
        },
        vi: {
            cart: "Giỏ Hàng",
            checkout: "Thanh Toán",
            empty: "Giỏ hàng trống",
            total: "Tổng cộng",
            quantity: "Số lượng",
            remove: "Xóa",
            shipping: "Địa Chỉ Giao Hàng",
            payment: "Phương Thức Thanh Toán",
            placeOrder: "Đặt Hàng",
            credit: "Thẻ Tín Dụng",
            paypal: "PayPal",
            orderSummary: "Tóm Tắt Đơn Hàng",
            subtotal: "Tạm tính",
            shippingCost: "Phí vận chuyển",
            tax: "Thuế",
            grandTotal: "Tổng cộng"
        }
    };

    useEffect(() => {
        setCart(sampleProducts);
    }, []);

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
        <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Cart Slide-in Panel */}
        <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform ${showCart ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
            <div className="h-full flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">{cartTranslations[language].cart}</h2>
                <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded">
                <FiX className="w-6 h-6" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                <p className="text-center text-gray-500">{cartTranslations[language].empty}</p>
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
                    <span>{cartTranslations[language].subtotal}</span>
                    <span>${calculateTotal().subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>{cartTranslations[language].shippingCost}</span>
                    <span>${calculateTotal().shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                    <span>{cartTranslations[language].tax}</span>
                    <span>${calculateTotal().tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                    <span>{cartTranslations[language].grandTotal}</span>
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
                    {cartTranslations[language].checkout}
                </button>
                </div>
            )}
            </div>
        </div>

        {/* Updated Checkout Form */}
        {showCheckout && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{cartTranslations[language].checkout}</h2>
                <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded">
                    <FiX className="w-6 h-6" />
                </button>
                </div>

                <form onSubmit={handleCheckout} className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-4">{cartTranslations[language].shipping}</h3>
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

                <div>
                    <h3 className="text-lg font-medium mb-4">{cartTranslations[language].payment}</h3>
                    <div className="space-y-2">
                    <label className="flex items-center gap-2">
                        <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Cash on Delivery (COD)
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Bank Transfer
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                        type="radio"
                        name="payment"
                        value="momo"
                        checked={paymentMethod === "momo"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        E-Wallet (Momo)
                    </label>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">{cartTranslations[language].orderSummary}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>{cartTranslations[language].subtotal}</span>
                            <span>${calculateTotal().subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{cartTranslations[language].shippingCost}</span>
                            <span>${calculateTotal().shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>{cartTranslations[language].tax}</span>
                            <span>${calculateTotal().tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t pt-2">
                            <span>{cartTranslations[language].grandTotal}</span>
                            <span>${calculateTotal().total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
                    {cartTranslations[language].placeOrder}
                </button>
                </form>
            </div>
            </div>
        )}

        </div>
    );
};

export default Checkout;
