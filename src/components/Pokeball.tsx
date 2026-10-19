import Svg, { Path, SvgProps } from "react-native-svg";

function Pokeball(props: SvgProps) {
    return (
        <Svg
            width={64}
            height={64}
            viewBox="23 23 18 18"
            preserveAspectRatio="none"
            {...props}
        >
            <Path
                d="M28 23h8v1h2v1h1v1h1v1h1v10h-1v1h-1v1h-1v1h-2v1h-8v-1h-2v-1h-1v-1h-1v-1h-1V27h1v-1h1v-1h1v-1h2z"
                fill="#0B0B31"
            />

            <Path
                d="M30 30h4v4h-4zm-5 3h4v1h1v1h4v-1h1v-1h4v4h-1v1h-2v1h-8v-1h-2v-1h-1z"
                fill="#FFF"
            />

            <Path
                d="M28 25h8v1h2v1h1v4h-4v-1h-1v-1h-4v1h-1v1h-4v-4h1v-1h2z"
                fill="#EF0000"
            />
        </Svg>
    );
}

export default Pokeball;

