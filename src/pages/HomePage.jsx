import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Shield, Truck, Heart, ArrowRight, Sparkles, Award, Users, Leaf, CheckCircle, Play } from 'lucide-react';
import axios from 'axios';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products?featured=true&limit=4');
      setFeaturedProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const features = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Pure moringa leaves and tea tree oil, no harmful chemicals",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Heart,
      title: "Handcrafted",
      description: "Each soap is lovingly handmade in small batches",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Complimentary delivery across Pakistan",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "30-day money-back guarantee on all products",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Yahya Khan",
      location: "Karachi",
      rating: 5,
      comment: "MoringaCare soaps completely transformed my skin! The moringa soap is absolutely incredible for daily use.",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Fatima Ali",
      location: "Lahore", 
      rating: 5,
      comment: "Best natural soaps I've ever used. My skin feels so soft, clean, and nourished after every wash!",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Sara Ahmed",
      location: "Islamabad",
      rating: 5,
      comment: "The tea tree oil soap works wonders for my acne-prone skin. Highly recommend MoringaCare to everyone!",
      image: "https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  const stats = [
    { number: "1000+", label: "Happy Customers", icon: Users },
    { number: "1", label: "Soap Varieties", icon: Leaf },
    { number: "3", label: "Years Excellence", icon: Award },
    { number: "100%", label: "Satisfaction Rate", icon: Heart }
  ];

  return (
    <>
      <Helmet>
        <title>MoringaCare - Premium Natural Soaps | Moringa & Tea Tree Oil</title>
        <meta name="description" content="Transform your skin with MoringaCare's premium collection of natural moringa and tea tree oil soaps. Handcrafted with organic ingredients, free delivery across Pakistan." />
        <meta name="keywords" content="moringa soap, tea tree oil soap, natural soap, handmade soap, organic soap, skincare soap, Pakistan soap" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
            <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg text-primary-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-primary-100"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  Premium Natural Soap Collection
                </motion.div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-gray-900 mb-4 sm:mb-6 leading-tight mobile-hero-text">
                  Pure & Natural
                  <span className="block bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    Moringa Soap
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl px-4 sm:px-0">
                  Transform your skin with our premium collection of handcrafted moringa and tea tree oil soaps. 
                  Made with 100% organic ingredients for healthy, nourished skin.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
                  <Link
                    to="/products"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 mobile-button text-base sm:text-lg"
                  >
                    Shop Moringa Soaps
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </div>

                <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 text-xs sm:text-sm text-gray-600 px-4 sm:px-0">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="font-medium">1000+ Customers</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 text-primary-500 mr-2" />
                    <span className="font-medium">100% Natural</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mx-4 sm:mx-0">
                  <img
                    src="https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Premium Natural Moringa Soap Collection - MoringaCare Pakistan"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl border border-primary-100"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 sm:w-5 h-3 sm:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-medium">Loved by 1000+ customers</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl"
                >
                  <div className="text-lg sm:text-2xl font-bold">100%</div>
                  <div className="text-xs sm:text-sm opacity-90">Natural</div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-primary-100 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:bg-primary-200 transition-colors">
                    <stat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

    

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
                Featured Moringa Soaps
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">
                Discover our most popular and effective natural soap collection
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mobile-product-grid">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-primary-100 mobile-product-card"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.images?.[0]?.url || 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 mobile-card-padding">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 hidden sm:block">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-600">
                        Rs. {product.price?.toLocaleString()}
                      </span>
                      <Link
                        to={`/product/${product._id}`}
                        className="px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg sm:rounded-xl hover:bg-primary-600 transition-colors duration-200 text-xs sm:text-sm font-medium"
                      >
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl group mobile-button"
              >
                View All Moringa Soaps
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </section>

            <section className="py-20 bg-gradient-to-b from-white to-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
                Why Choose MoringaCare?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                We're committed to providing you with the highest quality natural soaps that nourish and protect your skin
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-primary-100 mobile-card"
                >
                  <div className={`inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 ${feature.color} rounded-xl sm:rounded-2xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 sm:w-8 h-6 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4 sm:px-0">
                Real stories from real customers who love MoringaCare
              </p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="overflow-hidden rounded-2xl sm:rounded-3xl mx-4 sm:mx-0">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-6 sm:p-8 md:p-12 shadow-xl border border-primary-100"
                >
                  <div className="flex items-center mb-6">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 sm:w-6 h-5 sm:h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8 italic leading-relaxed">
                    "{testimonials[activeTestimonial].comment}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover mr-3 sm:mr-4 border-2 border-primary-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-sm sm:text-base text-gray-600">{testimonials[activeTestimonial].location}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Testimonial Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-200 ${
                      activeTestimonial === index ? 'bg-primary-500' : 'bg-primary-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-600/20 to-transparent"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white mb-4">
                Ready to Experience Natural Care?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-primary-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
                Join thousands of satisfied customers who have discovered the power of natural moringa and tea tree oil soaps
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 font-semibold rounded-xl sm:rounded-2xl hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl mobile-button"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white hover:text-primary-600 transition-all duration-200 mobile-button"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;