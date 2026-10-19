import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveFavorites(pokemonId: number | undefined) {

    if (pokemonId === undefined) return

    const response = await AsyncStorage.getItem('favorites') 
    const currentFavorites: number[] = response ? JSON.parse(response) : []

    if (currentFavorites.includes(pokemonId)) {
        const newList = currentFavorites.filter(id => id !== pokemonId)
        await AsyncStorage.setItem('favorites', JSON.stringify(newList))
        
        return
    }

    currentFavorites.unshift(pokemonId)
    await AsyncStorage.setItem('favorites', JSON.stringify(currentFavorites))
}

export async function getFavorites() {
    return AsyncStorage.getItem('favorites')
}
