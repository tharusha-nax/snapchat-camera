import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { CameraMode } from "expo-camera";
import { Image } from "expo-image";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface MainRowActionsProps {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
}

export default function MainRowActions({
  handleTakePicture,
  cameraMode,
  isRecording,
}: MainRowActionsProps) {
  const [assests, setAssests] = useState<Asset[]>([]);

  useEffect(() => {
    getAlbums();
  }, []);
  async function getAlbums() {
    const fetchAlbums = await getAlbumsAsync();
    const albumAssests = await getAssetsAsync({
      mediaType: "photo",
      sortBy: "creationTime",
      first: 4,
    });
    setAssests(albumAssests.assets);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={assests}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
            }}
          />
        )}
        inverted
        horizontal
        contentContainerStyle={{ gap: 6 }}
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
              ? "record.circle"
              : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? Colors.light.snapPrimary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
          fallback={
            <FontAwesome6
              name="dot-circle"
              size={80}
              color={isRecording ? Colors.light.snapPrimary : "white"}
            />
          }
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {[0, 1, 2, 3].map((item) => (
          <SymbolView
            key={item}
            name="face.dashed"
            size={40}
            type="hierarchical"
            tintColor={"white"}
            fallback={<FontAwesome6 name="face-grin" color="white" size={40} />}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 45,
  },
});
