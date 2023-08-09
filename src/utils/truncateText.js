const truncateText = (text) => {
    const words = text.split(' ')
    const truncated = words.slice(0, 12).join(' ')
    return words.length > 10 ? truncated + ' ....' : truncated
}

export default truncateText
