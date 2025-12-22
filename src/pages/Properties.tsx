import { useState, useMemo, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import { PropertyFilters as Filters, Property } from "../types/Property";
import { motion } from "framer-motion";

// Variante d'animation pour chaque carte
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function Properties() {
  const [filters, setFilters] = useState<Filters>({});
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // État pour le tri
  const [sortBy, setSortBy] = useState<
    "price-asc" | "price-desc" | "surface" | "date"
  >("price-asc");

  useEffect(() => {
    setLoading(true);
    fetch("https://darkgrey-dugong-226404.hostingersite.com/api/get_all_properties.php")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then(
        (response: { success: boolean; data: Property[]; count: number }) => {
          if (response.success) {
            setProperties(response.data);
          } else {
            setError("Erreur serveur : données non disponibles.");
          }
          setLoading(false);
        }
      )
      .catch((err) => {
        console.error("Erreur de chargement:", err);
        setError("Une erreur est survenue lors du chargement des biens.");
        setLoading(false);
      });
  }, []);

  // Filtrage des propriétés selon les filtres
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          property.title.toLowerCase().includes(searchLower) ||
          property.location.city.toLowerCase().includes(searchLower) ||
          property.location.address.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }
      if (filters.type && property.type !== filters.type) {
        return false;
      }
      if (filters.city && property.location.city !== filters.city) {
        return false;
      }
      if (filters.rooms) {
        if (filters.rooms === 5 && property.rooms < 5) {
          return false;
        } else if (filters.rooms !== 5 && property.rooms !== filters.rooms) {
          return false;
        }
      }
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  }, [filters, properties]);

  // Tri appliqué au tableau filtré
  const sortedProperties = useMemo(() => {
    const sorted = [...filteredProperties];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "surface":
        sorted.sort((a, b) => b.surface - a.surface);
        break;
      case "date":
        sorted.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [filteredProperties, sortBy]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Luxe - Version Ultra Premium */}
      <div className="relative h-screen min-h-[800px] max-h-[1200px] overflow-hidden bg-gray-900">
        {/* Image de fond en haute résolution avec overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
            alt="Villa contemporaine d'exception"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900/90"></div>
        </div>

        {/* Contenu parfaitement centré */}
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="px-6 sm:px-8 lg:px-12 w-full max-w-6xl mx-auto">
            
            {/* Titre principal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light mb-6 leading-tight text-white">
              <span className="block font-serif italic text-amber-100">
                Votre
              </span>
              <span className="block mt-2 font-bold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                  Résidence
                </span>{" "}
                Exclusive
              </span>
            </h1>

            {/* Séparateur élégant */}
            <div className="w-24 h-1 bg-amber-400 mx-auto my-8"></div>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Découvrez des propriétés d'exception sélectionnées parmi les plus
              belles demeures de la région
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-8  ">
        <div>
        {/* Filtres */}
        <PropertyFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
</div>
<div>
        {/* Loading et erreur */}
        {loading && (
          <p className="text-center py-12">Chargement des biens en cours...</p>
        )}
        {error && <p className="text-center py-12 text-red-500">{error}</p>}

        {/* Résultats */}
        {!loading && !error && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {sortedProperties.length} bien
                {sortedProperties.length > 1 ? "s" : ""} trouvé
                {sortedProperties.length > 1 ? "s" : ""}
              </p>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "price-asc"
                      | "price-desc"
                      | "surface"
                      | "date"
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="price-asc">Trier par : Prix croissant</option>
                <option value="price-desc">Trier par : Prix décroissant</option>
                <option value="surface">Trier par : Surface</option>
                <option value="date">Trier par : Date</option>
              </select>
            </div>

            {sortedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16 text-gray-500"
              >
                Aucun bien trouvé. Essayez de modifier vos critères de
                recherche.
                <br />
                <button
                  onClick={() => setFilters({})}
                  className="mt-6 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </>
          
        )}
      </div>
      </div>
    </div>
  );
}
