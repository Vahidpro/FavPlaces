import { StyleSheet, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";

function AllPlaces() {
	return <PlacesList></PlacesList>;
}
export default AllPlaces;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
