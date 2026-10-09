// import component React Native
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

// import React
import React, {useState, useEffect} from 'react';

export default function PostIndex({navigation, route}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // data sementara
  const fetchDataPosts = async () => {
    setLoading(true);

    const dummyPosts = [
      {
        id: 1,
        title: 'Tutorial Express + React Native',
        image: 'https://picsum.photos/100/100?random=1',
        content: 'Belajar Express dan React Native',
      },
      {
        id: 2,
        title: 'Belajar React Native',
        image: 'https://picsum.photos/100/100?random=2',
        content: 'Membuat aplikasi mobile dengan React Native',
      },
    ];

    setPosts(dummyPosts);
    setLoading(false);
  };

  // ambil data awal
  useEffect(() => {
    fetchDataPosts();
  }, []);

  // menerima post baru dari Create
  useEffect(() => {
    if (route?.params?.newPost) {
      setPosts(currentPosts => [
        ...currentPosts,
        route.params.newPost,
      ]);

      navigation.setParams({
        newPost: undefined,
      });
    }
  }, [route?.params?.newPost, navigation]);

  // menerima post yang sudah di-update dari Edit
  useEffect(() => {
    if (route?.params?.updatedPost) {
      setPosts(currentPosts =>
        currentPosts.map(post =>
          post.id === route.params.updatedPost.id
            ? route.params.updatedPost
            : post,
        ),
      );

      navigation.setParams({
        updatedPost: undefined,
      });
    }
  }, [route?.params?.updatedPost, navigation]);

  // fungsi delete
  const handleDelete = id => {
    setPosts(currentPosts =>
      currentPosts.filter(post => post.id !== id),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tutorial Express + React Native
      </Text>

      <View style={styles.line} />

      <ScrollView>
        {loading ? (
          <Text style={styles.loading}>
            Loading...
          </Text>
        ) : posts.length === 0 ? (
          <Text style={styles.empty}>
            Tidak ada posts.
          </Text>
        ) : (
          posts.map((post, index) => (
            <View
              key={post.id ?? index}
              style={styles.postContainer}>

              <Image
                source={{uri: post.image}}
                style={styles.avatar}
              />

              <View style={styles.content}>
                <Text style={styles.title}>
                  {post.title}
                </Text>
              </View>

              <View style={styles.buttonsContainer}>
                {/* Edit */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.push('PostEdit', {
                      post: post,
                    })
                  }>
                  <Text style={styles.buttonText}>
                    Edit
                  </Text>
                </TouchableOpacity>

                {/* Delete */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDelete(post.id)}>
                  <Text style={styles.buttonText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() =>
          navigation.push('PostCreate')
        }>
        <Text style={styles.floatingButtonText}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },

  line: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#ddd',
    height: 2,
  },

  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  button: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#e91e63',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
  },

  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },

  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  floatingButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});