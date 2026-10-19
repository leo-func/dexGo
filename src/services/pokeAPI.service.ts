import { EvolutionChain } from "@/model/evolutionChain.model";
import { Pokemon } from "@/model/pokemon.model";

export async function GetPokemon(id: number | null, name: string | null) : Promise<Pokemon | null> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id ?? name}/`)

    if (!response.ok) {
        throw new Error("Erro ao buscar")
    }

    const data = await response.json()


    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        sprites: data.sprites,
        types: data.types
    }
}

export async function GetEvolutionChain(id: number) : Promise<EvolutionChain | null> {
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    
    if (!speciesRes.ok) {
        throw new Error("Erro ao buscar")
    }

    const species = await speciesRes.json()

    const evolResponse = await fetch(species.evolution_chain.url)

    const data = await evolResponse.json()
    
    return {
        chain: data.chain
    }
}