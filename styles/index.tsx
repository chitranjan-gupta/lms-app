import { StyleSheet } from "react-native";

export const shadowStyle = StyleSheet.create({
  shadowBlack: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  shadowSmall: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 5,
  },
});

export const kanbanStyles = StyleSheet.create({
  kanbanStyle: {
    marginTop: 20,
    flex: 1,
  },
  kanbanHeader: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  kanbanCard: {
    height: 100,
  },
});
