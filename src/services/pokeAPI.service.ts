import { Pokemon } from "@/model/pokemon.model";

export async function GetPokemon(id: number | null, name: string | null) : Promise<Pokemon | null> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id ?? name}/`)

    if (!response.ok) {
        return null
    }

    const data = await response.json()

    return {
        id: data.id,
        name: data.name,
        height: data.height
    }
}