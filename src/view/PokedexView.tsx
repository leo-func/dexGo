import { Capitalize } from "@/utils/Capitalize";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export function PokedexView({
    HandlePokemon,
    pokeNameOrId,
    HandleChange,
    pokemon
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
                        <TouchableOpacity>
                            <ChevronLeft></ChevronLeft>
                        </TouchableOpacity>
                    </View>

                    <Text> imagem </Text>
                    
                    <View style={styles.buttonRight}>
                        <TouchableOpacity>
                            <ChevronRight></ChevronRight>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.infoContainer}>
                    <Text>Nº {pokemon?.id}</Text>
                    <Text>{Capitalize(pokemon?.name)} </Text>

                    <View style={styles.typeContainer}>
                        <Text>Tipo</Text>
                    </View>

                    <View style={styles.pokemonMetrics}>
                        <Text>Altura {pokemon?.height}</Text>
                        
                        <View style={{backgroundColor: "purple", width: wp("0.5%"), alignSelf: "center", height: hp("4%")}}></View>
                        
                        <Text>Peso</Text>
                    </View>
                    
                </View>

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001eff",
    },

    content: {
        alignSelf: "center",
        gap: hp("20%"),
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
        gap: wp("30%")
    },

    searchInput:  {
    },

    buttonRight: {
        backgroundColor: "red"
    },

    buttonLeft: {
        backgroundColor: "red"
    },

    infoContainer: {
        alignItems: "center",
        gap: hp("1%"),
    },

    typeContainer: {
        backgroundColor: "purple"
    },

    pokemonMetrics: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("5%")
    }


})
