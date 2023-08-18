
// determines if a string is null, empty, or whitespace
export const isNullOrWhiteSpace = (str: string): boolean => {
    return !str || str.length === 0 || /^\s*$/.test(str);
}

// parse a string to a TCH string
export const parseTCH = (value) => {
    return value.split(' ').map(item =>
        Number(item) ? `${item.replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')}` : item
    ).join(' ');
}

// parse milliseconds to a time count string
export const parseTimeCount = (value) => {
    value = parseFloat(value);
    if (value < 1000) {
        return '< 1s';
    }
    const seconds = Math.floor(value / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds - minutes * 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}
