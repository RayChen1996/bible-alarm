import { Image, StyleSheet, FlatList, View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function HomeScreen() {
  const [verses, setVerses] = useState([]);
  const [chapter, setChapter] = useState(12); // 預設章節
  const book = "romans"; // 可以將書卷設為常量或從其他來源獲取

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await fetch(
          `https://bible-api.com/${book}+${chapter}`
        );
        const data = await response.json();
        setVerses(data.verses); // 假設API回傳的經文在這個屬性中
      } catch (error) {
        console.error("Error fetching verses:", error);
      }
    };

    fetchVerses();
  }, [chapter]);

  const renderVerse = ({ item }) => (
    <View style={styles.verseContainer}>
      <Text style={styles.verseText}>{item.text}</Text>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1604882737206-8a000c03d8fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.buttonContainer}>
        <Button
          title="上一章"
          onPress={() => setChapter(chapter > 1 ? chapter - 1 : 1)}
        />
        <Button title="下一章" onPress={() => setChapter(chapter + 1)} />
      </View>
      <FlatList
        data={verses}
        renderItem={renderVerse}
        keyExtractor={(item) => item.id} // 假設每個經文都有唯一的ID
      />

      <View style={styles.buttonContainer}>
        <Button
          title="上一章"
          onPress={() => setChapter(chapter > 1 ? chapter - 1 : 1)}
        />
        <Button title="下一章" onPress={() => setChapter(chapter + 1)} />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    // bottom: 0,
    // left: 0,
    // position: "absolute",
    objectFit: "cover",
  },
  verseContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  verseText: {
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
});
