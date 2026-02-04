import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import AppHeader from "../components/AppHeader";
import AppButton from "../components/AppButton";
import { getUser, StoredUser } from "../utils/storage";

export default function ProfileScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    (async () => {
      const u = await getUser();
      setUser(u);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Profile" />

      <View style={styles.container}>
        <Image
          source={require("../assets/images/user.png")}
          style={styles.avatar}
        />

        <View style={styles.card}>
          <View style={styles.card_body}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user?.name ?? "—"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email ?? "—"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{"9204251124"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Bio:</Text>
            <Text style={styles.value}>{"This is my profile bio."}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{"Somewhere not here"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>DOB:</Text>
            <Text style={styles.value}>{"2000-02-01"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{"Male"}</Text>
          </View>

          <View style={styles.card_body}>
            <Text style={styles.label}>Member since:</Text>
            <Text style={styles.value}>{"2026-01-01"}</Text>
          </View>
          <AppButton title="Edit Profile" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fafc",
    width:Platform.OS==='web'?'40%':'100%',alignSelf:'center',
  },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  card_body: { marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  label: { color: '#64748b', fontSize: 14, width: 120, marginRight: 8 },
  value: { color: '#0f172a', fontSize: 16, fontWeight: '500', flex: 1 },
});
