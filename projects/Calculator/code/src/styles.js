import { StyleSheet } from "react-native";

export const theme = {
  bg: "#17171C",
  secondary: "#2E2F38",
  accent: "#4B5EFC",
  textPrimary: "#FFFFFF",
  textSecondary: "#747477",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    justifyContent: "flex-end",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    paddingBottom: 30,
  },
  inputText: {
    fontSize: 40,
    color: theme.textPrimary,
  },
  resultText: {
    fontSize: 24,
    color: theme.textSecondary,
    marginTop: 10,
  },
  buttonsContainer: {
    paddingBottom: 20,
    backgroundColor: theme.bg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.secondary,
  },
  buttonBlue: {
    backgroundColor: theme.accent,
  },
  buttonLight: {
    backgroundColor: "#4E505F",
  },
  buttonText: {
    fontSize: 28,
    color: theme.textPrimary,
    fontWeight: "500",
  },
});

export default styles;