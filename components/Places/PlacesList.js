import { FlatList, StyleSheet } from "react-native";

function PlacesList({ places }) {
	return <FlatList data={places} keyExtractor={(item) => item.id}></FlatList>;
}
export default PlacesList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
