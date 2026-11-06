function emojiCodepoints(grapheme) {
    const values = Array.from(grapheme)
        .filter((character) => character.codePointAt(0) !== 0xfe0e && character.codePointAt(0) !== 0xfe0f)
        .map((character) => character.codePointAt(0).toString(16));
    return values.join('_');
}

function parseEmojiPair(input) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const emojis = Array.from(segmenter.segment(String(input)), ({ segment }) => segment)
        .filter((segment) => /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u20e3]/u.test(segment));
    if (emojis.length !== 2) return null;
    const codes = emojis.map(emojiCodepoints);
    if (codes.some((code) => !code)) return null;
    return { emojis, codes };
}

module.exports = { parseEmojiPair };

