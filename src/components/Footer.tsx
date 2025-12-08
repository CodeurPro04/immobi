import { useState, useEffect } from "react";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Facebook,
  X,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [message, setMessage] = useState("");

  // Effet pour cacher le message après 3 secondes
  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-24 pb-12 relative overflow-hidden">
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
              <div className="relative">
                <div className="w-20 h-20  rounded-xl flex items-center justify-center transform group-hover:rotate-3 transition-transform">
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
            <p className="text-gray-400 mb-6 leading-relaxed">
              L'excellence immobilière en Côte d'Ivoire depuis 2023.
            </p>
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
                <MapPin className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-amber-500 mr-3" />
                <span className="text-gray-400">+225 07 47 84 66 08</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-amber-500 mr-3" />
                <span className="text-gray-400">contact@altus-groupe.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-3" />
                <span className="text-gray-400">
                  Lun-Ven: 9h-19h
                  <br />
                  Sam: 10h-16h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 mb-16 border border-gray-700/50">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">
              Recevez nos offres exclusives
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Abonnez-vous à notre newsletter pour accéder en avant-première à
              nos propriétés d'exception.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setMessage("Veuillez entrer une adresse email valide.");
                  setStatus("error");
                  return;
                }

                setStatus("loading");
                try {
                  const res = await fetch(
                    "https://darkgrey-dugong-226404.hostingersite.com/api/newsletter.php",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    }
                  );

                  const result = await res.json();

                  if (result.status === "success") {
                    setMessage(
                      "Merci pour votre inscription à la newsletter !"
                    );
                    setStatus("success");
                    setEmail("");
                  } else {
                    setMessage(
                      result.message === "EMAIL_ALREADY_EXISTS"
                        ? "Cet email est déjà inscrit à la newsletter."
                        : "Une erreur est survenue."
                    );
                    setStatus("error");
                  }
                } catch (err) {
                  console.error(err);
                  setMessage("Impossible de contacter le serveur.");
                  setStatus("error");
                }
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email privilégié"
                className="flex-1 px-5 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Envoi..." : "S'abonner"}
              </button>
            </form>

            {/* Message d'info avec disparition auto */}
            {status !== "idle" && (
              <div
                className={`mt-4 px-4 py-3 rounded-lg text-sm shadow-md transition-all duration-300 flex items-start gap-3
                ${
                  status === "success"
                    ? "bg-green-50 border border-green-300 text-green-700"
                    : "bg-red-50 border border-red-300 text-red-700"
                }`}
              >
                <span className="text-lg">
                  {status === "success" ? "✅" : "❌"}
                </span>
                <p className="flex-1 leading-relaxed">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Élite Immobilier. Tous droits
              réservés. By{" "}
              <a href="https://www.instagram.com/dryxo_off/">DrYxO_CoDe</a>
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link
                to="#"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300"
              >
                CGU
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-amber-500 text-sm transition-colors duration-300"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
