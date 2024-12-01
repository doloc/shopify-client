'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import Link from "next/link";
import React, { useState } from "react";
import { FiStar, FiGrid, FiList, FiEye, FiX } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const Products = () => {
    const language = useRecoilValue<string>(languageState);
    const [sortBy, setSortBy] = useState("popularity");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewMode, setViewMode] = useState("grid");
    const [compareProducts, setCompareProducts] = useState<any[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<any>({});
    const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
    const [showCompareModal, setShowCompareModal] = useState(false);

    const materialTypes = ["Wood", "Metal", "Glass", "Fabric", "Leather"];
    
    const dimensions = {
        width: ["0-50cm", "51-100cm", "101-150cm", "151cm+"],
        height: ["0-50cm", "51-100cm", "101-150cm", "151cm+"],
        depth: ["0-50cm", "51-100cm", "101-150cm", "151cm+"]
    };

    const categoryThumbnails = {
        "Kitchen": "images.unsplash.com/photo-1556911220-bff31c812dba",
        "Bathroom": "images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "Living Room": "images.unsplash.com/photo-1555041469-a586c61ea9bc",
        "Bedroom": "images.unsplash.com/photo-1558882224-dda166733046",
        "Office": "images.unsplash.com/photo-1524758631624-e2822e304c36",
        "Outdoor": "images.unsplash.com/photo-1600210492493-0946911123ea"
    };

    const products = [
    {
        id: 1,
        name: "Modern Kitchen Faucet",
        price: 299.99,
        rating: 4.5,
        image: "images.unsplash.com/photo-1584622650111-993a426fbf0a",
        category: "Kitchen"
    },
    {
        id: 2,
        name: "Luxury Bathroom Vanity",
        price: 899.99,
        rating: 4.8,
        image: "images.unsplash.com/photo-1620626011761-996317b8d101",
        category: "Bathroom"
    },
    {
        id: 3,
        name: "Elegant Sofa Set",
        price: 1299.99,
        rating: 4.7,
        image: "images.unsplash.com/photo-1555041469-a586c61ea9bc",
        category: "Living Room"
    },
    {
        id: 4,
        name: "Premium Office Desk",
        price: 599.99,
        rating: 4.6,
        image: "images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
        category: "Office"
    }];

    const handleQuickView = (product: any) => {
        setQuickViewProduct(product);
    };

    const handleCompareProduct = (product: any) => {
        if (compareProducts.find(p => p.id === product.id)) {
        setCompareProducts(compareProducts.filter(p => p.id !== product.id));
        } else if (compareProducts.length < 4) {
        setCompareProducts([...compareProducts, product]);
        }
    };

    const handleVariantChange = (productId: number, type: string, value: string) => {
        setSelectedVariants((prev:any) => ({
        ...prev,
        [productId]: { ...prev[productId], [type]: value }
        }));
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev: any) =>
        prev.includes(category)
            ? prev.filter((c: string) => c !== category)
            : [...prev, category]
        );
    };

    const Breadcrumb = () => (
        <div className="container mx-auto px-4 py-2 flex items-center text-sm text-gray-600">
        <a href="#" className="hover:text-gray-900">Home</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-gray-900">Products</a>
        {selectedCategories.length > 0 && (
            <>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{selectedCategories.join(", ")}</span>
            </>
        )}
        </div>
    );

    const CategoryNav = () => (
        <div className="sticky top-[72px] z-40 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3">
            <div className="flex overflow-x-auto space-x-6 no-scrollbar">
            {Object.entries(categoryThumbnails).map(([category, image]) => (
                <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex flex-col items-center space-y-2 min-w-[100px] ${
                    selectedCategories.includes(category) ? "text-blue-600" : "text-gray-600"
                }`}
                >
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                    src={`https://${image}`}
                    alt={category}
                    className="w-full h-full object-cover"
                    />
                </div>
                <span className="text-sm font-medium">{category}</span>
                </button>
            ))}
            </div>
        </div>
        </div>
    );

    const ProductGrid = () => (
        <div className={viewMode === "grid" ? 
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : 
        "space-y-6"}
        >
        {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
            <div
            key={product.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden group ${
                viewMode === "list" ? "flex" : ""
            }`}
            >
            <div className={`relative ${viewMode === "list" ? "w-1/3" : "pb-[100%]"} overflow-hidden`}>
                <img
                src={`https://${product.image}`}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <button
                    onClick={() => handleQuickView(product)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                    <FiEye className="inline-block mr-2" />
                    Quick View
                </button>
                </div>
            </div>
            <div className={`p-4 ${viewMode === "list" ? "w-2/3" : ""}`}>
                <Link href={`/products/${product.id}`}><h3 className="text-lg font-semibold mb-2">{product.name}</h3></Link>
                <div className="flex items-center mb-2">
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
                <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Color:</span>
                    {["Natural", "White", "Black"].map(color => (
                    <button
                        key={color}
                        onClick={() => handleVariantChange(product.id, "color", color)}
                        className={`w-6 h-6 rounded-full border-2 ${
                        selectedVariants[product.id]?.color === color ? "border-blue-600" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                    />
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">Material:</span>
                    <select
                    onChange={(e) => handleVariantChange(product.id, "material", e.target.value)}
                    className="border rounded-md px-2 py-1 text-sm"
                    >
                    {materialTypes.map(material => (
                        <option key={material} value={material}>{material}</option>
                    ))}
                    </select>
                </div>
                </div>
                <div className="flex items-center justify-between">
                <span className="text-xl font-bold">${product.price}</span>
                <div className="space-x-2">
                    <button
                    onClick={() => handleCompareProduct(product)}
                    className={`p-2 rounded-md ${
                        compareProducts.find(p => p.id === product.id)
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    >
                    {translations[language].container.compare}
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    {translations[language].container.addToCart}
                    </button>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
    );

    const ComparisonModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-auto">
          <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Product Comparison</h2>
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">Features</th>
                      {compareProducts.map(product => (
                        <th key={product.id} className="p-4 text-left">
                          <div className="space-y-4">
                            <img 
                              src={`https://${product.image}`} 
                              alt={product.name}
                              className="w-32 h-32 object-cover rounded-lg mx-auto"
                            />
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Price</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <span className="text-lg font-bold text-blue-600">
                            ${product.price}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Rating</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2">{product.rating}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Category</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="p-4">{product.category}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Materials</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <select
                            value={selectedVariants[product.id]?.material || materialTypes[0]}
                            onChange={(e) => handleVariantChange(product.id, "material", e.target.value)}
                            className="border rounded-md px-2 py-1"
                          >
                            {materialTypes.map(material => (
                              <option key={material} value={material}>{material}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Colors</td>
                      {compareProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <div className="flex space-x-2">
                            {["Natural", "White", "Black"].map(color => (
                              <button
                                key={color}
                                onClick={() => handleVariantChange(product.id, "color", color)}
                                className={`w-6 h-6 rounded-full border-2 ${
                                  selectedVariants[product.id]?.color === color ? "border-blue-600" : "border-gray-300"
                                }`}
                                style={{ backgroundColor: color.toLowerCase() }}
                              />
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
    
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-4"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add Selected to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
        <Breadcrumb />
        <CategoryNav />

        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold">{translations[language].container.featuredProducts}</h2>
                <div className="flex items-center space-x-4">
                <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
                >
                    <FiGrid />
                </button>
                <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
                >
                    <FiList />
                </button>
                </div>
            </div>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="popularity">{translations[language].container.sorting.popularity}</option>
                <option value="price-low">{translations[language].container.sorting.priceLow}</option>
                <option value="price-high">{translations[language].container.sorting.priceHigh}</option>
                <option value="newest">{translations[language].container.sorting.newest}</option>
            </select>
            </div>

            <div className="flex gap-8">
            <div className="w-64 shrink-0">
                <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-3">Material</h3>
                    {materialTypes.map(material => (
                    <label key={material} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-blue-600" />
                        {material}
                    </label>
                    ))}
                </div>
                <div>
                    <h3 className="font-semibold mb-3">Dimensions</h3>
                    {Object.entries(dimensions).map(([dimension, ranges]) => (
                    <div key={dimension} className="mb-4">
                        <h4 className="text-sm font-medium mb-2">{dimension}</h4>
                        {ranges.map(range => (
                        <label key={range} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded text-blue-600" />
                            {range}
                        </label>
                        ))}
                    </div>
                    ))}
                </div>
                </div>
            </div>

            <div className="flex-1">
                <ProductGrid />
            </div>
            </div>
        </div>

        {quickViewProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                <div className="p-6">
                <button
                    onClick={() => setQuickViewProduct(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                <div className="flex gap-8">
                    <div className="w-1/2">
                    <img
                        src={`https://${quickViewProduct.image}`}
                        alt={quickViewProduct.name}
                        className="w-full h-auto rounded-lg"
                    />
                    </div>
                    <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-4">{quickViewProduct.name}</h3>
                    <p className="text-3xl font-bold text-blue-600 mb-6">
                        ${quickViewProduct.price}
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-2">
                        <span className="font-medium">Rating:</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                            <FiStar
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(quickViewProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                            ))}
                            <span className="ml-2 text-gray-600">{quickViewProduct.rating}</span>
                        </div>
                        </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                        {translations[language].container.addToCart}
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

        {compareProducts.length > 0 && (
            <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <h4 className="font-semibold mb-2">Compare Products ({compareProducts.length})</h4>
            <div className="space-y-2">
                {compareProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between">
                    <span className="truncate">{product.name}</span>
                    <button
                    onClick={() => handleCompareProduct(product)}
                    className="text-red-600 hover:text-red-700"
                    >
                    ×
                    </button>
                </div>
                ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setShowCompareModal(true)}>
                Compare Now
            </button>
            </div>
        )}

        {showCompareModal && <ComparisonModal />}
        </div>
    );
}

export default Products