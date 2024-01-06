import { React, useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LOGO from "./add.svg";
import DropDownPicker from "react-native-dropdown-picker";

const Dashboard = ({ navigation }) => {
  const [ID, setID] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id")
      .then((value) => setID(value))
      .catch((error) => console.error("Error retrieving value:", error));

    console.log(`idddddd: ${ID}`);

    fetcher();
  }, [ID, props]);
  const [search, setSearch] = useState("");
  DropDownPicker.setListMode("FLATLIST");
  const [open1, setOpen1] = useState(false);
  const [props, setProps] = useState([]);
  const [value1, setValue1] = useState("atoz");
  const [sort, setSort] = useState([
    { label: "A-Z", value: "atoz" },
    { label: "Z-A", value: "ztoa" },
  ]);
  const fetcher = async () => {
    const rep = fetch(
      `https://usermanager-w8ex.onrender.com/api/fetchProps/${ID}/${value1}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].propsUsers);
        if (value1 === "atoz") {
          const sortedData = data[0].propsUsers.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setProps(sortedData);
        } else {
          const sortedData = data[0].propsUsers.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          setProps(sortedData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
          gap: 8,
        }}
      >
        <Text style={{ fontSize: 13 }}>Filter:</Text>
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
        <Button onPress={fetcher} title="Done" />
      </View>

      {props
        ? props.map((cardItem, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("usersingle", { val: cardItem._id })
              }
            >
              <View key={index} style={styles.card}>
                <Text style={styles.title}>{cardItem.name}</Text>
                <Text style={styles.detail}>{cardItem.email}</Text>
                <Text style={styles.detail}>{cardItem.phone}</Text>
              </View>
            </TouchableOpacity>
          ))
        : ""}
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
