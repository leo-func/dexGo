import { FavoriteView } from "@/view/FavoritesView";
import { useFavoriteViewmodel } from "@/viewmodel/favorite.viewmodel";
import { router } from "expo-router";

export default function Index() {
  const viewmodel = useFavoriteViewmodel()

  const onPokedex = (id: number) => router.push({
    pathname: '/',
    params: {pokemonId : id}
  })

  return (
    <FavoriteView
    {...viewmodel}
    onPokedex={onPokedex}
    />
  );
}