import React, { FC, useEffect, useState } from "react"
import { View, Text, FlatList, ActivityIndicator } from "react-native"
import { Screen } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"

export const MainScreen: FC<DemoTabScreenProps<"Main">> = function MainScreen(_props) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.1.41:3000/')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderUser = ({ item }: any) => (
    <View style={{ 
      padding: 15, 
      margin: 10, 
      backgroundColor: '#f0f0f0', 
      borderRadius: 8 
    }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        {item.user.name} {item.user.lastname}
      </Text>
      <Text>Age: {item.user.age}</Text>
      <Text>Fee: ${item.user.fee}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  )

  
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <View style={{ flex: 1, padding: 20 }}>
        
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  )
}