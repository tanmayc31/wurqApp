import React, { FC, useEffect, useState } from "react"
import { View, Text, TextInput, ActivityIndicator } from "react-native"
import { Screen } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"

export const SecondScreen: FC<DemoTabScreenProps<"Second">> = function SecondScreen(_props) {
  const [timer, setTimer] = useState(0)
  const [users, setUsers] = useState([])
  const [usersText, setUsersText] = useState("")
  const [loading, setLoading] = useState(true)
  const [promiseResult, setPromiseResult] = useState("")

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
    startPromiseInterval()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://192.168.1.41:3000/')
      const data = await response.json()
      setUsers(data)
      
      // Format users data in table-like format
      let formattedText = "NAME                    AGE    FEE    LOCATION    DATE\n"
      formattedText += "============================================================\n"
      
      data.forEach((item: any) => {
        const name = `${item.user.name} ${item.user.lastname}`
        const age = item.user.age.toString()
        const fee = `$${item.user.fee}`
        const location = item.location
        const date = item.date
        
        formattedText += `${name.padEnd(23)} ${age.padEnd(6)} ${fee.padEnd(6)} ${location.padEnd(11)} ${date}\n`
      })
      
      setUsersText(formattedText)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Promise that starts an interval of 1 second and returns once called 3 times
  const startPromiseInterval = () => {
    const promise = new Promise((resolve) => {
      let count = 0
      const intervalId = setInterval(() => {
        count++
        console.log(`Promise interval called ${count} times`)
        
        if (count === 3) {
          clearInterval(intervalId)
          resolve(`Promise completed after ${count} intervals`)
        }
      }, 1000)
    })

    promise.then((result: any) => {
      setPromiseResult(result)
      console.log(result)
    })
  }

  // Format timer display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <Screen preset="fixed" safeAreaEdges={["top"]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]}>
      <View style={{ flex: 1, padding: 20 }}>
        
        {/* Timer */}
        <View style={{ 
          backgroundColor: '#f0f0f0', 
          padding: 20, 
          borderRadius: 10, 
          marginBottom: 20,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Page Timer</Text>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#333' }}>
            {formatTime(timer)}
          </Text>
        </View>

        {/* Promise Result */}
        {promiseResult && (
          <View style={{
            backgroundColor: '#11468F',
            padding: 15,
            borderRadius: 8,
            marginBottom: 20,
            
            
          }}>
            <Text style={{ fontSize: 14, color: 'white' }}>
              {promiseResult}
            </Text>
          </View>
        )}

        {/* Users Table */}
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
              minHeight: 400,
              textAlignVertical: 'top',
              backgroundColor: '#f9f9f9',
              fontSize: 12,
              fontFamily: 'monospace',
              lineHeight: 16
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