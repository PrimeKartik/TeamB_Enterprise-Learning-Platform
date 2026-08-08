export const formatPrice = (price) =>
  `₹${Number(price).toLocaleString('en-IN')}`;

export const formatRating = (rating) =>
  `${rating} ⭐`;

export const formatDuration = (hours) =>
  `${hours} hrs`;

export const formatProgress = (value) =>
  `${value}%`;