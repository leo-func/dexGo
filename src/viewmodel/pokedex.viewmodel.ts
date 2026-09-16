import { Pokemon } from "@/model/pokemon.model";
import { GetPokemon } from "@/services/pokeAPI.service";
import { useEffect, useRef, useState } from "react";

export function usePokedexViewModel() {
    const [pokemon, setPokemon] = useState<Pokemon | null> (null)
    const [pokeNameOrId, setPokeNameOrId] = useState<string | "">("")
    const [pokeId, setPokeId] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const pokeIdRef = useRef(1)

    useEffect(() => {
        HandlePokemon(pokeId, null)
    }, [pokeId])


    async function HandlePokemon(id: number | null = null, name: string | null = null) {
        try {
            setLoading(true)
            setError(null)

            const data = await GetPokemon(id, name)
            
            if (!data) return

            pokeIdRef.current = data?.id

            setPokeId(pokeIdRef.current)
            setPokemon(data)
            
        } catch (exception) {
            if (exception instanceof Error){
                setError(exception.message)
            }
        } finally {
            setLoading(false)
        }
    }

    function HandleIcrement() { 
        setPokeId(prev => prev + 1)
    }

    function HandleDecrement() {
        if (pokeId <= 1) return

        setPokeId(prev => prev - 1)
    }

    function HandleChange(query: string) {
        setPokeNameOrId(query);

        if (query.trim() === "") {
            setPokemon(null);
            return;
        }

        const isNumber = /^\d+$/.test(query);

        if (isNumber) {
            HandlePokemon(Number(query), null); 
            setPokeId(Number(query))
        } else {
            HandlePokemon(null, query); 
        }
    }
    

    return {
        HandleIcrement,
        HandleDecrement,
        HandleChange,
        pokemon,
        loading,
        pokeNameOrId,
        error,
    }
}