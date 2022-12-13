import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			// console.log(result);
			setSelectedImage(result.assets[0].uri);
		} else {
			alert('You did not select any image');
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					placeholderImageSource={PlaceholderImage}
					selectedImage={selectedImage}
				/>
				<View style={styles.footerContainer}>
					<Button
						label={'Choose a photo'}
						theme={'primary'}
						onPress={pickImageAsync}
					/>
					<Button label={'Use this photo'} />
				</View>
				<StatusBarExpo translucent={true} style='inverted' />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 58 : 58,
	},
	text: {
		color: '#fff',
	},
});
