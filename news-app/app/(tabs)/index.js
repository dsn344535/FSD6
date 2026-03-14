import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsCard from "../../components/NewsCard";
import { fetchNews } from "../../services/newsService";

export default function HomeScreen() {

  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const articles = await fetchNews();
    setNews(articles);
    setFilteredNews(articles);
  };

  const searchNews = (text) => {
    setSearch(text);

    const filtered = news.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredNews(filtered);
  };

  const openArticle = async (url) => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert("Error", "Cannot open this news article.");
  }
};

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>📰 Daily News</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.search}
        placeholder="Search news..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={searchNews}
      />

      {/* Categories */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Technology</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Sports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>Business</Text>
        </TouchableOpacity>
      </View>

      {/* News List */}
      <FlatList
        data={filteredNews}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openArticle(item.url)}>
            <NewsCard article={item} />
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  categoryContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  category: {
    backgroundColor: "#FFD700",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 10,
  },

  categoryText: {
    color: "#000",
    fontWeight: "bold",
  },

});