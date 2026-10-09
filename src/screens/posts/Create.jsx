// import component React Native
import {
  View,
  Text,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Image,
} from 'react-native';

// import React
import React, {useState} from 'react';

// import React Native Image Picker
import {launchImageLibrary} from 'react-native-image-picker';

// import style
import styles from '../../styles';

export default function PostCreate({navigation}) {
  // state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  // pilih gambar
  const handleChoosePhoto = async () => {
    ToastAndroid.show(
      'Tombol Choose Image ditekan',
      ToastAndroid.SHORT,
    );

    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      console.log('IMAGE PICKER:', response);

      // user membatalkan
      if (response.didCancel) {
        ToastAndroid.show(
          'Pemilihan gambar dibatalkan',
          ToastAndroid.SHORT,
        );
        return;
      }

      // image picker error
      if (response.errorCode) {
        ToastAndroid.show(
          response.errorMessage || response.errorCode,
          ToastAndroid.LONG,
        );
        return;
      }

      // gambar berhasil dipilih
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        setImage(selectedImage);

        ToastAndroid.show(
          'Gambar berhasil dipilih',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Gagal membuka image picker',
        ToastAndroid.LONG,
      );
    }
  };

  // simpan post secara lokal
  const storePost = () => {
    if (!title.trim()) {
      ToastAndroid.show(
        'Title wajib diisi',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!content.trim()) {
      ToastAndroid.show(
        'Content wajib diisi',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!image) {
      ToastAndroid.show(
        'Silakan pilih gambar terlebih dahulu',
        ToastAndroid.SHORT,
      );
      return;
    }

    // data post baru
    const newPost = {
      id: Date.now(),
      title: title,
      content: content,
      image: image.uri,
    };

    ToastAndroid.show(
      'Post berhasil dibuat!',
      ToastAndroid.SHORT,
    );

    // kembali ke PostIndex
    navigation.navigate('PostIndex', {
      newPost: newPost,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        {/* Choose Image */}
        <View style={styles.upload}>
          <Button
            title="Choose Image"
            color="gray"
            onPress={handleChoosePhoto}
          />
        </View>

        {/* Preview gambar */}
        {image && (
          <Image
            source={{uri: image.uri}}
            style={{
              width: 120,
              height: 120,
              alignSelf: 'center',
              borderRadius: 10,
              marginBottom: 20,
            }}
          />
        )}

        {/* Title */}
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={value => setTitle(value)}
        />

        {/* Content */}
        <TextInput
          style={styles.textarea}
          placeholder="Content"
          value={content}
          onChangeText={value => setContent(value)}
          multiline
          textAlignVertical="top"
        />

        {/* Save */}
        <View style={{padding: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={storePost}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}