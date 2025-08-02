import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, Filter, Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("name");

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const categories = [
    "all",
    "moringa-soap",
    "tea-tree-soap",
    "herbal-soap",
    "moisturizing-soap",
    "exfoliating-soap",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Best Moringa Soap Pakistan | Premium Tea Tree Oil Soap | MoringaCare Natural Organic Soaps</title>
        <meta
          name="description"
          content="🌿 Pakistan's #1 Moringa Soap Collection! Premium handcrafted moringa & tea tree oil soaps. 100% natural, organic ingredients. Best moringa soap in Pakistan. Free delivery nationwide. Order online now!"
        />
        <meta
          name="keywords"
          content="moringa soap Pakistan, best moringa soap, tea tree oil soap Pakistan, natural soap Pakistan, organic moringa soap, handmade moringa soap, moringa leaves soap, buy moringa soap online Pakistan, premium moringa soap, moringa soap benefits, natural skincare Pakistan, organic soap Pakistan, moringa soap Karachi, moringa soap Lahore, moringa soap Islamabad"
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Moringa & Tea Tree Oil Soaps
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">
              Pakistan's finest collection of handcrafted moringa and tea tree oil soaps
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 mobile-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search soaps..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mobile-form-input"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mobile-form-input"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Soap Types"
                      : category
                          .replace("-", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>

              <div>
                <label className="block text-xs sm:text-sm text-gray-600 mb-1">
                  Price Range: Rs. {priceRange[0]} - Rs. {priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-8"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mobile-form-input"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mobile-product-grid">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl group mobile-product-card"
              >
                <Link to={`/product/${product._id}`} className="block w-full h-full">
                  <img
                    src={product.images?.[0].url || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-0 left-0 p-2 sm:p-4 w-full flex justify-between items-start">
                    {product.featured && (
                      <div className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        Featured
                      </div>
                     )}
                    {product.discount > 0 && (
                      <div className="bg-red-500 text-white w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full text-xs sm:text-sm font-bold shadow-md ml-auto">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-white flex flex-col justify-end h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-lg sm:text-xl lg:text-2xl font-semibold text-green-400">
                            Rs. {product.price}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-gray-300 text-xs sm:text-sm line-through">
                              Rs. {product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-white/20 backdrop-blur-sm hover:bg-green-500 text-white rounded-full p-2 sm:p-3 transform group-hover:scale-110 transition-all duration-300"
                          aria-label="Add to cart"
                        >
                          <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="text-gray-500 text-lg sm:text-xl mb-4">No soaps found</div>
              <p className="text-gray-400 px-4 sm:px-0">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
