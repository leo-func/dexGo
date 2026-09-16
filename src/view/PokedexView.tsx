import { Colors } from "@/constants/Colors";
import { Capitalize } from "@/utils/Capitalize";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export function PokedexView({
    pokeNameOrId,
    HandleChange,
    pokemon,
    HandleIcrement,
    HandleDecrement
}: ReturnType<typeof usePokedexViewModel>) {
    return (
        <SafeAreaView edges={['top']} style={styles.container}>
            <View style={styles.content}>

                <View style={styles.header}>
                    <Text>Pokedex</Text>

                    <TextInput 
                    value={pokeNameOrId}
                    onChangeText={HandleChange}
                    style={styles.searchInput} 
                    placeholder="Buscar por nome ou id">
                        
                    </TextInput>
                </View>

                <View style={styles.pokemonHero}>
                    <View style={styles.buttonLeft}>
                        <TouchableOpacity onPress={HandleDecrement}>
                            <ChevronLeft color={Colors.white}></ChevronLeft>
                        </TouchableOpacity>
                    </View>
                    {pokemon?.sprites?.other?.showdown?.front_default && (
                        <Image
                            style={{ width: wp("40%"), height: hp("40%") }}
                            source={{
                                uri: pokemon.sprites.other.showdown.front_default
                            }}
                            resizeMode="contain"
                        />
                    )}
                    
                    <View style={styles.buttonRight}>
                        <TouchableOpacity onPress={HandleIcrement}>
                            <ChevronRight color={Colors.white}></ChevronRight>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.infoContainer}>
                    <Text>Nº {pokemon?.id}</Text>
                    <Text>{Capitalize(pokemon?.name)} </Text>

                    <View style={styles.typeContainer}>
                        {pokemon?.types.map(item => (
                            <Text key={item.slot}>{Capitalize(item.type.name)}</Text>
                        ))}
                    </View>

                    <View style={styles.pokemonMetrics}>
                        <Text>Altura {(pokemon?.height ?? 0) / 10}m</Text>
                        
                        <View style={{backgroundColor: "purple", width: wp("0.5%"), alignSelf: "center", height: hp("4%")}}></View>
                        
                        <Text>Peso {(pokemon?.weight ?? 0) / 10}kg</Text>
                    </View>
                    
                </View>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    content: {
        alignSelf: "center",
        gap: hp("5%"),
        width: wp("90%"),
    },

    header: {
        marginTop: hp("5%"),
        gap: hp("1%"),
        backgroundColor: "purple"
    },

    pokemonHero: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        gap: wp("15%")
    },

    searchInput:  {
    },

    buttonRight: {
        backgroundColor: Colors.surface,
        borderRadius: hp("2%"),
        padding: wp("2%")
    },

    buttonLeft: {
        backgroundColor: Colors.surface,
        borderRadius: hp("2%"),
        padding: wp("2%")
    },

    infoContainer: {
        alignItems: "center",
        backgroundColor: Colors.surface,
        gap: hp("1%"),
    },

    typeContainer: {
        backgroundColor: "purple",
        alignItems: "center"
    },

    pokemonMetrics: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("5%")
    }


})
