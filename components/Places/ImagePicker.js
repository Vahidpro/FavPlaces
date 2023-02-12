import { Button, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";

function ImagePicker() {
	const [pickedImageUri, setPickedImageUri] = useState();
	// iOS permission
	// function ImagePicker() {
	// 	const [camPermissionInfo, requestPermission] = useCameraPermission();

	// 	async function verifyPermissions() {
	// 		if (camPermissionInfo.status === PermissionStatus.UNDETERMINED) {
	// 			const permissionResponse = await requestPermission();

	// 			return permissionResponse.granted;
	// 		}
	// 		if (camPermissionInfo.status === PermissionStatus.DENIED) {
	// 			Alert.alert(
	// 				"Insufficient Permissions!",
	// 				"You need to grant camera permission to use this app."
	// 			);

	// 			return false;
	// 		}
	// 		return true;
	// 	}

	async function takeImageHandler() {
		// iOS
		// const hasPermission = await verifyPermissions();

		// if (!hasPermission) return;
		const image = await launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		setPickedImageUri(image.uri);
	}

	let imagePreview = <Text>No image taken yet.</Text>;

	if (pickedImageUri) {
		imagePreview = (
			<Image style={styles.image} source={{ uri: pickedImageUri }}></Image>
		);
	}
	return (
		<View style={styles.container}>
			<View style={styles.imagePreview}>{imagePreview}</View>
			<Button title="Take Image" onPress={takeImageHandler}></Button>
		</View>
	);
}
export default ImagePicker;

const styles = StyleSheet.create({
	imagePreview: {
		width: "100%",
		height: 200,
		marginVertical: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primary100,
		borderRadius: 8,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
});
