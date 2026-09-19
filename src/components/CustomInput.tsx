import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from "react-native";

interface CustomInputProps extends TextInputProps {
    icon?: React.ReactElement;
    containerStyle?: StyleProp<ViewStyle> 
}


export default function CustomInput({
    icon,
    containerStyle,
    style,
    ...props
} : CustomInputProps) {
    return(
        <View style={[styles.container, containerStyle]}> 
            {icon && 
              <View style={styles.iconContainer}>
                {icon}
              </View>
            }

            <TextInput 
            style={[styles.input, style]}
            {...props}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    paddingLeft: 15,
    color: "#fff"
  },
  iconContainer: {
    marginLeft: 5,
  },
});