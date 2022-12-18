import { StatusBar as StatusBarExpo } from 'expo-status-bar';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';

import Button from './components/Button';
import ImageViewer from './components/ImageViewer';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
	const [selectedImage, setSelectedImage] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [pickedEmoji, setPickedEmoji] = useState(null);
	const [mediaPermissionStatus, requestMediaPermission] =
		MediaLibrary.usePermissions();

	const imageRef = useRef();

	if (mediaPermissionStatus === null) {
		requestMediaPermission();
	}

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
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	};

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});

				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert('Image saved!');
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			domtoimage
				.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				})
				.then((dataUrl) => {
					let link = document.createElement('a');
					link.download = 'sticker-smash.jpeg';
					link.href = dataUrl;
					link.click();
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<View style={styles.imageContainer}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						placeholderImageSource={PlaceholderImage}
						selectedImage={selectedImage}
					/>
					{pickedEmoji !== null ? (
						<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
					) : null}
				</View>
				{showAppOptions ? (
					<View style={styles.optionsContainer}>
						<View style={styles.optionsRow}>
							<IconButton icon='refresh' label='Reset' onPress={onReset} />
							<CircleButton onPress={onAddSticker} />
							<IconButton
								icon='save-alt'
								label='Save'
								onPress={onSaveImageAsync}
							/>
						</View>
					</View>
				) : (
					<View style={styles.optionsContainer}>
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
				<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
					<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
				</EmojiPicker>
				<StatusBarExpo style={'light'} />
			</View>
		</GestureHandlerRootView>
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
