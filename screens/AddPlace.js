import { StyleSheet, View } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";

function AddPlace() {
	return <PlaceForm></PlaceForm>;
}
export default AddPlace;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
