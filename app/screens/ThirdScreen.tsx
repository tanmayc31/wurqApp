import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Screen } from "@/components"

export const ThirdScreen = () => {
  return (
    <Screen preset="scroll">
      <View style={styles.container}>
        <Text style={styles.title}>Third Screen</Text>
        {/* Add your form and chart logic here */}
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
