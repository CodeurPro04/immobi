import React from "react";
import { Phone, MessageSquare, Mail, Share2 } from "lucide-react";
import { Property } from "../types/Property";

interface ContactButtonsProps {
  property: Property;
}

export default function ContactButtons({ property }: ContactButtonsProps) {
  const handleCall = () => {
    window.open(`tel:${property.agent.phone}`, "_self");
  };

  /* const handleSMS = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par le bien "${property.title}"`
    );
    window.open(`sms:${property.agent.phone}?body=${message}`, "_self");
  }; */

  const handleWhatsApp = () => {
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

  const handleEmail = () => {
    const subject = encodeURIComponent(
      `Demande d'information - ${property.title}`
    );
    const body = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé par le bien suivant :\n${
        property.title
      }\nPrix : ${property.price.toLocaleString(
        "fr-FR"
      )} FCFA\nLocalisation : ${property.location.address}, ${
        property.location.city
      }\n\nPourriez-vous me donner plus d'informations ?\n\nCordialement`
    );
    window.open(
      `mailto:${property.agent.email}?subject=${subject}&body=${body}`,
      "_self"
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Découvrez ce bien immobilier : ${
          property.title
        } - ${property.price.toLocaleString("fr-FR")} FCFA`,
        url: window.location.href,
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Web Share
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Lien copié dans le presse-papiers !");
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col space-y-3">
        {/* Bouton principal d'appel */}
        <button
          onClick={handleCall}
          className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          title="Appeler maintenant"
        >
          <Phone className="h-6 w-6" />
          <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Appeler
          </span>
        </button>

        {/* Autres boutons */}
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleWhatsApp}
            className="group relative bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="WhatsApp"
          >
            <MessageSquare className="h-5 w-8" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              WhatsApp
            </span>
          </button>

          <button
            onClick={handleEmail}
            className="group relative bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Envoyer un email"
          >
            <Mail className="h-5 w-8" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Email
            </span>
          </button>

          <button
            onClick={handleShare}
            className="group relative bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            title="Partager"
          >
            <Share2 className="h-5 w-8" />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Partager
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
