import React from "react";
import {
  Heart,
  MapPin,
  Home,
  Bath,
  Square,
  Eye,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "../types/Property";
import { useFavorites } from "../context/FavoritesContext";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const API_BASE_URL = "https://darkgrey-dugong-226404.hostingersite.com/api";

  // Parser proprement les images JSON (si stockées comme string)
  let imageArray: string[] = [];
  try {
    imageArray = Array.isArray(property.images)
      ? property.images
      : JSON.parse(property.images);
  } catch (e) {
    console.error("Erreur parsing images :", e);
  }

  const firstImage =
    imageArray.length > 0
      ? `${API_BASE_URL}/${imageArray[0].replace(/\\/g, "/")}`
      : "/placeholder.jpg";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`tel:${property.agent.phone}`, "_self");
  };

  const handleWhatsAppClick = () => {
    // Construction du lien vers la fiche du bien
    const propertyUrl = `${window.location.origin}/biens/${property.id}`;

    // Message structuré avec emojis et sauts de ligne
    const message = `Bonjour,

Je suis intéressé par ce bien immobilier :

${property.title}
${property.price.toLocaleString("fr-FR")} FCFA
${property.location.address}, ${property.location.city}
${property.surface}m² | ${property.rooms} chambres

Lien vers l'annonce : ${propertyUrl}

Pourriez-vous me :
✓ Donner plus d'informations
✓ Proposer une visite
✓ Envoyer des photos/vidéos supplémentaires

Disponible pour échanger par téléphone.

Merci pour votre retour !`.replace(/\n/g, "%0a"); // Conversion des sauts de ligne pour URL

    window.open(`https://wa.me/2250747846608?text=${message}`, "_blank");
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);

  const getTypeLabel = (type: string) => {
    const labels = {
      house: "Maison",
      apartment: "Appartement",
      villa: "Villa",
      studio: "Studio",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden ">
        <img
          src={firstImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
          <div className="flex justify-between w-full">
            <div className="flex space-x-2">
              {/* <button
                onClick={handleCallClick}
                className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                title="Appeler"
              >
                <Phone className="h-4 w-4" />
              </button> */}
              {/* <button
                onClick={handleWhatsAppClick}
                className="p-2 bg-white/90 hover:bg-white text-green-600 rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </button> */}
            </div>

            {/* <Link
              to={`/property/${property.id}`}
              className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-all duration-200 hover:scale-110 shadow-sm"
              title="Voir les détails"
            >
              {/* <Eye className="h-4 w-4" /> */}
            {/* </Link> */} 
          </div>
        </div>

        <div className="absolute top-4 right-4 flex justify-between items-start space-x-2">
          <div className="flex flex-col space-y-2">
            {/* <span className="bg-amber-600/95 text-white text-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              {getTypeLabel(property.type)}
            </span> */}
            <span
              className={`px-3 py-1.5 rounded-full text-xs text-center font-semibold shadow-sm ${
                property.statut === "à louer"
                  ? "bg-blue-600/90 text-white"
                  : "bg-green-600/90 text-white"
              }`}
            >
              {property.statut}
            </span>
          </div>

          {/* <button
            onClick={handleFavoriteClick}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              isFavorite(property.id)
                ? "bg-red-500 text-white shadow-sm"
                : "bg-white/90 text-gray-600 hover:text-red-500 shadow-sm"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite(property.id) ? "fill-current" : ""
              }`}
            />
          </button> */}
        </div>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {property.title}
          </h3>
          <div className="text-right pl-2">
            
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3 text-sm">
          <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
          <span className="truncate">
            {property.location.address}, {property.location.city}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center text-black font-bold text-sm">
            <Home className="h-3.5 w-3.5 mr-1.5 text-black font-bold" />
            {property.rooms} pièces
          </div>
          <div className="flex items-center text-black font-bold text-sm">
            <Bath className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {property.bathrooms} SDB
          </div>
          <div className="flex items-center text-black font-bold text-sm">
            <Square className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
            {property.surface}m²
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200"
            >
              {feature}
            </span>
          ))}
          {property.features.length > 3 && (
            <span className="px-2.5 py-1 bg-gray-50  text-xs rounded-full border border-gray-200">
              +{property.features.length - 3}
            </span>
          )}
        </div>
<div className="flex flex-wrap md:flex-nowrap gap-2 space-x-6"> 
   <div className="text-xl font-bold text-blue-500  ">
              {formatPrice(property.price)}
            </div>
        <div className="mt-auto">
          <Link
            to={`/property/${property.id}`}
            className="w-full  bg-white hover:bg-blue-500 border border-blue-500 text-blue-500  hover:text-white py-1 px-3 rounded-lg font-medium transition-colors duration-200 text-sm "
          >
            Voir les détails
            {/* <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" /> */}
          </Link>
        </div>
      
        </div>
      </div>
    </div>
  );
}
