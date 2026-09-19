import { Pokemon } from "@/model/pokemon.model";
import { GetPokemon } from "@/services/pokeAPI.service";
import { useEffect, useRef, useState } from "react";

export function usePokedexViewModel() {
    const [pokemon, setPokemon] = useState<Pokemon | null> (null)
    const [pokeNameOrId, setPokeNameOrId] = useState<string | "">("")
    const [pokeId, setPokeId] = useState(1)
    const [isRandomize, setIsRandomize] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>()
    const [direction, setDirection] = useState<"left" | "right">("right");

    const pokeIdRef = useRef(1)

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRandomize) {
                const randNumber = Math.floor(Math.random() * 1026)
                HandlePokemon(randNumber, null, isRandomize)
            }
        }, 1000);

        return () => clearInterval(interval)
    }, [isRandomize])

    useEffect(() => {
        HandlePokemon(pokeId, null, isRandomize)
    }, [pokeId])


    async function HandlePokemon(id: number | null = null, name: string | null = null, random = false) {
        try {
            setLoading(true)
            setError(null)

            const data = await GetPokemon(id, name)
            
            if (!data) return

            if (!random) {
                setIsRandomize(false)
            }

            pokeIdRef.current = data?.id

            setPokeId(pokeIdRef.current)
            setPokemon(data)
            
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    function HandleIcrement() {
        setDirection("right") 
        setIsRandomize(false)
        setPokeId(prev => prev + 1)
    }

    function HandleDecrement() {
        if (pokeId <= 1) return

        setDirection("left")
        setIsRandomize(false)
        setPokeId(prev => prev - 1)
    }

    function HandleChange(query: string) {
        setPokeNameOrId(query)

        if (query.trim() === "") {
            setIsRandomize(true)
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
        isRandomize,
        loading,
        pokeNameOrId,
        error,
        direction,
    }
}