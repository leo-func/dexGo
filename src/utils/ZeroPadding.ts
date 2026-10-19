export function ZeroPadding(number: number | undefined) {
    if (!number) {
        return 0
    }
    return number.toString().padStart(3, '0')
}