// model/evolutionChain.model.ts
export interface ChainNode {
    species: {
        name: string
        url: string
    }
    evolves_to: ChainNode[]
}

export interface EvolutionChain {
    chain: ChainNode
}