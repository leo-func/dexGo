export interface Pokemon {
    id: number,
    name: string,
    height: number,
    weight: number,
    sprites: {
        other: {
            showdown: {
                front_default: string
            }
        }
        versions: {
                "generation-v": {
                    "black-white": {
                        "animated": {
                            front_default: string
                        }
                        front_default: string
                    } 
                }
            }

        },
    types: {
        slot: number,
        type: {
            name: string,
        }
    }[]
}