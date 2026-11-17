// The chapters of the story, in reading order. Used by the chapter rail and the "next chapter" links.
export const CHAPTERS = [
    { id: 'turning-point', title: 'The Turning Point' },
    { id: 'across-the-map', title: 'Across the Map' },
    { id: 'older-nation', title: 'An Older Nation' },
    { id: 'smaller-families', title: 'Smaller Families' },
    { id: 'later-motherhood', title: 'Motherhood, Later' },
    { id: 'choices', title: 'A Question of Choice' },
    { id: 'price-of-a-home', title: 'The Price of a Home' },
    { id: 'wider-economy', title: 'The Wider Economy' },
].map((c, i) => ({ ...c, number: String(i + 1).padStart(2, '0') }));

export const getChapter = (id) => CHAPTERS.find(c => c.id === id);
export const getNextChapter = (id) => CHAPTERS[CHAPTERS.findIndex(c => c.id === id) + 1];
