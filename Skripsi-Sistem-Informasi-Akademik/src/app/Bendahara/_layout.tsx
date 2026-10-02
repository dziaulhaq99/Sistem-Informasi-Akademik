
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BLUE = "#0B2D83";

type IconName =
  React.ComponentProps<typeof Ionicons>["name"];

const menus: {
  name: string;
  title: string;
  icon: IconName;
  activeIcon: IconName;
}[] = [
  {
    name: "index",
    title: "Dashboard",
    icon: "home-outline",
    activeIcon: "home",
  },
  {
    name: "verifikasi",
    title: "Verifikasi",
    icon: "checkbox-outline",
    activeIcon: "checkbox",
  },
  {
    name: "tagihan",
    title: "Tagihan",
    icon: "receipt-outline",
    activeIcon: "receipt",
  },
  {
    name: "riwayat",
    title: "Riwayat",
    icon: "clipboard-outline",
    activeIcon: "clipboard",
  },
  {
    name: "profil",
    title: "Profil",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function BendaharaLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#AAB5CB",
        tabBarStyle: {
          backgroundColor: BLUE,
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Poppins_600SemiBold",
        },
      }}
    >
      {menus.map((menu) => (
        <Tabs.Screen
          key={menu.name}
          name={menu.name}
          options={{
            title: menu.title,
            tabBarIcon: ({
              color,
              focused,
              size,
            }) => (
              <Ionicons
                name={
                  focused
                    ? menu.activeIcon
                    : menu.icon
                }
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
