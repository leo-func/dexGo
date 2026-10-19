import { EvolutionChain } from "@/model/evolutionChain.model"

const SPRITE_URL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white"

export type Evolution = {
    id: number
    name: string
    sprite: string
}

type ChainNode = EvolutionChain["chain"]

export function FlattenChain(node: ChainNode): Evolution[] {
    const id = Number(node.species.url.split("/").at(-2))

    return [
        { id, name: node.species.name, sprite: `${SPRITE_URL}/${id}.png` },
        ...node.evolves_to.flatMap(FlattenChain),
    ]
}

export function GroupByStage(node: ChainNode, stage: number = 0, stages: Evolution[][] = []) : Evolution[][] {
    const id = Number(node.species.url.split("/").at(-2))

    if (!stages[stage]) stages[stage] = []

    stages[stage].push({
        id,
        name: node.species.name,
        sprite: `${SPRITE_URL}/${id}.png`
    })

    node.evolves_to.forEach(next => GroupByStage(next, stage + 1, stages))

    return stages
}