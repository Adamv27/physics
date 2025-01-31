export const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

export const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
