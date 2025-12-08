import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { PropertyFilters as Filters } from '../types/Property';

interface PropertyFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);

  const roomOptions: Option[] = [
    { value: '', label: 'Nb pièces' },
    { value: '1', label: '1 pièce' },
    { value: '2', label: '2 pièces' },
    { value: '3', label: '3 pièces' },
    { value: '4', label: '4 pièces' },
    { value: '5', label: '5+ pièces' },
  ];

  // Chargement dynamique des types de bien et villes
  useEffect(() => {
    fetch('https://darkgrey-dugong-226404.hostingersite.com/api/filters.php') // À adapter selon ton API
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPropertyTypes([{ value: '', label: 'Tous les types' }, ...data.types]);
          setCities([{ value: '', label: 'Toutes les villes' }, ...data.cities]);
        }
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des filtres :', err);
        // En fallback, tu peux garder les anciennes valeurs en dur ici si tu veux
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Recherche principale */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Rechercher par ville, quartier..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filtres</span>
        </button>
      </div>

      {/* Filtres avancés */}
      {isOpen && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Type de bien */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de bien
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={filters.type || ''}
                onChange={(e) => onFiltersChange({ ...filters, type: e.target.value || undefined })}
              >
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ville */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={filters.city || ''}
                onChange={(e) => onFiltersChange({ ...filters, city: e.target.value || undefined })}
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Pièces */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pièces
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={filters.rooms || ''}
                onChange={(e) =>
                  onFiltersChange({ ...filters, rooms: e.target.value ? Number(e.target.value) : undefined })
                }
              >
                {roomOptions.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Prix min */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix min (FCFA)
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={filters.minPrice || ''}
                onChange={(e) =>
                  onFiltersChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>

            {/* Prix max */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix max (FCFA)
              </label>
              <input
                type="number"
                placeholder="1000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={filters.maxPrice || ''}
                onChange={(e) =>
                  onFiltersChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
