import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://darkgrey-dugong-226404.hostingersite.com/api/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.status === "success") {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        alert("Erreur : " + result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+225 07 47 84 66 08",
      link: "tel:+2250747846608",
      color: "text-green-600 bg-green-100",
    },
    {
      icon: Mail,
      title: "Email",
      value: "contact@altus-groupe.com",
      link: "mailto:contact@altus-groupe.com",
      color: "text-blue-600 bg-blue-100",
    },
    {
      icon: MapPin,
      title: "Adresse",
      value: "Abidjan, Côte d'Ivoire",
      link: "https://goo.gl/maps/example",
      color: "text-red-600 bg-red-100",
    },
    {
      icon: Clock,
      title: "Horaires",
      value: "Lun-Ven: 9h-18h, Sam: 9h-12h",
      color: "text-orange-600 bg-orange-100",
    },
  ];

  const subjects = [
    "Demande d'information générale",
    "Visite d'un bien",
    "Estimation de bien",
    "Vente de bien",
    "Location",
    "Investissement immobilier",
    "Autre",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Contact Page */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-amber-900/80"></div>
        <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Entrons en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                Contact
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Une question ? Un projet ? Notre équipe est à votre écoute pour
              vous accompagner. N’hésitez pas à nous écrire, nous vous
              répondrons dans les plus brefs délais.
            </p>
            <p className="text-lg text-gray-400">
              Ensemble, construisons votre avenir immobilier avec confiance et
              transparence.
            </p>
          </div>
        </div>
      </div>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 py-8">
        {/* En-tête */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Nos coordonnées
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${info.color}`}
                    >
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {info.title}
                      </p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-sm text-gray-600 hover:text-blue-600 transition-colors break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact rapide */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contact express
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Pour une réponse immédiate, contactez-nous directement :
              </p>

              <div className="space-y-3">
                <a
                  href="tel:+2250747846608"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Appeler maintenant</span>
                </a>

                <a
                  href="https://wa.me/2250747846608?text=Bonjour, je souhaite des informations sur vos services immobiliers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Description du bien réchercher
              </h3>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Message envoyé !
                  </h4>
                  <p className="text-gray-600">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Sujet *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        {subjects.map((subject, index) => (
                          <option key={index} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Décrivez votre demande en détail..."
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 text-sm text-gray-600"
                    >
                      J'accepte d'être contacté par Premium Immobilier
                      concernant ma demande et je comprends que mes données
                      personnelles seront traitées conformément à la politique
                      de confidentialité.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>Envoyer le message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Section carte */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Nous trouver
            </h3>
            <p className="text-gray-600 mb-4">
              Notre agence est située au cœur de Nice, facilement accessible en
              transport en commun.
            </p>
          </div>

          {/* Intégration de Google Maps avec coordonnées réelles */}
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://maps.app.goo.gl/o667aLkSe3qEUehS9`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
