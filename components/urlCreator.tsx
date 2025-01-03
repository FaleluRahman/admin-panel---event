export const createUrlLink = (title: string): string => {
    const words = title.split(' ');
    const firstFiveWords = words.slice(0, 5);
    const urlLink = firstFiveWords.join('-').toLowerCase();
    return urlLink;
  };