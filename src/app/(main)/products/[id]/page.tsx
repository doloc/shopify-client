'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import UserComments from "@/components/main/product-detail/user-comment";
import React, { useState } from "react";
import { FiStar, FiMinus, FiPlus } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const ProductDetail = () => {
    const language = useRecoilValue<string>(languageState);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("Natural");
    const [selectedMaterial, setSelectedMaterial] = useState("Wood");

    const product = {
        id: 1,
        name: "Modern Kitchen Faucet",
        price: 299.99,
        rating: 4.5,
        description: "Premium quality kitchen faucet with modern design and durable finish. Features smooth operation and easy installation.",
        images: [
            "images.unsplash.com/photo-1584622650111-993a426fbf0a",
            "images.unsplash.com/photo-1593696140826-c58b021acf8b",
            "images.unsplash.com/photo-1631889993959-41b4e9c6e3c5",
            "images.unsplash.com/photo-1615874694520-474822394e73"
        ],
        specifications: [
            { label: "Brand", value: "LuxHome" },
            { label: "Model", value: "LX-KF100" },
            { label: "Finish", value: "Brushed Nickel" },
            { label: "Installation Type", value: "Deck Mounted" },
            { label: "Flow Rate", value: "1.8 GPM" },
            { label: "Warranty", value: "5 Years" }
        ]
    };

    const materialTypes = ["Wood", "Metal", "Glass", "Fabric", "Leather"];
    
    const Breadcrumb = () => (
        <div className="container mx-auto px-4 py-2 flex items-center text-sm text-gray-600">
        <a href="#" className="hover:text-gray-900">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-gray-900">Products</a>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Breadcrumb />

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={`https://${product.images[selectedImage]}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                    {product.images.map((image, index) => (
                        <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                            selectedImage === index ? "ring-2 ring-blue-500" : ""
                        }`}
                        >
                        <img
                            src={`https://${image}`}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        </button>
                    ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <FiStar
                        key={i}
                        className={`h-5 w-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                        />
                    ))}
                    <span className="ml-2 text-gray-600">{product.rating}</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">${product.price}</p>

                    <div className="space-y-4">
                    <div>
                        <h3 className="font-medium mb-2">Color</h3>
                        <div className="flex space-x-2">
                        {["Natural", "White", "Black"].map(color => (
                            <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 ${
                                selectedColor === color ? "border-blue-600" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            />
                        ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">Material</h3>
                        <select
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value)}
                        className="w-full border rounded-md px-4 py-2"
                        >
                        {materialTypes.map(material => (
                            <option key={material} value={material}>{material}</option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <h3 className="font-medium mb-2">{translations[language].checkout.quantity}</h3>
                        <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 border rounded-md"
                        >
                            <FiMinus />
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 border rounded-md"
                        >
                            <FiPlus />
                        </button>
                        </div>
                    </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                    {translations[language].container.addToCart}
                    </button>

                    <div className="space-y-4">
                    <h3 className="text-xl font-bold">{translations[language].container.description}</h3>
                    <p className="text-gray-600">{product.description}</p>
                    </div>

                    <div>
                    <h3 className="text-xl font-bold mb-4">{translations[language].container.specifications}</h3>
                    <div className="border rounded-lg overflow-hidden">
                        {product.specifications.map((spec, index) => (
                        <div
                            key={spec.label}
                            className={`flex ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                        >
                            <div className="w-1/3 px-4 py-3 font-medium">{spec.label}</div>
                            <div className="w-2/3 px-4 py-3">{spec.value}</div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* user comment */}
            <UserComments />
        </div>
    );
};

export default ProductDetail;