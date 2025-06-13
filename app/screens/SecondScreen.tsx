import React, { FC, useEffect, useState } from "react"
import { View, Text, ScrollView, TextInput } from "react-native"
import { Screen } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"

export const SecondScreen: FC<DemoTabScreenProps<"Second">> = function SecondScreen(_props) {
  const [timer, setTimer] = useState(0)
  const [users, setUsers] = useState([])
  const [usersText, setUsersText] = useState("")

  // Timer that starts when page opens
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Fetch users when page loads
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.1.41:3000/')
      const data = await response.json()
      setUsers(data)
      
      // Convert users to text format
      const userTextData = data.map((item: any) => 
        `${item.user.name} ${item.user.lastname}, Age: ${item.user.age}, Fee: $${item.user.fee}, Location: ${item.location}`
      ).join('\n')
      
      setUsersText(userTextData)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  // Format timer display (minutes:seconds)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <View style={{ flex: 1, padding: 20 }}>
        
        {/* Timer Display */}
        <View style={{ 
          backgroundColor: '#e8e8e8', 
          padding: 20, 
          borderRadius: 10, 
          marginBottom: 20,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Timer</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#333' }}>
            {formatTime(timer)}
          </Text>
        </View>

        {/* Users Text Box */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
            All Users Data:
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 8,
              padding: 15,
              minHeight: 300,
              textAlignVertical: 'top',
              backgroundColor: '#f9f9f9',
              fontSize: 14,
              fontFamily: 'monospace'
            }}
            multiline={true}
            value={usersText}
            editable={false}
            scrollEnabled={true}
          />
        </View>
        
      </View>
    </Screen>
  )
}