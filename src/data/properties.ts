import { Property } from '../types/Property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderne avec Piscine',
    price: 85000078,
    type: 'villa',
    location: {
      address: '15 Avenue des Champs',
      city: 'Cannes',
      coordinates: { lat: 43.5528, lng: 7.0174 }
    },
    rooms: 5,
    bathrooms: 3,
    surface: 180,
    description: 'Magnifique villa contemporaine avec vue mer, piscine et jardin paysager. Finitions haut de gamme, climatisation, garage double.',
    images: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    videoUrl: 'https://youtu.be/pxjsZK_fkO4?si=m2OBSx4foJG1xhNT',
    features: ['Piscine', 'Jardin', 'Garage', 'Climatisation', 'Vue mer'],
    agent: {
      name: 'Marie Dubois',
      phone: '+33 6 12 34 56 78',
      email: 'marie.dubois@immobilier.fr'
    },
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Appartement Centre-Ville Rénové',
    price: 420000,
    type: 'apartment',
    location: {
      address: '22 Rue de la Paix',
      city: 'Nice',
      coordinates: { lat: 43.7102, lng: 7.2620 }
    },
    rooms: 3,
    bathrooms: 2,
    surface: 85,
    description: 'Superbe appartement entièrement rénové au cœur de Nice. Lumineux, balcon, proche commodités et transports.',
    images: [
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    videoUrl: 'https://vimeo.com/123456789',
    features: ['Balcon', 'Ascenseur', 'Cave', 'Proche transports'],
    agent: {
      name: 'Pierre Martin',
      phone: '+33 6 98 76 54 32',
      email: 'pierre.martin@immobilier.fr'
    },
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Maison Familiale avec Jardin',
    price: 680000,
    type: 'house',
    location: {
      address: '8 Impasse du Soleil',
      city: 'Antibes',
      coordinates: { lat: 43.5804, lng: 7.1251 }
    },
    rooms: 4,
    bathrooms: 2,
    surface: 140,
    description: 'Belle maison familiale dans quartier résidentiel calme. Grand jardin, terrasse couverte, garage.',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Jardin', 'Terrasse', 'Garage', 'Quartier calme'],
    agent: {
      name: 'Sophie Laurent',
      phone: '+33 6 11 22 33 44',
      email: 'sophie.laurent@immobilier.fr'
    },
    createdAt: '2024-01-08'
  },
  {
    id: '4',
    title: 'Studio Moderne Centre Monaco',
    price: 380000,
    type: 'studio',
    location: {
      address: '12 Boulevard des Moulins',
      city: 'Monaco',
      coordinates: { lat: 43.7384, lng: 7.4246 }
    },
    rooms: 1,
    bathrooms: 1,
    surface: 35,
    description: 'Studio luxueux au cœur de Monaco. Entièrement meublé, vue mer partielle, proche Casino.',
    images: [
      'https://images.pexels.com/photos/2029670/pexels-photo-2029670.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Meublé', 'Vue mer', 'Centre-ville', 'Proche Casino'],
    agent: {
      name: 'Jean Moreau',
      phone: '+33 6 55 44 33 22',
      email: 'jean.moreau@immobilier.fr'
    },
    createdAt: '2024-01-12'
  }
];