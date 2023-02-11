import { FlatList, StyleSheet } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
	return (
		<FlatList
			data={places}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => <PlaceItem place={item}></PlaceItem>}
		></FlatList>
	);
}
export default PlacesList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
