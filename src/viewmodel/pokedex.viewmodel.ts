import { Pokemon } from "@/model/pokemon.model";
import { GetPokemon } from "@/services/pokeAPI.service";
import { useState } from "react";

export function usePokedexViewModel() {
    const [pokemon, setPokemon] = useState<Pokemon | null> (null)
    const [pokeNameOrId, setPokeNameOrId] = useState<string | number>("")
    const [pokeId, setPokeId] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function HandlePokemon(id: number | null = null, name: string | null = null) {
        try {
            setLoading(true)
            setError(null)

            const data = await GetPokemon(id, name)

            setPokemon(data)
        } catch (exception) {
            if (exception instanceof Error){
                setError(exception.message)
            }
        } finally {
            setLoading(false)
        }
    }
    

    return {
        HandlePokemon,
        pokemon,
        loading,
        pokeId,
        pokeNameOrId,
        error,
    }
}