/**
 * useWishlist — thin wrapper around WishlistContext.
 *
 * Every component that calls this hook shares the SAME underlying
 * wishlist state (managed in WishlistProvider/WishlistContext).
 * That means toggling a heart in CourseCard instantly updates the
 * Saved filter counter in CoursesSection — no page refresh needed.
 */
import { useWishlistContext } from '../context/WishlistContext'

export function useWishlist() {
  return useWishlistContext()
}
