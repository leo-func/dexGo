import CustomInput from "@/components/CustomInput";
import { EvolutionComp } from "@/components/Pokedex/EvolutionChain";
import { PokemonInfo } from "@/components/Pokedex/PokemonInfo";
import { Colors } from "@/constants/Colors";
import { usePokedexViewModel } from "@/viewmodel/pokedex.viewmodel";
import { ChevronLeft, ChevronRight, Search } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export function PokedexView({
    pokeNameOrId,
    HandleChange,
    pokemon,
    evols,
    isRandom,
    HandleIcrement,
    HandleDecrement,
    direction,
    HandleFavorite,
    isFavorite,
    onFavorites,
    HandlePokemon,
    setPage,
    page
}: ReturnType<typeof usePokedexViewModel> & {
    onFavorites: () => void
}) {
    const opacity = useRef(new Animated.Value(0)).current
    const transformX = useRef(new Animated.Value(100)).current
    const pageX = useRef(new Animated.Value(0)).current
    const hasEvolsRef = useRef(false)

    useEffect(() => {
        hasEvolsRef.current = !!evols
    }, [evols])

    useEffect(() => {
        if (!evols) setPage(0)
    }, [evols])

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, g) => hasEvolsRef.current && Math.abs(g.dx) > 10,
            
            onPanResponderMove: (_, g) => {
                pageX.setValue(g.dx)
                console.log(pageX)
            },
            
            onPanResponderRelease: (_, g) => {
                if (g.dx < -50) {
                    setPage(p => Math.min(p + 1, 1))
                    pageX.setValue(100)
                } else if (g.dx > 50) {
                    setPage(p => Math.max(p - 1, 0))
                    pageX.setValue(-100)
                }

                console.log(pageX)

                Animated.timing(pageX, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: false
                }).start()

            },
        })
    ).current

    useEffect(() => {
        opacity.setValue(0)
        transformX.setValue(direction === "left" ? -100 : 100)

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(transformX, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }),
        ]).start()
    }, [pokemon, direction])


    const sprite = pokemon?.sprites?.versions["generation-v"]["black-white"]
    const spriteUri = sprite?.animated?.front_default ?? sprite?.front_default

    return (
        <SafeAreaView edges={['left', 'right']} style={styles.container}>
            <View style={styles.content}>

                <CustomInput
                    containerStyle={{ borderRadius: wp("8%"), borderWidth: 2, borderColor: Colors.border, backgroundColor: Colors.surface }}
                    placeholder="Buscar por nome ou número..."
                    placeholderTextColor={Colors.textSecondary}
                    value={pokeNameOrId}
                    onChangeText={HandleChange}
                    icon={<Search color={Colors.textSecondary} />}
                />

                <View style={styles.pokemonHero}>
                    <View style={styles.ballWrapper}>
                        <Image
                            style={styles.ball}
                            source={require("../assets/ball-icon.webp")}
                            resizeMode="contain"
                        />
                    </View>

                    <TouchableOpacity onPress={HandleDecrement} style={styles.navButton}>
                        <ChevronLeft color={Colors.white} strokeWidth={3} size={wp("7%")} />
                    </TouchableOpacity>

                    {spriteUri ? (
                        <Animated.Image
                            style={[
                                styles.sprite,
                                isRandom && { tintColor: "#000" },
                                { opacity, transform: [{ translateX: transformX }] }
                            ]}
                            source={{ uri: spriteUri }}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.sprite} />
                    )}

                    <TouchableOpacity onPress={HandleIcrement} style={styles.navButton}>
                        <ChevronRight color={Colors.white} strokeWidth={3} size={wp("7%")} />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer} {...panResponder.panHandlers}>
                    <Animated.View style={{transform: [{ translateX: pageX }]}}>
                    {page === 0 && (
                        <PokemonInfo
                        pokemon={pokemon}
                        isFavorite={isFavorite}
                        onFavorite={HandleFavorite}
                        />
                    )}

                    {page === 1 && evols && (
                        <>
                        <Text style={{color: Colors.white, fontWeight: 600, fontSize: wp("5%")}}>EVOLUTIONS</Text>
                        
                        <EvolutionComp
                            evols={evols}
                            currentId={pokemon?.id}
                            onPokemon={HandlePokemon}
                        />
                        </>

                        
                    )}
                    </Animated.View>

                    <View style={styles.dots}>
                        <View style={[styles.dot, page === 0 && { backgroundColor: "#ffc732" }]} />
                        <View style={[evols && styles.dot, page === 1 && { backgroundColor: "#ffc732" }]} />
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
        paddingTop: wp("4%"),
        paddingBottom: wp("6%"),
    },

    content: {
        alignSelf: "center",
        gap: wp("8%"),
        width: wp("90%"),
    },

    pokemonHero: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: wp("58%"),
    },

    ballWrapper: {
        ...StyleSheet.absoluteFill,
        alignItems: "center",
        justifyContent: "center",
    },

    ball: {
        tintColor: Colors.surface,
        width: wp("55%"),
        height: wp("55%"),
    },

    navButton: {
        width: wp("14%"),
        height: wp("14%"),
        borderRadius: wp("7%"),
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.surface,
        borderWidth: 2,
        borderColor: Colors.border,
    },

    sprite: {
        width: wp("40%"),
        height: wp("40%"),
    },

    infoContainer: {
        backgroundColor: Colors.container,
        borderWidth: 2,
        borderColor: Colors.border,
        padding: wp("4.5%"),
        borderRadius: wp("4%"),
        overflow: 'hidden'
    },

    favButton: {
        position: "absolute",
        top: wp("4%"),
        right: wp("4%"),
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
        fontSize: wp("10%"),
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
        alignItems: "flex-start",
        paddingHorizontal: wp("1%"),
    },

    metricLabel: {
        color: Colors.textSecondary,
        fontSize: wp("3.6%"),
        fontWeight: "600",
        letterSpacing: 1,
    },

    metricValue: {
        color: Colors.text,
        fontSize: wp("7.5%"),
        fontWeight: "700",
    },

    divider: {
        backgroundColor: Colors.textSecondary,
        width: 1.5,
        height: wp("16%"),
        marginHorizontal: wp("2%"),
    },

    dots: {
        flexDirection: "row",
        alignSelf: "center",
        gap: wp("2.5%"),
        marginTop: wp("4%"),
    },

    dot: {
        width: wp("2.5%"),
        height: wp("2.5%"),
        borderRadius: wp("1.25%"),
        backgroundColor: Colors.border,
    },
})