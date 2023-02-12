import { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function Map() {
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
		console.log(selectedLocation);
	}
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
