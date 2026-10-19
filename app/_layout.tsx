import { Menu } from "@/components/shared/Menu";
import { Top } from "@/components/shared/Top";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    Pix32: require("@/assets/fonts/Pix32.ttf")
  })

  const pathname = usePathname()

  return (
    <>
      <Top pathname={pathname}></Top>
      <Stack screenOptions={{
        headerShown: false
      }}/>


      <Menu pathname={pathname}/>
    </>
);
}
