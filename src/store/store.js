import create from 'zustand';

const useStore = create((set) => ({
    posts: [],
    setPosts: (posts) => set({ posts }),
    fav: 0,
    setFav: (fav) => set({ fav }),
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
    toggleFavorite: (postId, secret) => set((state) => {
        let updatedFavorites;
        if (state.favorites.includes(postId)) {
            updatedFavorites = state.favorites.filter(id => id !== postId);
        } else {
            updatedFavorites = [...state.favorites, postId];
        }
        localStorage.setItem(secret, JSON.stringify(updatedFavorites));
        return {
            favorites: updatedFavorites,
            fav: updatedFavorites.length
        };
    })
}));

export default useStore;
