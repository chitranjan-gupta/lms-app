import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

import { TabBarIcon } from "@/components";
import { Colors } from "@/constants/Colors";

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "white",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
        tabBarIconStyle: {
          width: 0,
          height: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="home"
              focused={focused}
              color={color}
              icontype={"entypo"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: "Courses",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="book"
              focused={focused}
              color={color}
              icontype={"feather"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="careers"
        options={{
          title: "Careers",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="suitcase"
              focused={focused}
              color={color}
              icontype={"fontawesome"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="kanban"
        options={{
          title: "Kanban",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="view-kanban"
              focused={focused}
              color={color}
              icontype={"materialicons"}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              name="user-circle"
              focused={focused}
              color={color}
              icontype={"fontawesome"}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
