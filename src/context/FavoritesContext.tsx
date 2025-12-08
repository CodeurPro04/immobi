import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const addToFavorites = (propertyId: string) => {
    setFavorites(prev => {
      const id = propertyId.toString();
      if (prev.includes(id)) return prev; // pas de doublon
      return [...prev, id];
    });
  };

  const removeFromFavorites = (propertyId: string) => {
    const id = propertyId.toString();
    setFavorites(prev => prev.filter(favId => favId !== id));
  };

  const isFavorite = (propertyId: string) => {
    const id = propertyId.toString();
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
