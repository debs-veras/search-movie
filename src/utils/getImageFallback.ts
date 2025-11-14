export function getImageUrl(mediaType?: string) {
  switch (mediaType) {
    case 'movie':
      return '/movie.png';
    case 'tv':
      return '/serie.png';
    case 'person':
      return '/avatar.png';
    default:
      return '/picture.png';
  }
}
