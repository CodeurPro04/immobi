import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface GoogleMapProps {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export default function GoogleMap({ address, city, coordinates }: GoogleMapProps) {
  // URL d'intégration SANS clé API
  const embedUrl = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=15&output=embed`;

  // Lien pour ouvrir dans Google Maps
  const openInMaps = () => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  // Lien pour obtenir un itinéraire
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-amber-600" />
          Localisation
        </h3>

        <div className="mb-4">
          <p className="text-gray-700 font-medium">{address}</p>
          <p className="text-gray-600">{city}</p>
        </div>

        {/* Carte Google Maps sans clé API */}
        <div className="relative mb-4 w-full h-64 rounded-lg overflow-hidden">
          <iframe
            title="Carte sans API"
            src={embedUrl}
            width="100%"
            height="100%"
            className="border-0 w-full h-full"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={openInMaps}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Voir sur Maps</span>
          </button>

          <button
            onClick={getDirections}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Navigation className="h-4 w-4" />
            <span>Itinéraire</span>
          </button>
        </div>
      </div>
    </div>
  );
}
