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

export default function PostEdit({navigation, route}) {
  // ambil data post dari halaman Index
  const post = route?.params?.post;

  // state
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [image, setImage] = useState(
    post?.image ? {uri: post.image} : null,
  );

  // pilih gambar baru
  const handleChoosePhoto = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        ToastAndroid.show(
          response.errorMessage || 'Gagal memilih gambar',
          ToastAndroid.LONG,
        );
        return;
      }

      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Gagal membuka image picker',
        ToastAndroid.LONG,
      );
    }
  };

  // update post
  const updatePost = () => {
    // cek data post
    if (!post) {
      ToastAndroid.show(
        'Data post tidak ditemukan',
        ToastAndroid.SHORT,
      );
      return;
    }

    // validasi title
    if (!title.trim()) {
      ToastAndroid.show(
        'Title wajib diisi',
        ToastAndroid.SHORT,
      );
      return;
    }

    // validasi content
    if (!content.trim()) {
      ToastAndroid.show(
        'Content wajib diisi',
        ToastAndroid.SHORT,
      );
      return;
    }

    // buat data baru
    const updatedPost = {
      id: post.id,
      title: title.trim(),
      content: content.trim(),
      image: image?.uri || post.image,
    };

    // notifikasi
    ToastAndroid.show(
      'Post berhasil diperbarui!',
      ToastAndroid.SHORT,
    );

    // kembali ke PostIndex sambil membawa data terbaru
    navigation.navigate('PostIndex', {
      updatedPost: updatedPost,
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
          onChangeText={setTitle}
        />

        {/* Content */}
        <TextInput
          style={styles.textarea}
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {/* Update */}
        <View style={{padding: 10}}>
          <TouchableOpacity
            style={styles.button}
            onPress={updatePost}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}