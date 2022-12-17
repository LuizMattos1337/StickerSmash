import { Image, View } from 'react-native';
import React from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
} from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

const AnimatedImage = Animated.createAnimatedComponent(Image);

function EmojiSticker({ imageSize, stickerSource }) {
	const scaleImage = useSharedValue(imageSize);

	const onDoubleTap = useAnimatedGestureHandler({
		onActive: () => {
			if (scaleImage.value) {
				scaleImage.value = scaleImage.value * 2;
			}
		},
	});

	const imageStyle = useAnimatedStyle(() => {
		return {
			width: withSpring(scaleImage.value),
			height: withSpring(scaleImage.value),
		};
	});

	return (
		<View style={{ top: -350 }}>
			<TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
				<AnimatedImage
					source={stickerSource}
					resizeMode='contain'
					style={[
						imageStyle,
						{
							width: imageSize,
							height: imageSize,
						},
					]}
				/>
			</TapGestureHandler>
		</View>
	);
}

export default EmojiSticker;
