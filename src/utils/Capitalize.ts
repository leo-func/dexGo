export function Capitalize(word: string | undefined) {
    if (!word) return ""
    
    return word.trim().charAt(0).toUpperCase() + word.trim().slice(1).toLowerCase()
}