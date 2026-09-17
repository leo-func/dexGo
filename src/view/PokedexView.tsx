import { Colors } from "@/constants/Colors";
import { PokemonTypeColors } from "@/constants/PokemonTypeColors";
import { Capitalize } from "@/utils/Capitalize";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";
import { ChevronLeft, ChevronRight, Ruler, Weight } from "lucide-react-native";
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
                    <Text style={{color: Colors.textSecondary, fontSize: 12, fontWeight: 600}}>Nº {pokemon?.id}</Text>
                    <Text style={{color: Colors.text, fontSize: 20, fontWeight: 600}}>{Capitalize(pokemon?.name)} </Text>
                    <View style={styles.typeContainer}>
                        {pokemon?.types.map(item => (
                            <View key={item.slot} style={
                                    {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: PokemonTypeColors[item.type.name as keyof typeof PokemonTypeColors],
                                        padding: wp("0.5%"),
                                        borderRadius: hp("1%"),
                                        width: wp("30%"),
                                        gap: wp("2%"),
                                        marginTop: hp("1%")
                                    }
                                }>
                            

                                <Text style={{color: Colors.background, fontWeight: 600}} key={item.slot}>{Capitalize(item.type.name)}</Text>
                            </View>
                            
                        ))}
                    </View>

                    <View style={styles.pokemonMetrics}>
                        <View style={{width: wp("12%"), gap: hp("0.5%"), alignItems: "center"}}>
                            <Ruler size={28} color={Colors.textSecondary}></Ruler>
                            <Text style={{textAlign: "center", color: Colors.textSecondary, fontSize: 12, fontWeight: 600}}>Altura</Text>
                            <Text style={{textAlign: "center", color: Colors.text, fontWeight: 600}}>{(pokemon?.height ?? 0) / 10}m</Text> 
                        </View>
                    
                        
                        <View style={
                                {
                                    backgroundColor: Colors.textSecondary, width: wp("0.2%"), alignSelf: "center", height: hp("7%")
                                }
                            }
                        ></View>

                        <View style={{width: wp("12%"), gap: hp("0.5%"), alignItems: "center"}}>
                            <Weight size={28} color={Colors.textSecondary}></Weight>
                            <Text style={{textAlign: "center", color: Colors.textSecondary, fontSize: 12, fontWeight: 600}}>Peso</Text>
                            <Text style={{textAlign: "center", color: Colors.text, fontWeight: 600}}>{(pokemon?.weight ?? 0) / 10}kg</Text> 
                        </View>
                        
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
        justifyContent: "center",
        backgroundColor: Colors.container,
        padding: wp("5%"),
        borderRadius: hp("1%")
    },

    typeContainer: {
        alignItems: "center",
    },

    pokemonMetrics: {
        flexDirection: "row",
        backgroundColor: Colors.surface,
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("1.5%"),
        width: wp("80%"),
        padding: wp("5%"),        
        gap: wp("15%"),
        borderRadius: hp("1%")
    }


})
