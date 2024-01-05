import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: "40%" }}>
        <Text style={{ fontSize: 35 }}>
          <Text style={styles.t1}>User</Text>
          <Text style={styles.t2}>Manager</Text>
        </Text>
      </View>

      <View style={{ marginTop: 70, marginLeft: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          Login to your Account
        </Text>
        <KeyboardAwareScrollView style={styles.scroller}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </KeyboardAwareScrollView>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "#042D96", textDecorationLine: "underline" }}>
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  button: {
    // Adjust padding as desired
    backgroundColor: "#E55771",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 120, // Adjust width as needed
    height: 40,
    marginTop: 20,
    // Adjust height as needed
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  t1: {
    color: "black",
    fontWeight: "400",
  },
  t2: {
    color: "#E55771",
    fontWeight: "400",
  },
  scroller: {
    marginTop: 20,
  },
  input: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginRight: 18,
    marginTop: 15,

    shadowColor: "black", // Color of the shadow
    shadowOffset: {
      width: 0, // Horizontal offset
      height: 2, // Vertical offset
    },
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 8, // Blur radius of the shadow
    elevation: 3,
  },
});
export default Login;
