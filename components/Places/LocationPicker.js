import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import * as Location from "expo-location";
import { useState } from "react";
import { getMapPreview } from "../../util/location";

function LocationPicker() {
	const [pickedLocation, setPickedLocation] = useState();
	const [locationPermissionInfo, requestPermission] =
		Location.useForegroundPermissions();

	async function verifyPermissions() {
		if (
			locationPermissionInfo.status === Location.PermissionStatus.UNDETERMINED
		) {
			const permissionResponse = await requestPermission();

			return permissionResponse.granted;
		}
		if (locationPermissionInfo.status === Location.PermissionStatus.DENIED) {
			Alert.alert(
				"Insufficient Permissions!",
				"You need to grant location permission to use this app."
			);
			return false;
		}
		return true;
	}
	async function getLocationHandler() {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const location = await Location.getCurrentPositionAsync();
		setPickedLocation({
			lat: location.coords.latitude,
			lon: location.coords.longitude,
		});
	}

	function pickOnMapHandler() {}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		console.log(pickedLocation.lat, pickedLocation.lon);

		locationPreview = (
			<Image
				style={styles.image}
				source={{
					uri: getMapPreview(pickedLocation.lon, pickedLocation.lat),
				}}
			></Image>
		);
	}
	return (
		<View>
			<View style={styles.mapPreview}>{locationPreview}</View>
			<View style={styles.actions}>
				<OutlinedButton icon="location" onPress={getLocationHandler}>
					Locate User
				</OutlinedButton>
				<OutlinedButton icon="map" onPress={pickOnMapHandler}>
					Pick on Map
				</OutlinedButton>
			</View>
		</View>
	);
}
export default LocationPicker;

const styles = StyleSheet.create({
	mapPreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 8,
		overflow: "hidden",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
