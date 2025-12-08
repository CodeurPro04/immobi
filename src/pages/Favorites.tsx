import { useEffect, useState } from "react";
import { Heart, Home } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { useFavorites } from "../context/FavoritesContext";
import { Property } from "../types/Property";
import { motion } from "framer-motion";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://darkgrey-dugong-226404.hostingersite.com/api/get_all_properties.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setAllProperties(data.data);
          setError(null);
        } else {
          setError("Erreur lors de la récupération des propriétés");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur réseau");
      })
      .finally(() => setLoading(false)); // Toujours arrêter le chargement
  }, []);

  const favoriteProperties = allProperties.filter((property) =>
    favorites.includes(property.id.toString())
  );

  if (loading)
    return <div className="text-center py-10 text-gray-500">Chargement...</div>;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Mes favoris
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {favoriteProperties.length === 0
              ? "Vous n'avez pas encore de biens favoris"
              : `${favoriteProperties.length} bien${
                  favoriteProperties.length > 1 ? "s" : ""
                } sauvegardé${favoriteProperties.length > 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Contenu */}
        {favoriteProperties.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-gray-400 mb-6">
              <Heart className="mx-auto h-24 w-24" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Aucun bien favori
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explorez notre catalogue et cliquez sur le cœur pour sauvegarder
              vos biens préférés.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              <Home className="h-5 w-5" />
              <span>Découvrir les biens</span>
            </Link>
          </motion.div>
        )}

        {/* Conseils */}
        {favoriteProperties.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Prochaines étapes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StepCard
                step="1"
                title="Comparer"
                text="Analysez les différentes caractéristiques et prix de vos biens favoris"
                color="blue"
              />
              <StepCard
                step="2"
                title="Visiter"
                text="Prenez rendez-vous pour visiter les propriétés qui vous intéressent le plus"
                color="green"
              />
              <StepCard
                step="3"
                title="Décider"
                text="Faites votre choix et lancez-vous dans l'acquisition de votre bien idéal"
                color="orange"
              />
            </div>
            <div className="text-center mt-8">
              <Link
                to="/contact"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant interne réutilisable pour les étapes
function StepCard({
  step,
  title,
  text,
  color,
}: {
  step: string;
  title: string;
  text: string;
  color: string;
}) {
  const bg = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  }[color];

  return (
    <div className="text-center p-4">
      <div
        className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl`}
      >
        {step}
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}
