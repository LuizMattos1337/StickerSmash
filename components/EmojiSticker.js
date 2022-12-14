import { Image, View } from 'react-native';
import React from 'react';

const EmojiSticker = ({ imageSize, stickerSource }) => (
	<View style={{ top: -350 }}>
		<Image
			source={stickerSource}
			resizeMode='contain'
			style={{
				width: imageSize,
				height: imageSize,
			}}
		/>
	</View>
);

export default EmojiSticker;
