import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";

export default function App() {
	const Stack = createStackNavigator();
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="AllPlaces" component={AllPlaces}></Stack.Screen>
					<Stack.Screen name="AddPlace" component={AddPlace}></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
