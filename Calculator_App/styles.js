import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282c34",
  },
  display: {
    width: "90%",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#3b3f47",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 30,
    color: "#fff",
  },
  resultText: {
    fontSize: 40,
    color: "#0f0",
  },
  buttonContainer: {
    width: "90%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#50545c",
    padding: 20,
    margin: 5,
    borderRadius: 10,
    width: 70,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
  },
});

export default styles;
