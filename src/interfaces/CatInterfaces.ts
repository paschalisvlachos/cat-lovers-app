export interface Breed {
    id: string;
    name: string;
    description: string;
    origin: string;
    temperament: string;
  }
  
  export interface Cat {
    id: string;
    url: string;
    breeds?: Breed[];
  }

  export interface BreedModalProps {
    selectedBreed: Breed | null;
    breedImages: Cat[];
    onClose: () => void;
    handleCatClick: (cat: Cat) => void;
  }

  export interface FavoritesProps {
    favorites: Cat[];
  }

  export interface CatGalleryProps {
    addToFavorites: (cat: Cat) => void;
    removeFromFavorites: (cat: Cat) => void;
    isFavorite: (catId: string) => boolean;
  }

  export interface CatModalProps {
    onClose: () => void;
    addToFavorites: (cat: Cat) => void;
    removeFromFavorites: (cat: Cat) => void;
    isFavorite: (catId: string) => boolean;
  }