import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { ListView, Screen, Text } from "@/components"
import { useStores } from "@/models"
import { DemoTabScreenProps } from "@/navigators/DemoNavigator"
import { $styles } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export const MainScreen: FC<DemoTabScreenProps<"Main">> = observer(function MainScreen(_props) {
  const { userStore } = useStores()
  const { themed } = useAppTheme()

  useEffect(() => {
    userStore.fetchUsers()
  }, [])

  
  function getCardColor(age: number) {
    if (age < 30) {
      return '#808080' // gray
    } else if (age >= 30 && age <= 50) {
      return '#DD3E3E' // red  
    } else {
      return '#11468F' // blue
    }
  }

  const renderCard = ({ item }: any) => {
    const cardColor = getCardColor(item.age)
    
    return (
      <View style={[cardStyle, { backgroundColor: cardColor }]}>
        <Text style={nameStyle}>{item.name}</Text>
        <Text style={textStyle}>Age: {item.age}</Text>
        <Text style={textStyle}>Fee: ${item.feesPaid}</Text>
      </View>
    )
  }

  if (userStore.error) {
    return (
      <Screen preset="fixed" safeAreaEdges={["top"]}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: 'red', textAlign: 'center' }}>Error: {userStore.error}</Text>
        </View>
      </Screen>
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$styles.flex1}>
      <View style={containerStyle}>
        <View style={headerStyle}>
          <Text preset="heading" style={{ fontSize: 20, fontWeight: 'bold' }}>
            Total Fees: ${userStore.totalFees}
          </Text>
        </View>

        <ListView
          data={userStore.validUsers.slice()}
          estimatedItemSize={100}
          keyExtractor={(item: any) => item.id}
          renderItem={renderCard}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </Screen>
  )
})

// inline styles - should probably move these to a separate file
const containerStyle: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
  paddingTop: 10,
}

const headerStyle: ViewStyle = {
  backgroundColor: '#f5f5f5',
  padding: 16,
  borderRadius: 8,
  marginBottom: 16,
  alignItems: 'center',
  // shadow for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  // elevation for Android  
  elevation: 2,
}

const cardStyle: ViewStyle = {
  padding: 16,
  marginBottom: 12,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
}

const nameStyle: TextStyle = {
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 4,
}

const textStyle: TextStyle = {
  fontSize: 14,
  color: 'white',
  marginBottom: 2,
}