import { Colors } from "@/constants/Colors";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export function Top({pathname} : {pathname: string}) {
    return(
        <SafeAreaView edges={["top"]} style={{alignItems: "center", backgroundColor: Colors.surface, width: "100%", padding: wp("5%")}}>
            <View style={{flexDirection: "row", alignItems: "center", width: wp("90%"), gap: wp("5%")}}>
                <Image 
                    style={{tintColor: Colors.white, width: wp("8%"), height: hp("4.5%")}}
                    source={require("../../assets/ball-icon.webp")}
                    resizeMode="contain"
                ></Image>

                <View style={{backgroundColor: "#7589b5", width: wp("0.5%"), height: hp("3.5%")}}></View>

                <Text style={{color: Colors.text, fontSize: 24, fontWeight: 600}}>{pathname == '/' ? "DEXGO" : "FAVORITES"}</Text>
            </View>
        </SafeAreaView>
    )
}