import { useEffect, useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import {
  MapPin,
  Home,
  Bath,
  Square,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";
import ImageGallery from "../components/ImageGallery";
import GoogleMap from "../components/GoogleMap";
import ContactButtons from "../components/ContactButtons";
import SocialShare from "../components/SocialShare";
import { Property } from "../types/Property";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visitName, setVisitName] = useState("");
  const [visitEmail, setVisitEmail] = useState("");
  const [visitPhone, setVisitPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitSending, setVisitSending] = useState(false);
  const [visitMessage, setVisitMessage] = useState<null | string>(null);

  // États du formulaire
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Récupération de la propriété
  useEffect(() => {
    setLoading(true);
    fetch(`https://darkgrey-dugong-226404.hostingersite.com/api/get_property_by_id.php?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
        return res.json();
      })
      .then((response: { success: boolean; data: Property }) => {
        if (response.success) {
          const images = response.data.images;

          // Convertir si c'est une chaîne JSON
          let parsedImages: string[] = [];
          if (typeof images === "string") {
            try {
              parsedImages = JSON.parse(images);
            } catch (err) {
              console.error("Erreur de parsing des images", err);
            }
          } else if (Array.isArray(images)) {
            parsedImages = images;
          }

          // Construire les URLs absolues
          const fullImageUrls = parsedImages.map(
            (img) => `https://darkgrey-dugong-226404.hostingersite.com/api/${img.replace(/\\/g, "/")}`
          );

          setProperty({ ...response.data, images: fullImageUrls });

          // Pré-remplir message
          setMessage(
            `Bonjour,\n\nJe suis intéressé par le bien "${response.data.title}".\n\nPourriez-vous me donner plus d'informations ?\n\nCordialement`
          );
        } else {
          setError("Bien introuvable");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur est survenue.");
        setLoading(false);
      });
  }, [id]);

  // Auto effacement du message après 5 secondes
  useEffect(() => {
    if (formMessage) {
      const timer = setTimeout(() => {
        setFormMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formMessage]);

  // Formatage prix en XOF
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Label type de bien
  const getTypeLabel = (type: string) => {
    const labels = {
      house: "Maison",
      apartment: "Appartement",
      villa: "Villa",
      studio: "Studio",
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Soumission du formulaire
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormMessage(null);

    if (!name || !email || !phone || !message) {
      setFormMessage({
        type: "error",
        text: "Merci de remplir tous les champs.",
      });
      return;
    }

    if (!property) {
      setFormMessage({
        type: "error",
        text: "Erreur interne: bien non chargé.",
      });
      return;
    }

    setSending(true);

    try {
      const res = await fetch("https://darkgrey-dugong-226404.hostingersite.com/api/send_inquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId: property.id,
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setFormMessage({
          type: "success",
          text: data.message || "Demande envoyée avec succès !",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage(
          `Bonjour,\n\nJe suis intéressé par le bien "${property.title}".\n\nPourriez-vous me donner plus d'informations ?\n\nCordialement`
        );
      } else {
        setFormMessage({
          type: "error",
          text: data.message || "Une erreur est survenue.",
        });
      }
    } catch (err) {
      setFormMessage({ type: "error", text: "Erreur réseau ou serveur." });
      console.error(err);
    }

    setSending(false);
  }

  if (loading) {
    return <div className="text-center py-20">Chargement en cours...</div>;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Bien non trouvé
          </h1>
          <p className="text-gray-600">
            Le bien que vous recherchez n'existe pas ou a été supprimé.
          </p>
        </div>
      </div>
    );
  }

  function extractYouTubeID(url: string): string | null {
    const regExp =
      /^.*(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
  }
  function extractTikTokID(url: string | null | undefined): string | null {
    if (!url) return null;
    const regExp = /tiktok\.com\/@[^/]+\/video\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const videoID = property.video_url
    ? extractTikTokID(property.video_url)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {property.location.address}, {property.location.city}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-amber-600 mb-2">
                {formatPrice(property.price)}
              </div>

              <div className="flex items-center justify-end gap-2">
                {/* Type de bien */}
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getTypeLabel(property.type)}
                </span>

                {/* Statut du bien */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    property.statut === "à louer"
                      ? "bg-blue-600/90 text-white"
                      : "bg-green-600/90 text-white"
                  }`}
                >
                  {property.statut}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              <span>{property.rooms} pièces</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-5 w-5 mr-2" />
              <span>
                {property.bathrooms} salle{property.bathrooms > 1 ? "s" : ""} de
                bain
              </span>
            </div>
            <div className="flex items-center">
              <Square className="h-5 w-5 mr-2" />
              <span>{property.surface} m²</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>
                Publié le{" "}
                {new Date(property.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ImageGallery images={property.images} title={property.title} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Visite Virtuelle */}
            {property.video_url && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 text-amber-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
                    />
                  </svg>
                  Visite virtuelle du bien
                </h3>

                <div className="overflow-hidden rounded-2xl shadow-md border border-gray-200 aspect-video">
                  {property.video_url.includes("youtube.com") ||
                  property.video_url.includes("youtu.be") ? (
                    <iframe
                      className="w-full h-full rounded-2xl"
                      src={`https://www.youtube.com/embed/${extractYouTubeID(
                        property.video_url
                      )}`}
                      title="Visite virtuelle"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : property.video_url.includes("tiktok.com") && videoID ? (
                    <iframe
                      width="100%"
                      height="480"
                      src={`https://www.tiktok.com/embed/${videoID}`}
                      title="TikTok vidéo"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      className="rounded-2xl border border-gray-200"
                    />
                  ) : (
                    <video
                      className="w-full h-auto rounded-2xl"
                      controls
                      preload="metadata"
                    >
                      <source src={property.video_url} type="video/mp4" />
                      Votre navigateur ne prend pas en charge la vidéo.
                    </video>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Équipements et prestations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-amber-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <SocialShare
              title={property.title}
              description={property.description.slice(0, 100) + "..."}
              url={window.location.href}
              image={property.images[0]}
            />
          </div>

          {/* Colonne droite */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-6 w-6 mr-2 text-amber-600" />
                Votre conseiller
              </h3>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {property.agent.name}
                </h4>
                <p className="text-gray-600">Conseiller immobilier</p>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Appeler</span>
                </a>

                <a
                  href={`mailto:${
                    property.agent.email
                  }?subject=Demande d'information - ${
                    property.title
                  }&body=Bonjour,\n\nJe suis intéressé par le bien "${
                    property.title
                  }" à ${formatPrice(
                    property.price
                  )}.\n\nPourriez-vous me donner plus d'informations ?\n\nCordialement`}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Envoyer un email</span>
                </a>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Demander une visite</span>
                </button>
              </div>
            </div>

            <Dialog
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              className="fixed z-50 inset-0 overflow-y-auto"
            >
              <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50 px-4">
                <Dialog.Panel className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
                    Programmer une visite
                  </Dialog.Title>

                  {visitMessage && (
                    <div className="mb-3 text-sm text-green-600 bg-green-100 p-2 rounded">
                      {visitMessage}
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Nom */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        placeholder="Votre nom"
                      />
                    </div>

                    {/* Email avec validation restrictive */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        className={`w-full border px-3 py-2 rounded ${
                          visitEmail &&
                          !/^[^\s@]+@(gmail\.com|yahoo\.(com|fr)|outlook\.com|hotmail\.com|icloud\.com|protonmail\.com)$/i.test(
                            visitEmail
                          )
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                        value={visitEmail}
                        onChange={(e) => setVisitEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                      />
                      {visitEmail &&
                        !/^[^\s@]+@(gmail\.com|yahoo\.(com|fr)|outlook\.com|hotmail\.com|icloud\.com|protonmail\.com)$/i.test(
                          visitEmail
                        ) && (
                          <p className="mt-1 text-sm text-red-600">
                            Seuls les emails @gmail.com, @yahoo.com, @yahoo.fr,
                            @outlook.com, @hotmail.com, @icloud.com ou
                            @protonmail.com sont acceptés
                          </p>
                        )}
                    </div>

                    {/* Téléphone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        className="w-full border px-3 py-2 rounded"
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        placeholder="07 07 07 07 07"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date souhaitée
                      </label>
                      <input
                        type="date"
                        className="w-full border px-3 py-2 rounded"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                      />
                    </div>

                    {/* Heure */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Heure
                      </label>
                      <input
                        type="time"
                        className="w-full border px-3 py-2 rounded"
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                      />
                    </div>

                    {/* Bouton d'envoi */}
                    <button
                      onClick={async () => {
                        if (
                          !visitDate ||
                          !visitTime ||
                          !visitName ||
                          !visitEmail ||
                          !visitPhone ||
                          !property
                        )
                          return;

                        setVisitSending(true);
                        setVisitMessage(null);

                        try {
                          const res = await fetch(
                            "https://darkgrey-dugong-226404.hostingersite.com/api/request_visit.php",
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                propertyId: property.id,
                                name: visitName,
                                email: visitEmail,
                                phone: visitPhone,
                                date: visitDate,
                                time: visitTime,
                              }),
                            }
                          );
                          const data = await res.json();

                          if (data.success) {
                            setVisitMessage(
                              "Votre demande de visite a été envoyée !"
                            );
                            setTimeout(() => {
                              setIsModalOpen(false);
                              setVisitDate("");
                              setVisitTime("");
                              setVisitName("");
                              setVisitEmail("");
                              setVisitPhone("");
                              setVisitMessage(null);
                            }, 3000);
                          } else {
                            setVisitMessage(
                              "Erreur lors de l’envoi. Réessayez."
                            );
                          }
                        } catch (err) {
                          setVisitMessage("Erreur réseau.");
                          console.error(err);
                        }

                        setVisitSending(false);
                      }}
                      disabled={visitSending}
                      className={`w-full py-2 px-4 rounded text-white font-medium ${
                        visitSending
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {visitSending ? "Envoi..." : "Envoyer la demande"}
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>

            {/* Formulaire demande d'information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Demande d'information
              </h3>

              {formMessage && (
                <div
                  className={`mb-4 p-3 rounded ${
                    formMessage.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {formMessage.text}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre@email.com"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                    disabled={sending}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre message..."
                    disabled={sending}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors text-white ${
                    sending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-amber-600 hover:bg-amber-700"
                  }`}
                >
                  {sending ? "Envoi en cours..." : "Envoyer la demande"}
                </button>
              </form>
            </div>

            <GoogleMap
              address={property.location.address}
              city={property.location.city}
              coordinates={property.location.coordinates}
            />
          </div>
        </div>
      </div>

      <ContactButtons property={property} />
    </div>
  );
}
