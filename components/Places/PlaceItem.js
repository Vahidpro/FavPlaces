import { Pressable, Image, StyleSheet, View, Text } from "react-native";

function PlaceItem({ place, onSelect }) {
	return (
		<Pressable onPress={onselect}>
			<Image source={{ uri: place.imageUri }}></Image>
			<View>
				<Text>{place.title}</Text>
				<Text>{place.address}</Text>
			</View>
		</Pressable>
	);
}
export default PlaceItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
