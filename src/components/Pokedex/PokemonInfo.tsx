import { Star } from "@/components/Pokedex/Star"
import { Colors } from "@/constants/Colors"
import { PokemonTypeColors } from "@/constants/PokemonTypeColors"
import { Pokemon } from "@/model/pokemon.model"
import { Capitalize } from "@/utils/Capitalize"
import { UpperCase } from "@/utils/UpperCase"
import { ZeroPadding } from "@/utils/ZeroPadding"
import { Ruler, Weight } from "lucide-react-native"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { widthPercentageToDP as wp } from "react-native-responsive-screen"

export function PokemonInfo({
    pokemon,
    isFavorite,
    onFavorite,
}: {
    pokemon: Pokemon | null
    isFavorite: boolean
    onFavorite: (pokemonId: number | undefined) => void
}) {
    return (
        <View>
            <TouchableOpacity onPress={() => onFavorite(pokemon?.id)} style={styles.favButton}>
                <Star
                    fill={isFavorite ? "#ffc732" : "transparent"}
                    stroke={"#ffc732"}
                    width={wp("6%")}
                    height={wp("6%")}
                />
            </TouchableOpacity>

            <View style={styles.numberRow}>
                <Image
                    style={styles.smallBall}
                    source={require("../../assets/ball-icon.webp")}
                    resizeMode="contain"
                />
                <Text style={styles.numberText}>Nº {ZeroPadding(pokemon?.id)}</Text>
            </View>

            <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
                {Capitalize(pokemon?.name)}
            </Text>

            <View style={styles.typeContainer}>
                {pokemon?.types.map(item => (
                    <View
                        key={item.slot}
                        style={[
                            styles.typeBadge,
                            { backgroundColor: PokemonTypeColors[item.type.name as keyof typeof PokemonTypeColors] }
                        ]}
                    >
                        <Text style={styles.typeText}>{UpperCase(item.type.name)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.pokemonMetrics}>
                <View style={styles.metricItem}>
                    <Ruler size={wp("7%")} color={Colors.textSecondary} />
                    <Text style={styles.metricLabel}>ALTURA</Text>
                    <Text style={styles.metricValue}>{(pokemon?.height ?? 0) / 10 }m</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.metricItem}>
                    <Weight size={wp("7%")} color={Colors.textSecondary} />
                    <Text style={styles.metricLabel}>PESO</Text>
                    <Text style={styles.metricValue}>{(pokemon?.weight ?? 0) / 10} kg</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    favButton: {
        position: "absolute",
        right: wp("0%"),
        width: wp("12%"),
        height: wp("12%"),
        borderRadius: wp("6%"),
        borderWidth: 2,
        borderColor: "#ffc732",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },

    numberRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("2%"),
    },

    smallBall: {
        tintColor: Colors.textSecondary,
        width: wp("5.5%"),
        height: wp("5.5%"),
    },

    numberText: {
        color: Colors.textSecondary,
        fontSize: wp("3.8%"),
        fontWeight: "600",
    },

    name: {
        color: Colors.text,
        fontSize: wp("8%"),
        fontWeight: "700",
        marginRight: wp("14%"),
    },

    typeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: wp("3%"),
        marginTop: wp("2%"),
    },

    typeBadge: {
        alignItems: "center",
        justifyContent: "center",
        minWidth: wp("30%"),
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("3.5%"),
        borderRadius: wp("8%"),
    },

    typeText: {
        textAlign: "center",
        color: Colors.white,
        fontWeight: "700",
        fontSize: wp("4%"),
    },

    pokemonMetrics: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.surface,
        marginTop: wp("4%"),
        paddingVertical: wp("4%"),
        paddingHorizontal: wp("4%"),
        borderRadius: wp("3%"),
        borderWidth: 2,
        borderColor: Colors.border,
    },

    metricItem: {
        flex: 1,
        gap: wp("1%"),
        alignItems: "center",
        paddingHorizontal: wp("1%"),
    },

    metricLabel: {
        color: Colors.textSecondary,
        fontSize: wp("3%"),
        fontWeight: "600",
        letterSpacing: 1,
    },

    metricValue: {
        color: Colors.text,
        fontSize: wp("5%"),
        fontWeight: "700",
    },

    divider: {
        backgroundColor: Colors.textSecondary,
        width: 1.5,
        height: wp("16%"),
        marginHorizontal: wp("2%"),
    },
})