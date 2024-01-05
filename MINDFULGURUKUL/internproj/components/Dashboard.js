import { React, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LOGO from "./add.svg";
import DropDownPicker from "react-native-dropdown-picker";
const Dashboard = ({ navigation }) => {
  const [search, setSearch] = useState("");
  DropDownPicker.setListMode("FLATLIST");
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [sort, setSort] = useState([
    { label: "A-Z", value: "atoz" },
    { label: "Z-A", value: "ztoa" },
  ]);
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          alignSelf: "center",
        }}
      >
        <View style={{ width: "70%" }}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            autoCapitalize="sentences"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("user")}>
            <LOGO width={25} height={25} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginLeft: "14%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 13 }}>Filter: </Text>
        <View style={{ width: "40%" }}>
          <DropDownPicker
            open={open1}
            value={value1}
            items={sort}
            setOpen={setOpen1}
            setValue={setValue1}
            itemSeparator={true}
            setItems={setSort}
            dropDownDirection="AUTO"
            placeholder="Sort By"
            disableBorderRadius={true}
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Sahil Vaidya</Text>
        <Text style={styles.detail}>sahil.vaidya13@gmail.com</Text>
        <Text style={styles.detail}>+91 9926703403</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  input: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 15,
    fontSize: 12,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "blue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,

    shadowRadius: 2,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detail: {
    fontSize: 14,
    color: "#666",
  },
});

export default Dashboard;
