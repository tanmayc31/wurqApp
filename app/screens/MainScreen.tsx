import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Screen } from "@/components"

export const MainScreen = () => {
  return (
    <Screen preset="scroll">
      <View style={styles.container}>
        <Text style={styles.title}>Main Screen</Text>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
})
