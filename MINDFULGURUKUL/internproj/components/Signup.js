import { React, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import { useSafeArea } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Signup = ({ navigation }) => {
  const insets = useSafeArea();
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  DropDownPicker.setListMode("FLATLIST");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value1, setValue1] = useState(null);
  const [gen, setGen] = useState(true);
  const [value2, setValue2] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [itemsCity, setItemsCity] = useState([
    { label: "Mumbai", value: "mumbai" },
    { label: "Pune", value: "pune" },
    { label: "Ahmedabad", value: "ahmedabad" },
  ]);
  const [itemsState, setItemsState] = useState([
    { label: "Maharashtra", value: "maharashtra" },
    { label: "Gujrat", value: "gujrat" },
    { label: "Karnataka", value: "karnataka" },
  ]);
  const options = ["linkedin", "friends", "jobportals", "others"];
  const NewUser = async () => {
    setFormData({
      name: name,
      email: email,
      phone: phone,
      pass: pass,
      gender: gen,
      city: value1,
      state: value2,
    });
    const rep = fetch("https://usermanager-w8ex.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <KeyboardAwareScrollView
      style={{
        paddingTop: insets.top - 40,
        flex: 1,
        backgroundColor: "#EFEFEF",
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      scrollEnabled={true}
    >
      <View style={{ alignSelf: "center", marginTop: "40%" }}>
        <Text style={{ fontSize: 35 }}>
          <Text style={styles.t1}>User</Text>
          <Text style={styles.t2}>Manager</Text>
        </Text>
      </View>

      <View style={{ marginTop: 70, marginLeft: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 400 }}>
          SignUp to your Account
        </Text>
        <View style={styles.scroller}>
          <TextInput
            style={styles.input}
            name="name"
            placeholder="Name"
            autoCapitalize="sentences"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            name="phone"
            keyboardType="phone-pad"
            placeholder="Phone"
            autoCapitalize="none"
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <TextInput
            style={styles.input}
            name="pass"
            placeholder="Password"
            secureTextEntry={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              marginTop: 20,
            }}
          >
            <Text style={{ fontWeight: 400, flex: 1, marginLeft: 20 }}>
              Gender
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 30,
                alignSelf: "center",
                flex: 1,
              }}
            >
              <View style={{ flexDirection: "row", gap: 7 }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: "#E55771",
                    borderWidth: 1,
                    borderRadius: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setGen(1)}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: gen ? "#E55771" : "#EFEFEF",
                        alignSelf: "center",
                        borderRadius: 10,
                      }}
                    ></View>
                  </TouchableOpacity>
                </View>
                <Text>Male</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: "#E55771",
                    borderWidth: 1,
                    borderRadius: 10,
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity onPress={() => setGen(0)}>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: gen ? "#EFEFEF" : "#E55771",
                        alignSelf: "center",
                        borderRadius: 12,
                      }}
                    ></View>
                  </TouchableOpacity>
                </View>
                <Text>Female</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              alignSelf: "center",
              lineHeight: 24,
              marginTop: 25,
            }}
          >
            <Text style={{ lineHeight: 40 }}>City</Text>
            <View style={{ width: "70%" }}>
              <DropDownPicker
                open={open1}
                value={value1}
                items={itemsCity}
                setOpen={setOpen1}
                setValue={setValue1}
                itemSeparator={true}
                setItems={setItemsCity}
                dropDownDirection="AUTO"
                placeholder="Select City"
                disableBorderRadius={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignSelf: "center",
              lineHeight: 24,
              marginTop: 25,
            }}
          >
            <Text style={{ lineHeight: 40 }}>State</Text>
            <View style={{ width: "70%" }}>
              <DropDownPicker
                open={open2}
                value={value2}
                items={itemsState}
                setOpen={setOpen2}
                setValue={setValue2}
                itemSeparator={true}
                setItems={setItemsState}
                searchable={true}
                dropDownDirection="AUTO"
                placeholder="Select State"
                disableBorderRadius={true}
              />
            </View>
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={{ marginLeft: 15, fontWeight: "bold", fontSize: 14 }}>
              From where you got to know about us?
            </Text>
            <View style={{ marginLeft: 15 }}></View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={NewUser}
        style={styles.button}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Registration Successful!</AlertDialog.Header>
              <AlertDialog.Body>
                You are registered with UserManager!
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button colorScheme="success" onPress={onClose}>
                  Done
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      </NativeBaseProvider>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Text>Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("dashboard")}>
          <Text style={{ color: "#042D96", textDecorationLine: "underline" }}>
            SignIn
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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

export default Signup;
