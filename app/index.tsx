import { PokedexView } from "@/view/PokedexView";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";

export default function Index() {
  const viewmodel = usePokedexViewModel()

  return (
    <PokedexView {...viewmodel}/>
  );
}