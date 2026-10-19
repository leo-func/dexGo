import { PokedexView } from "@/view/PokedexView";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";
import { router, useLocalSearchParams } from "expo-router";

export default function Index() {
  const { pokemonId } = useLocalSearchParams<{ pokemonId: string }>();
  
  const toNumber = pokemonId ? Number(pokemonId) : undefined

  const viewmodel = usePokedexViewModel(toNumber)


  return <PokedexView 
  {...viewmodel}
  onFavorites={() => router.push("/favorites")}
  />
}