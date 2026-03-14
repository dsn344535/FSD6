import { View, Text, Image, StyleSheet } from "react-native";

export default function NewsCard({ article }) {
  return (
    <View style={styles.card}>

      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>

        {article.description && (
          <Text style={styles.description}>
            {article.description}
          </Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1e1e1e",
    marginBottom: 18,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    height: 200,
    width: "100%",
  },

  content: {
    padding: 15,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  description: {
    color: "#ccc",
    fontSize: 14,
  },

});