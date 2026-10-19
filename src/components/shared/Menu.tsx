import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import Pokeball from "../Pokeball";
import { Star } from "../Pokedex/Star";

export function Menu({ pathname }: { pathname: string }) {
    const ballPosition = useRef(new Animated.Value(0)).current
    const starPosition = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(ballPosition, {
                toValue: pathname === "/" ? 0 : -100,
                duration: 300,
                useNativeDriver: false
            }),
            Animated.timing(starPosition, {
                toValue: pathname === "/" ? 100 : 0,
                duration: 300,
                useNativeDriver: false
            })
        ]).start()
    }, [pathname])

    return (
        <SafeAreaView edges={["bottom"]} style={styles.container} pointerEvents="box-none">
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(pathname === "/" ? "/favorites" : "/")}
            >
                <Animated.View style={[styles.icon, { transform: [{ translateX: ballPosition }] }]}>
                    <Pokeball width="70%" height="70%" />
                </Animated.View>

                <Animated.View style={[styles.icon, { transform: [{ translateX: starPosition }] }]}>
                    <Star
                        fill="#ffc732"
                        width="70%"
                        height="70%"
                        preserveAspectRatio="xMidYMid meet"
                    />
                </Animated.View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
        paddingBottom: wp("3%"),
    },
    button: {
        width: wp("15%"),
        height: hp("7%"),
        borderRadius: wp("10%"),
        backgroundColor: Colors.background,
        borderWidth: 2,
        borderColor: Colors.border,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },
    icon: {
        position: "absolute",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
})