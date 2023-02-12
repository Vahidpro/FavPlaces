import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { getMapPreview } from "../../util/location";
import {
	useIsFocused,
	useNavigation,
	useRoute,
} from "@react-navigation/native";

function LocationPicker() {
	const navigation = useNavigation();
	const route = useRoute();
	const isFocused = useIsFocused();
	const [pickedLocation, setPickedLocation] = useState();
	const [locationPermissionInfo, requestPermission] =
		Location.useForegroundPermissions();

	useEffect(() => {
		if (isFocused && route.params) {
			const mapPickedLocation = {
				lat: route.params.pickedLat,
				lon: route.params.pickedLon,
			};
			setPickedLocation(mapPickedLocation);
			console.log(
				pickedLocation.lat + "🔴 Pick " + route.params.pickedLat + " Params"
			);
		}
	}, [route, isFocused]);

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
		console.log(pickedLocation.lat + "🔴 Locate");
	}

	function pickOnMapHandler() {
		navigation.navigate("Map");
	}

	let locationPreview = <Text>No location picked yet.</Text>;

	if (pickedLocation) {
		locationPreview = (
			<Image
				style={styles.image}
				source={{
					uri: getMapPreview(pickedLocation.lat, pickedLocation.lon),
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
