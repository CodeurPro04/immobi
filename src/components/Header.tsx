import { useState } from "react";
import { Home, Heart, Phone, Menu, X, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { favorites } = useFavorites();
  
const navigation = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Propriétés", href: "/properties", icon: Star },
  { name: "Favoris", href: "/favorites", icon: Heart },
  { name: "Contact", href: "/contact", icon: Phone },
];

  
  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100 shadow-sm">
      {/* Barre dorée décorative */}
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo avec effet 3D */}

          <Link to="/" className="flex items-center group ">
            <div className="">
              <div className="w-15 h-20  text-blue-500 flex items-center justify-center transform  transition-transform">
                <Home/>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-500   leading-none">
                Civ Immo 
              </span>
              </div>
              </Link>
              <nav className="hidden lg:flex items-center space-x-4 hover:cursor-pointer  ">
            <Link to ='/' className='text-gray-500  hover:border-blue-500 transition hover:bg-blue-200 px-2 py-1'>Accueil</Link>
            <Link to ='/properties' className='text-gray-500  hover:border-blue-500 transition hover:bg-blue-200 px-2 py-1'>Proprietés</Link>
             </nav>
           
          
           

          {/* Navigation Desktop - Style onglets premium */}
         <div className="hidden lg:flex items-center    p-1  space-x-2">
                <Link to ='/' className='text-gray-500 hover:cursor-pointer '>Connexion</Link>
            <Link to ='/' className='text-white hover:cursor-pointer border p-2 bg-blue-500 rounded-xl '>S'inscrire</Link>
            </div>
         


          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <Link to="/favorites" className="relative p-2">
              
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
