
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Facebook,
  X,
  Instagram,
  Linkedin,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {


  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-12 relative overflow-hidden mt-10">
      {/* Élément décoratif */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"></div>

      {/* Vague de séparation */}
      <div className="absolute top-0 left-0 w-full -translate-y-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="fill-gray-900"
          ></path>
        </svg>
      </div>

      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Colonne Logo */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center group space-x-3">
              <div className="text-blue-500">
                <div className="w-20 h-20  rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
                  <Home/>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-blue-500  leading-none">
                  Civ Immo 
                </span>
                
              </div>
            </Link>
            
            <div className="flex space-x-4"> 
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-600 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-black rounded-full transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-pink-600 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-700 hover:bg-blue-700 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-amber-500 to-amber-500">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/properties"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Nos Pépites
                </Link>
              </li>
              <li>
                <Link
                  to="/areas"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Secteurs VIP
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Favoris
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-amber-500 to-amber-500">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Achat Prestige
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Vente Exclusive
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Gestion de Patrimoine
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Évaluation Expert
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>{" "}
                  Conciergerie VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-2 relative after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-gradient-to-r from-amber-500 to-amber-500">
              Contact Élite
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400">+225 07 47 84 66 08</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400">contact@altus-groupe.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-3" />
                <span className="text-gray-400">
                  Lun-Ven: 9h-19h
                  <br />
                  Sam: 10h-16h
                </span>
              </li>
            </ul>
          </div>
        </div>

        

        
        
      </div>
    </footer>
  );
}
