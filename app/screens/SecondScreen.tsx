import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Screen } from "@/components"

export const SecondScreen = () => {
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Screen preset="scroll">
      <View style={styles.container}>
        <Text style={styles.title}>Second Screen</Text>
        <Text>Timer: {timer}s</Text>
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
