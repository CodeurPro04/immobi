import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Home as HomeIcon,
  Award,
  Users,
  ArrowRight,
  Phone,
  SmileIcon,
  BriefcaseIcon,
} from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../types/Property";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const images = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Maison moderne
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Intérieur luxe
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Villa contemporaine
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", // Appartement design
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5s interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("https://darkgrey-dugong-226404.hostingersite.com/api/get_properties.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setFeaturedProperties(data.data);
        } else {
          console.error("Réponse API inattendue :", data);
          setFeaturedProperties([]);
        }
      })
      .catch((err) => {
        console.error("Erreur de requête :", err);
        setFeaturedProperties([]);
      });
  }, []);

  const stats = [
    {
      label: "Biens vendus",
      value: 970,
      unit: "+",
      icon: HomeIcon, // Remplace avec ton icône
    },
    {
      label: "Clients satisfaits",
      value: 98,
      unit: "%",
      icon: SmileIcon,
    },
    {
      label: "Années d'expérience",
      value: 15,
      unit: " ans",
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Luxe Absolu */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden isolate">
        {/* Diaporama en fond */}
        <div className="absolute inset-0 z-0">
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentIndex === index ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ))}
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-900/30 to-gray-900/90"></div>
        </div>

        {/* Particules décoratives */}
        <div className="absolute inset-0 z-1 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-amber-600 animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-white animate-float delay-1000"></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-20 text-center">
          <div className="mb-10 inline-flex items-center gap-4">
            <div className="h-px w-16 bg-amber-500"></div>
            <span className="font-display text-sm uppercase tracking-widest text-amber-500">
              Depuis 2023
            </span>
            <div className="h-px w-16 bg-amber-500"></div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-8">
            <span className="block font-light text-white">L'Art de</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400">
              l'Immobilier
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
            Sélection organisée des propriétés les plus extraordinaires du monde
            pour quelques privilégiés.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/properties"
              className="relative overflow-hidden group px-10 py-5 rounded-sm font-medium text-lg tracking-wider uppercase bg-transparent border border-amber-500 text-amber-500 hover:text-white transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-3">
                Explorer{" "}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-amber-500 z-0 w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"></span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-3 text-white group px-6 py-5 font-medium hover:text-amber-500 transition-colors"
            >
              <Phone className="h-5 w-5 text-amber-500" />
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-amber-500 after:transition-all after:duration-500 group-hover:after:w-full">
                Contact Privé
              </span>
            </Link>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-2 border-amber-500 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-500 rounded-full mt-2 animate-scrollIndicator"></div>
          </div>
        </div>

        {/* Vague architecturale */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-24 md:h-32"
          >
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              className="fill-gray-900 opacity-25"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="fill-gray-900"
            ></path>
          </svg>
        </div>
      </section>

      {/* Section Statistiques Luxe */}
      <section className="relative py-24 bg-gray-50 overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-amber-400/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/20 to-transparent"></div>
        </div>

        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-5 py-2.5 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 rounded-full mb-8 shadow-sm border border-amber-100">
              Notre excellence
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Chiffres{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Remarquables
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-400 mx-auto"></div>
            <p className="text-gray-500 italic mt-6">
              * Données mises à jour en {new Date().getFullYear()} - Taux de
              satisfaction client de 98.7%
            </p>
          </motion.div>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group text-center p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-200/50"
              >
                {/* Cercle icône */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute w-24 h-24 rounded-full bg-amber-400/10 group-hover:bg-amber-400/20 transition-all duration-500"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-md group-hover:shadow-lg border border-gray-100 group-hover:border-amber-200 transition-all duration-300">
                    <stat.icon className="h-10 w-10 text-amber-500 group-hover:text-amber-600 transition-colors duration-300" />
                  </div>
                </div>

                {/* Compteur */}
                <div className="relative mb-3 text-5xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300">
                  <CountUp
                    end={stat.value}
                    duration={2}
                    enableScrollSpy
                    scrollSpyOnce
                    separator=" "
                  />
                  {stat.unit && (
                    <span className="text-xl text-amber-500">{stat.unit}</span>
                  )}
                </div>

                {/* Libellé */}
                <p className="text-lg text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Ligne décorative */}
                <div className="mt-6">
                  <div className="w-16 h-0.5 bg-gradient-to-r from-gray-200 to-gray-200 mx-auto group-hover:from-amber-400 group-hover:to-blue-500 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biens en vedette */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Nos Bien{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                d'Exception
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-400 mx-auto"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-6">
              Découvrez une sélection de propriétés uniques, soigneusement
              choisies pour leur qualité exceptionnelle
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr mb-12">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index * 0.2}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
          >
            <Link
              to="/properties"
              className="inline-flex items-center px-8 py-4 bg-amber-600 from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              <span>Voir tous les biens</span>
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section Pourquoi Nous Choisir - Version Luxe Absolu */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Arrière-plan artistique */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/path/to/luxury-pattern.png')] bg-repeat opacity-10"></div>
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/5 to-amber-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-800/5 to-amber-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-8xl mx-auto px-8">
          {/* En-tête section */}
          <motion.div
            className="text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block px-5 py-2.5 text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 rounded-full mb-8 shadow-sm border border-amber-100">
              L'Excellence Immobilière
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Pourquoi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Choisir Notre Agence
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-amber-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez ce qui fait de nous le partenaire privilégié pour votre
              projet immobilier d'exception
            </p>
          </motion.div>

          {/* Grille avantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Recherche Exclusive",
                icon: <Search className="h-9 w-9 text-blue-600" />,
                description:
                  "Accès privilégié aux biens non listés et approche sur-mesure pour dénicher la perle rare.",
                color: "blue",
              },
              {
                title: "Expertise Inégalée",
                icon: <Award className="h-9 w-9 text-amber-600" />,
                description:
                  "15 ans d'expérience sur la Côte d'Azur avec un réseau d'experts du marché premium.",
                color: "amber",
              },
              {
                title: "Service Conciergerie",
                icon: <Users className="h-9 w-9 text-green-600" />,
                description:
                  "Accompagnement VIP 360° incluant gestion de projet, services bancaires et juridiques.",
                color: "green",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                className={`relative group overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-${item.color}-100 shadow-xl hover:shadow-2xl transition-all duration-500 p-10`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div
                    className={`flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 mb-8 mx-auto transition-all duration-500 group-hover:from-${item.color}-100 group-hover:to-${item.color}-200`}
                  >
                    <div
                      className={`flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-inner border border-${item.color}-100`}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-5">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center mt-24"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden font-bold text-white rounded-xl group"
            >
              <span className="absolute inset-0 w-full h-full bg-amber-600 from-blue-700 to-blue-600 transition-all duration-300 group-hover:from-blue-800 group-hover:to-blue-700"></span>
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/10 to-transparent"></span>
              <span className="relative z-10 flex items-center text-lg tracking-wider">
                Rencontrer Notre Équipe
                <ArrowRight className="h-5 w-5 ml-4 transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
