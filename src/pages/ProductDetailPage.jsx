import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  ArrowRight,
  User,
  Send,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import ReviewSystem from "../components/ReviewSystem";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [shakeButton, setShakeButton] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Shake effect for add to cart button
  useEffect(() => {
    const interval = setInterval(() => {
      setShakeButton(true);
      setTimeout(() => setShakeButton(false), 1000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data.product);

      if (response.data.product?.category) {
        const relatedResponse = await axios.get(
          `/api/products?category=${response.data.product.category}&limit=4`
        );
        setRelatedProducts(
          relatedResponse.data.products.filter((p) => p._id !== id) || []
        );
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    const maxStock = product.stock || 0;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleImageChange = (index) => {
    setImageLoading(true);
    setSelectedImage(index);
    setTimeout(() => setImageLoading(false), 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Soap not found
          </h2>
          <Link
            to="/products"
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Soaps
          </Link>
        </div>
      </div>
    );
  }

  const productImages =
    product.images?.length > 0
      ? product.images.map((img) => img.url || img)
      : "";

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <>
      <Helmet>
        <title>
          {product?.name
            ? `${product.name} | Best Moringa Soap Pakistan | MoringaCare Natural Organic Soaps`
            : "Premium Moringa Soap Details | MoringaCare Pakistan"}
        </title>
        <meta
          name="description"
          content={
            product?.description ||
            "Premium handcrafted moringa soap from MoringaCare Pakistan. 100% natural organic moringa leaves & tea tree oil for healthy, glowing skin. Free delivery across Pakistan."
          }
        />
        <meta
          name="keywords"
          content={`${product?.name || "moringa soap"}, moringa soap Pakistan, ${
            product?.category || "soap"
          }, premium moringa soap, organic moringa soap, tea tree oil soap, natural soap Pakistan, handmade moringa soap, moringa soap benefits, buy moringa soap Pakistan`}
        />
        <meta
          property="og:title"
          content={product?.name ? `${product.name} | Best Moringa Soap Pakistan` : "Premium Moringa Soap Pakistan"}
        />
        <meta
          property="og:description"
          content={
            product?.description || "Premium handcrafted moringa soap from MoringaCare Pakistan. 100% natural organic ingredients."
          }
        />
        <meta property="og:image" content={product?.images?.[0]?.url || ""} />
        <meta property="og:type" content="product" />
        {product?.price && (
          <meta property="product:price:amount" content={product.price} />
        )}
        {product?.price && (
          <meta property="product:price:currency" content="PKR" />
        )}
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-container">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary-600">
              Moringa Soaps
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{product.name}</span>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6 sm:mb-8 text-sm sm:text-base"
          >
            <ArrowLeft size={20} />
            <span>Back to Moringa Soaps</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg relative"
              >
                {imageLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                    <LoadingSpinner minimal />
                  </div>
                )}
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-200"
                  onLoad={() => setImageLoading(false)}
                />

                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        handleImageChange(
                          selectedImage > 0
                            ? selectedImage - 1
                            : productImages.length - 1
                        )
                      }
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <ArrowLeft size={16} className="sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() =>
                        handleImageChange(
                          selectedImage < productImages.length - 1
                            ? selectedImage + 1
                            : 0
                        )
                      }
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                      <ArrowRight size={16} className="sm:w-5 sm:h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {productImages.length > 1 && (
                  <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                          selectedImage === index
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>

              {productImages.length > 1 && (
                <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === index
                          ? "border-primary-600 shadow-lg"
                          : "border-transparent hover:border-primary-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 sm:w-5 h-4 sm:h-5 ${
                          i < (product.rating || 4)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm sm:text-base text-gray-600">
                    ({product.reviewCount || 0} reviews)
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600">
                    Rs. {product.price}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-lg sm:text-xl text-gray-500 line-through">
                        Rs. {product.originalPrice}
                      </span>
                    )}
                  {product.discount > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      Save {product.discount}%
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {product.features && (
                  <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                      Key Features
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg mobile-form-input">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1 || isOutOfStock}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 sm:px-4 py-2 font-medium text-sm sm:text-base">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-2 sm:p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity >= product.stock || isOutOfStock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${
                        isOutOfStock
                          ? "bg-red-100 text-red-800 border-red-200"
                          : isLowStock
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }`}
                    >
                      {isOutOfStock
                        ? "Sold Out"
                        : isLowStock
                        ? `Only ${product.stock} left!`
                        : `${product.stock} available`}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    animate={shakeButton ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 mobile-button ${
                      isOutOfStock
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-primary-600 text-white hover:bg-primary-700 hover:scale-105"
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span className="text-sm sm:text-base">{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-3 p-3 sm:p-4 bg-green-50 rounded-lg mobile-card">
                    <Truck className="text-green-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Free Delivery
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">All over Pakistan</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 sm:p-4 bg-blue-50 rounded-lg mobile-card">
                    <Shield className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        Quality Guarantee
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">100% authentic</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <ReviewSystem productId={product._id} currentUser={null} />

          {relatedProducts.length > 0 && (
            <div className="mt-12 sm:mt-16 lg:mt-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Related Moringa Soaps
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mobile-product-grid">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mobile-product-card"
                  >
                    <Link to={`/product/${relatedProduct._id}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={relatedProduct.images?.[0]?.url || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400'}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 sm:p-4 lg:p-6 mobile-card-padding">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 hidden sm:block">
                          {relatedProduct.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg sm:text-xl font-bold text-primary-600">
                            Rs. {relatedProduct.price}
                          </span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 sm:w-4 h-3 sm:h-4 ${
                                  i < (relatedProduct.rating || 4)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
