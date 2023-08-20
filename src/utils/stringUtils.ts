
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

// parse time count string
export const parseTimeCount = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}