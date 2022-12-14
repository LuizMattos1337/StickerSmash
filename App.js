import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			// console.log(result);
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('You did not select any image');
		}
	};

	const onReset = () => {
		setShowAppOptions(false);
	};

	const onAddSticker = () => {
		// To be added
	};
	const onSaveImageAsync = async () => {
		// To be added
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<ImageViewer
					placeholderImageSource={PlaceholderImage}
					selectedImage={selectedImage}
				/>

				{showAppOptions ? (
					<View style={styles.optionsContainer}>
						<View style={styles.optionsRow}>
							<IconButton icon='refresh' label='Reset' onPress={onReset} />
							<CircleButton onpress={onAddSticker} />
							<IconButton
								icon='save-alt'
								label='Save'
								onPress={onSaveImageAsync}
							/>
						</View>
					</View>
				) : (
					<View style={styles.footerContainer}>
						<Button
							label={'Choose a photo'}
							theme={'primary'}
							onPress={pickImageAsync}
						/>
						<Button
							label={'Use this photo'}
							onPress={() => setShowAppOptions(true)}
						/>
					</View>
				)}
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
	optionsContainer: {
		position: 'absolute',
		bottom: 80,
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		color: '#fff',
	},
});
