import { EvolutionChain } from "@/model/evolutionChain.model";
import { Pokemon } from "@/model/pokemon.model";
import { GetEvolutionChain, GetPokemon } from "@/services/pokeAPI.service";
import { getFavorites, saveFavorites } from "@/services/storage.service";
import { isNumber } from "@/utils/IsNumber";
import { useEffect, useRef, useState } from "react";

export function usePokedexViewModel(favoritePokemonId: number = 0) {
    const [pokemon, setPokemon] = useState<Pokemon | null> (null)
    const [pokeNameOrId, setPokeNameOrId] = useState<string | "">("")
    const [pokeId, setPokeId] = useState(favoritePokemonId > 0 ? favoritePokemonId : 1)
    const [isRandom, setIsRandom] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>()
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [evols, setEvols] = useState<EvolutionChain | null>(null) 
    const [page, setPage] = useState(0)

    const pokeIdRef = useRef(1)

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRandom) {
                const randNumber = Math.floor(Math.random() * 1026)
                HandlePokemon(randNumber, null, isRandom)
            }
        }, 2000);

        return () => clearInterval(interval)
    }, [isRandom])

    useEffect(() => {
        HandlePokemon(pokeId, null, isRandom)
        loadEvolChain(pokeId)
    }, [pokeId])


    async function HandlePokemon(id: number | null = null, name: string | null = null, random = false) {
        try {
            setLoading(true)
            setError(null)

            const data = await GetPokemon(id, name)
            
            if (!data) return

            if (!random) {
                setIsRandom(false)
            }

            pokeIdRef.current = data?.id

            setPokeId(pokeIdRef.current)
            setPokemon(data)

            await checkFavorite(data.id)
            
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    async function loadEvolChain(pokemonId: number) {
        try {
            setEvols(null)
            const evols = await GetEvolutionChain(pokemonId)

            setEvols(evols)
        } catch (exception) {
            console.log("Erro ao buscar: ", exception)
        } finally {

        }
    }

    async function checkFavorite(pokemonId: number) {
        const favorites = await getFavorites()
        const ids: number[] = favorites ? JSON.parse(favorites) : []

        setIsFavorite(ids.includes(pokemonId))
    }

    async function HandleFavorite(pokemonId: number | undefined) {
        if(!pokemonId) return
        
        await saveFavorites(pokemonId)
        checkFavorite(pokemonId)
    }

    function HandleIcrement() {
        setDirection("right") 
        setIsRandom(false)
        setPokeId(prev => prev + 1)
    }

    function HandleDecrement() {
        if (pokeId <= 1) return

        setDirection("left")
        setIsRandom(false)
        setPokeId(prev => prev - 1)
    }

    function HandleChange(query: string) {
        setPokeNameOrId(query)

        if (query.trim() === "") {
            setIsRandom(true)
            setPokemon(null);
            return;
        }

        if (isNumber(query)) {
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
        HandleFavorite,
        HandlePokemon,
        pokemon,
        evols,
        isRandom,
        loading,
        pokeNameOrId,
        error,
        direction,
        isFavorite,
        page,
        setPage
    }
}