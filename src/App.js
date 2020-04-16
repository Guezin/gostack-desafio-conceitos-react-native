import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function handleListRepository() {
      const { data } = await api.get('/repositories');
    
      setRepositories(data);
    }

    handleListRepository();
  }, []);

  async function handleLikeRepository(id) {
    const { data } = await api.post(`/repositories/${id}/like`)
    const like = data.likes

    setLikes(like);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repositories => repositories.id}
          renderItem={({ item: repositories }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repositories.title}</Text>
              
              <View style={styles.techsContainer}>
                <Text style={styles.tech}>
                  { repositories.techs }
                </Text>
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repositories.id}`}
                >
                  {likes} {likes <= 1 ? 'curtida' : 'curtidas'}
                </Text>
              </View>
              
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.6}
                onPress={() => handleLikeRepository(repositories.id)}
                testID={`like-button-${repositories.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
          
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
