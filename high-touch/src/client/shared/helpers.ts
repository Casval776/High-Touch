// Helper function to generate a random ID, useful to keeping track of unique items
// Generates a number between 0 and max safe integer value, ~9 quadrillion
// Probably overkill but uniqueness shouldn't be ignored
export const getRandomId = (min?: number, max?: number): number => {
    if (min === undefined) min = 0;
    if (max === undefined) max = Number.MAX_SAFE_INTEGER;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}