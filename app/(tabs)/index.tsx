import * as React from "react";
import { Image, StyleSheet, Platform, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { CameraMode, CameraView } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import IconButton from "@/components/IconButton";
import BottomRowTools from "@/components/BottomRowTools";

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>("picture");

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} mode={cameraMode} style={{ flex: 1 }}>
        <BottomRowTools setCameraMode={setCameraMode} cameraMode={cameraMode} />
      </CameraView>
    </View>
  );
}
