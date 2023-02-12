import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
	const [selectedLocation, setSelectedLocation] = useState();
	const region = {
		latitude: 37.25,
		longitude: -122.42,
		latitudeDelta: 0.0923,
		longitudeDelta: 0.0435,
	};
	function selectedLocationHandler(event) {
		const lat = event.nativeEvent.coordinate.latitude;
		const lon = event.nativeEvent.coordinate.longitude;

		setSelectedLocation({ lat: lat, lon: lon });
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			Alert.alert("No location picked!", "You have to pick a location first!");
			return;
		}
		navigation.navigate("AddPlace", {
			pickedLat: selectedLocation.lat,
			pickedLon: selectedLocation.lon,
		});
	}, [navigation, selectedLocation]);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: ({ tintColor }) => (
				<IconButton
					icon="save"
					size={24}
					color={tintColor}
					onPress={savePickedLocationHandler}
				></IconButton>
			),
		});
	}, [navigation, savePickedLocationHandler]);
	return (
		<MapView
			style={styles.map}
			initialRegion={region}
			onPress={selectedLocationHandler}
		>
			{selectedLocation && (
				<Marker
					title="Picked Location"
					coordinate={{
						latitude: selectedLocation.lat,
						longitude: selectedLocation.lon,
					}}
				></Marker>
			)}
		</MapView>
	);
}
export default Map;

const styles = StyleSheet.create({ map: { flex: 1 } });
