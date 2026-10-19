import { Colors } from "@/constants/Colors"
import { EvolutionChain } from "@/model/evolutionChain.model"
import { GroupByStage } from "@/utils/FlattenChain"
import { ChevronRight } from "lucide-react-native"
import { Fragment, useMemo } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

export function EvolutionComp({
    evols,
    currentId,
    onPokemon
}: {
    evols: EvolutionChain | null
    currentId: number | undefined,
    onPokemon: (pokeId: number) => void
}) {
    const stages = useMemo(() => (
        evols ? GroupByStage(evols.chain) : []
    ), [evols])

    return (
        <View style={styles.container}>
            {stages.map((stage, index) => (
                <Fragment key={index}>
                    {index > 0 && <ChevronRight color={Colors.white} />}

                    <View style={[styles.column, stage.length > 2 && {width: wp("50%"),flexDirection: "row", flexWrap: "wrap", }]}>
                        {stage.map(evol => (
                            <TouchableOpacity
                                onPress={() => onPokemon(evol.id)}
                                key={evol.id}
                                style={[styles.slot, evol.id === currentId && styles.active, stage.length > 2 && {width: wp("10%"), height: wp("10%")} ]}
                            >
                                <Image resizeMode="contain" style={styles.image} source={{ uri: evol.sprite }} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </Fragment>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: wp("2%"),
        height: hp("26.5%")
    },
    column: {
        gap: wp("1.5%"),
    },
    slot: {
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderWidth: 2,
        borderColor: Colors.border,
        width: wp("20%"),
        height: wp("20%"),
        borderRadius: wp("15%"),
    },
    active: {
        borderColor: Colors.white,
    },
    image: {
        width: 84,
        height: 84,
    },
})