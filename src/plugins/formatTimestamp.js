const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const months = [
        'Sausio', 'Vasario', 'Kovo', 'Balandžio', 'Gegužės', 'Birželio',
        'Liepos', 'Rugpjūčio', 'Rugsėjo', 'Spalio', 'Lapkričio', 'Gruodžio'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month} ${day}d, ${year}, ${hours}:${minutes}`;
};

export default formatTimestamp