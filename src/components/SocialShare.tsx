import React from 'react';
import { Share2, Facebook, Instagram, X } from 'lucide-react';

interface SocialShareProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export default function SocialShare({ title, description, url }: SocialShareProps) {
  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnX = () => {
    const text = `${title} - ${description}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    // Instagram ne permet pas de partage direct via URL, on redirige vers l'app
    alert('Copiez le lien et partagez-le sur Instagram !');
    navigator.clipboard.writeText(url);
  };

  const shareNative = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url,
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Lien copié dans le presse-papiers !');
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <Share2 className="h-6 w-6 mr-2 text-amber-600" />
        Partager ce bien
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={shareOnFacebook}
          className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-blue-700 transition-colors">
            <Facebook className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Facebook</span>
        </button>

        <button
          onClick={shareOnX}
          className="flex flex-col items-center justify-center p-4 bg-black/10 hover:bg-black/20 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mb-2 group-hover:bg-black transition-colors">
            <X className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">X</span>
        </button>

        <button
          onClick={shareOnInstagram}
          className="flex flex-col items-center justify-center p-4 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-2 group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
            <Instagram className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Instagram</span>
        </button>

        <button
          onClick={shareNative}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
        >
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-700 transition-colors">
            <Share2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">Plus</span>
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Lien direct :</p>
        <div className="flex">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm bg-gray-50"
          />
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-lg text-sm transition-colors"
          >
            Copier
          </button>
        </div>
      </div>
    </div>
  );
}