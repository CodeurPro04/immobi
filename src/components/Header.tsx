import { useState } from "react";
import { Home, Heart, Phone, Menu, X, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();

  const navigation = [
    { name: "Accueil", href: "/", icon: Home, highlight: false },
    { name: "Nos Pépites", href: "/properties", icon: Star, highlight: true },
    /*{ name: 'Secteurs VIP', href: '/areas', icon: MapPin, highlight: false },*/
    { name: "Favoris", href: "/favorites", icon: Heart, highlight: false },
    { name: "Nous contacter", href: "/contact", icon: Phone, highlight: false },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      {/* Barre dorée décorative */}
      <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"></div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo avec effet 3D */}
          <Link to="/" className="flex items-center group space-x-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-14 w-14 object-contain rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-amber-600 leading-none">
                ALTUS GROUPE
              </span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                Immobilier SARL-U
              </span>
            </div>
          </Link>

          {/* Navigation Desktop - Style onglets premium */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/80 rounded-full p-1 shadow-inner border border-gray-200">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-700 to-amber-500 text-white shadow-md"
                      : "text-gray-600 hover:text-amber-700 hover:bg-amber-50"
                  } ${item.highlight ? "ring-2 ring-amber-400" : ""}`}
                >
                  {item.highlight && (
                    <div className="absolute -top-2 -right-2 bg-amber-400 rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-white" : "text-current"
                    }`}
                  />
                  <span>{item.name}</span>
                  {item.name === "Favoris" && favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/favorites" className="relative p-2">
              <Heart className="h-6 w-6 text-gray-600" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {favorites.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "bg-amber-100 text-amber-700"
                        : "text-gray-500 hover:text-amber-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                    {item.name === "Favoris" && favorites.length > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                        {favorites.length}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
