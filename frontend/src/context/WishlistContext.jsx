import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { wishlistApi } from "../api/wishlistApi";
import { getCurrentUser } from "../utils/auth";
import { useAuthContext } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuthContext();

  const refresh = useCallback(() => {
    const user = getCurrentUser();

    // No logged-in user -> nothing to fetch, wishlist is simply empty.
    if (!user) {
      setIds([]);
      setLoading(false);
      return Promise.resolve();
    }

    setLoading(true);

    return wishlistApi
      .getMyWishlist()
      .then((res) => {
        setIds(res.data.map((item) => item.courseId));
      })
      .catch((err) => {
        console.error("Error fetching wishlist", err);
        setIds([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Wishlist now lives entirely on the backend, scoped by the
  // authenticated user's id/email at the database level — there is no
  // client-side storage key to get wrong. Re-fetching whenever the auth
  // token changes (login, logout, or switching accounts) guarantees the
  // list shown always belongs to whoever is actually logged in right now,
  // even without a full page reload.
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.token, refresh]);

  const isSaved = useCallback(
    (courseId) => ids.includes(courseId),
    [ids]
  );

  const toggle = useCallback(async (courseId) => {
    // Optimistic update for a snappy UI, reconciled with the server response.
    setIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );

    try {
      const res = await wishlistApi.toggle(courseId);

      setIds((prev) => {
        const alreadyIn = prev.includes(courseId);

        if (res.data.saved && !alreadyIn) return [...prev, courseId];
        if (!res.data.saved && alreadyIn) return prev.filter((id) => id !== courseId);
        return prev;
      });
    } catch (err) {
      console.error("Error toggling wishlist item", err);
      // Roll back the optimistic update on failure.
      refresh();
    }
  }, [refresh]);

  return (
    <WishlistContext.Provider
      value={{
        savedIds: ids,
        isSaved,
        toggle,
        loading,
        refresh,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlistContext must be used within WishlistProvider"
    );
  }

  return context;
}
