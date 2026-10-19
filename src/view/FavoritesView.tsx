import CustomInput from "@/components/CustomInput";
import { Colors } from "@/constants/Colors";
import { PokemonTypeColors } from "@/constants/PokemonTypeColors";
import { UpperCase } from "@/utils/UpperCase";
import { useFavoriteViewmodel } from "@/viewmodel/favorite.viewmodel";
import { Search } from "lucide-react-native";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";


export function FavoriteView({
    pokemons,
    isLoading,
    onPokedex
}: ReturnType<typeof useFavoriteViewmodel> & {
    onPokedex: (pokemonId: number) => void
}) {
    return (
        <SafeAreaView edges={['left', 'right']} style={styles.container}>
            
            
            <View style={{flex: 1, gap: hp("3%"), width: wp("90%")}}>

                <View style={styles.header}>
                    <CustomInput 
                    containerStyle={{borderRadius: hp("5%"), borderWidth: 2, borderColor: Colors.border,backgroundColor: Colors.surface}} 
                    placeholder="Buscar por nome ou número..."
                    placeholderTextColor={Colors.textSecondary}
                    icon={<Search color={Colors.textSecondary}/>}
                    ></CustomInput>
                </View>

                {isLoading ? (
                    <View style={{flex: 0.8, alignItems: "center", justifyContent: "center"}}>
                        <Image style={{width: wp("50%"), height: hp("15%"), tintColor: "#000000"}} resizeMode="contain" source={require("../assets/pikachu-walking.gif")}></Image>
                        <Text style={{fontSize: 32, color: Colors.white, fontFamily: "Pix32"}}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        style={{maxHeight: hp("70%")}}
                        contentContainerStyle={styles.listContent}
                        numColumns={4}
                        data={pokemons}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => onPokedex(item.id)}
                                style={[styles.button, {backgroundColor: PokemonTypeColors[item.types.at(0)?.type.name as keyof typeof PokemonTypeColors]}]}
                            >
                                <View style={styles.pokemonContainer}>
                                    <Text style={styles.number}>
                                        Nº {item.id}
                                    </Text>

                                    {item.sprites.versions["generation-v"]["black-white"].animated.front_default ? (
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: item.sprites.versions["generation-v"]["black-white"].animated.front_default
                                            }}
                                            resizeMode="contain"
                                        />
                                    ) : (
                                        <Image
                                            style={styles.image}
                                            source={{
                                                uri: item.sprites.versions["generation-v"]["black-white"].front_default
                                            }}
                                            resizeMode="contain"
                                        />
                                    )}
                                
                                    <Text numberOfLines={1} style={styles.name}>
                                        {UpperCase(item.name)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                    
                        )}
                    />
                )}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Colors.background,
        paddingTop: wp("4%"),
    },

    listContent: {
        gap: hp("1%"),

    },

    header: {
    },

    button: {
        height: "97%",
        borderRadius: wp("2%"),
        alignItems: "center",
        margin: wp("1%"),
        borderColor: Colors.border,
    },

    pokemonContainer: {
        alignItems: "center",
        width: wp("20.6%"),
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: wp("2%"),
        padding: wp("2%"),
        backgroundColor: "#091424",
    },

    number: {
        textAlign: "center",
        fontFamily: "Pix32",
        color: Colors.white
    },

    image: {
        width: 52,
        height: 52,
    },

    name: {
        textAlign: "center",
        fontFamily: "Pix32",
        color: Colors.white
    },

    favRouterContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});