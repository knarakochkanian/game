export function formatNumber(str: string) {
    let reversed = str.split('').reverse().join('');
    let spaced = reversed.replace(/(\d{3})(?=\d)/g, '$1 ');
    
    return spaced.split('').reverse().join('');
}