import React, { FC, useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { Screen } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"

export const ThirdScreen: FC<DemoTabScreenProps<"Third">> = function ThirdScreen(_props) {
  const [points, setPoints] = useState("189")
  const [name, setName] = useState("WOD Newton")

  const handleSubmit = () => {
    console.log("Form submitted:", { points, name })
    alert(`Submitted: ${name} with ${points} points`)
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} style={{ backgroundColor: '#2c3e50' }}>
      <View style={{ flex: 1, padding: 20 }}>
        
        {/* History Card - shows current form values */}
        <View style={{
          backgroundColor: '#34495e',
          borderRadius: 15,
          padding: 20,
          marginBottom: 30,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#bdc3c7', fontSize: 12, marginBottom: 5 }}>
              7/30/2022
            </Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
              {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#3498db', fontSize: 14, marginRight: 15 }}>
                12:53
              </Text>
              <Text style={{ color: '#2ecc71', fontSize: 14, marginRight: 15 }}>
                0:37 | 5%
              </Text>
              <Text style={{ color: 'white', fontSize: 14 }}>
                167
              </Text>
            </View>
          </View>
          
          <View style={{
            backgroundColor: '#000',
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            minWidth: 80
          }}>
            <Text style={{ color: '#2ecc71', fontSize: 24, fontWeight: 'bold' }}>
              +{points}
            </Text>
            <Text style={{ color: '#bdc3c7', fontSize: 10 }}>
              Total Points
            </Text>
          </View>
          
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Text style={{ color: '#e74c3c', fontSize: 20 }}>♥</Text>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View>
          {/* Points Input */}
          <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
            Points
          </Text>
          <TextInput
            style={{
              backgroundColor: '#34495e',
              color: 'white',
              borderRadius: 8,
              padding: 15,
              fontSize: 16,
              marginBottom: 20
            }}
            value={points}
            onChangeText={setPoints}
            keyboardType="numeric"
            placeholder="Enter points"
            placeholderTextColor="#7f8c8d"
          />

          {/* Name Input */}
          <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
            Name
          </Text>
          <TextInput
            style={{
              backgroundColor: '#34495e',
              color: 'white',
              borderRadius: 8,
              padding: 15,
              fontSize: 16,
              marginBottom: 30
            }}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
            placeholderTextColor="#7f8c8d"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 25,
              padding: 15,
              alignItems: 'center',
              marginBottom: 20
            }}
            onPress={handleSubmit}
          >
            <Text style={{ 
              color: '#2c3e50', 
              fontSize: 16, 
              fontWeight: 'bold' 
            }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </Screen>
  )
}