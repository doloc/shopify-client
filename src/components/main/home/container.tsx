import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import Link from "next/link";
import { useState } from "react";
import { FiFilter, FiHeart, FiStar, FiX } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const Container = () => {
    const language = useRecoilValue<string>(languageState);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("popularity");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedRating, setSelectedRating] = useState(0);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const products = [
        {
            id: 1,
            name: "Modern Kitchen Faucet",
            category: "Kitchen",
            price: 299.99,
            rating: 4.5,
            image: "images.unsplash.com/photo-1584622650111-993a426fbf0a",
        },
        {
            id: 2,
            name: "Luxury Bathroom Vanity",
            category: "Bathroom",
            price: 899.99,
            rating: 4.8,
            image: "images.unsplash.com/photo-1620626011761-996317b8d101",
        },
        {
            id: 3,
            name: "Elegant Sofa Set",
            category: "Living Room",
            price: 1299.99,
            rating: 4.7,
            image: "images.unsplash.com/photo-1555041469-a586c61ea9bc",
        },
        {
            id: 4,
            name: "Premium Office Desk",
            category: "Office",
            price: 599.99,
            rating: 4.6,
            image: "images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
        }
    ];

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev: any) =>
          prev.includes(category)
            ? prev.filter((c: string) => c !== category)
            : [...prev, category]
        );
    };
    
    const handlePriceChange = (type: "min" | "max", value: string) => {
        setPriceRange(prev => ({ ...prev, [type]: value }));
    };
    
    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange({ min: "", max: "" });
        setSelectedRating(0);
    };

    // Added Modal Close Handler
    const handleCloseModal = (e: any) => {
        if (e.target.id === "modal-backdrop") {
            setShowFilters(false);
        }
    };

    // Calculate the number of active filters
    const activeFiltersCount = [
        selectedCategories.length > 0,
        priceRange.min !== "" && priceRange.max !== "",
        selectedRating > 0
    ].filter(Boolean).length;
    
    return (
        <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold">{translations[language].container.featuredProducts}</h2>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                <FiFilter />
                {translations[language].container.filters}
                {activeFiltersCount > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
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

        {/* Updated Filter Modal */}
        {showFilters && (
          <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={handleCloseModal}
          >
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {translations[language].categories.map((category) => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="rounded text-blue-600"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`p-2 ${selectedRating >= rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <FiStar
                          className={`h-6 w-6 ${selectedRating >= rating ? "fill-current" : ""}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative pb-[100%] overflow-hidden">
                <img
                  src={`https://${product.image}`}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100">
                  <FiHeart className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <Link href={`/products/${product.id}`}><h3 className="text-lg font-semibold mb-2">{product.name}</h3></Link>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    {translations[language].container.addToCart}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default Container