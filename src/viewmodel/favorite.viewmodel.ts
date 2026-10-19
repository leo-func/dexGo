import { Pokemon } from "@/model/pokemon.model";
import { GetPokemon } from "@/services/pokeAPI.service";
import { getFavorites } from "@/services/storage.service";
import { useEffect, useState } from "react";

export function useFavoriteViewmodel(){
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        HandlePokemons()
    }, [])

    async function HandlePokemons() {
        try {
            setIsLoading(true)

            const data: number[] = JSON.parse(await getFavorites() || '[]')
            
            const pokemonPromises = data.map(async (id) => {
                const pokemon: Pokemon | null = await GetPokemon(id, null) ?? null
                return pokemon
            })

            const results = await Promise.all(pokemonPromises)

            const validPokemons = results.filter((p): p is Pokemon => p !== null)

            setPokemons(validPokemons)

        } catch (exception) {
            console.error("Failed to load favorite pokemons: ", exception)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        pokemons,
        isLoading,
    }
}