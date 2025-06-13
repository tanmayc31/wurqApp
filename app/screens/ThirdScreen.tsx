import React, { FC, useState } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, Platform } from "react-native"
import { LineChart } from 'react-native-chart-kit'
import { Screen } from "@/components"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"

const screenWidth = Dimensions.get("window").width
const isWeb = Platform.OS === 'web'

export const ThirdScreen: FC<DemoTabScreenProps<"Third">> = function ThirdScreen(_props) {
  const [points, setPoints] = useState("189")
  const [name, setName] = useState("WOD Newton")
  
  // Get responsive chart width
  const getChartWidth = () => {
    if (isWeb) {
      return Math.min(screenWidth - 40, 400) // Max 400px for web, with padding
    }
    return screenWidth - 60 // Mobile with more padding
  }
  
  // Chart data
  const chartData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        data: [10, 15, 8, 12, 18, 15, 10],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  const chartConfig = {
    backgroundColor: "#1e2923",
    backgroundGradientFrom: "#2c3e50",
    backgroundGradientTo: "#34495e",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: "#2ecc71"
    }
  }

  const handleSubmit = () => {
    console.log("Submitted:", { points, name })
    // Handle form submission here
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} style={{ backgroundColor: '#2c3e50' }}>
      <View style={{ 
        flex: 1, 
        padding: 20,
        maxWidth: isWeb ? 500 : '100%',
        alignSelf: 'center',
        width: '100%'
      }}>
          
          {/* Points per WOD Chart */}
          <View style={{ marginBottom: 30 }}>
            <Text style={{ 
              color: 'white', 
              fontSize: 18, 
              fontWeight: 'bold', 
              marginBottom: 15,
              textAlign: 'center'
            }}>
              Points per WOD
            </Text>
            
            <LineChart
              data={chartData}
              width={getChartWidth()}
              height={180}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
                alignSelf: 'center'
              }}
              withHorizontalLabels={true}
              withVerticalLabels={false}
              withDots={true}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={false}
            />
          </View>

          {/* History Section */}
          <Text style={{ 
            color: 'white', 
            fontSize: 16, 
            fontWeight: 'bold', 
            marginBottom: 15
          }}>
            History:
          </Text>

          {/* History Card */}
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
            
            {/* Heart icon placeholder */}
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