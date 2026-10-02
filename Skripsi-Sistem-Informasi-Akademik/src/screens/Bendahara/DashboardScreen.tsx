
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";

import {
  tagihan,
  daftarKelas,
  pembayaran,
  riwayat,
  rupiah,
} from "../../data/bendahara";

const BLUE = "#0B2D83";
const BORDER = "#DCE2EC";
const LIGHT = "#F3FAFF";

export default function DashboardScreen() {
  const [kelas, setKelas] = useState("IX-A");
  const [showKelas, setShowKelas] = useState(false);
  const { width } = useWindowDimensions();

  const kelasAktif = daftarKelas.find(
    (item) => item.id === kelas
  );

  const siswa = pembayaran.filter(
    (item) => item.kelas === kelas
  );

  const go = (path: Href) => {
  router.push(path);
};

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <ImageBackground
          source={require(
            "../../../assets/images/Background2.png"
          )}
          style={styles.header}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "#0B2D83",
              "rgba(11,45,131,0.94)",
              "rgba(11,45,131,0.55)",
            ]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.headerContent}>
            <Image
              source={require(
                "../../../assets/images/logo sekolah.png"
              )}
              style={{
                width: width * 0.19,
                height: width * 0.19,
              }}
              resizeMode="contain"
            />

            <View style={styles.headerText}>
              <Text style={styles.schoolName}>
                SMP Muhammadiyah 12
                {"\n"}Paciran
              </Text>
              <Text style={styles.motto}>
                “Good In Character, Progressive In
                Thinking”
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          {/* DAFTAR TAGIHAN */}
          <View style={styles.section}>
            <SectionHeader
              title="Daftar Tagihan"
              onPress={() => go("/Bendahara/tagihan")}
            />

            <TouchableOpacity
              style={styles.billCard}
              onPress={() => go("/Bendahara/tagihan")}
            >
              <View style={styles.billInfo}>
                <Text style={styles.billTitle}>
                  {tagihan.nama}
                </Text>

                <Text style={styles.billDetail}>
                  Nominal Tagihan :{" "}
                  <Text style={styles.bold}>
                    {rupiah(tagihan.nominal)}
                  </Text>
                </Text>

                <Text style={styles.billDetail}>
                  Tahun Ajaran :{" "}
                  <Text style={styles.bold}>
                    {tagihan.tahunAjaran}
                  </Text>
                </Text>
              </View>

              <View style={styles.billRight}>
                <StatusBadge status={tagihan.status} />
                <Ionicons
                  name="chevron-forward"
                  size={25}
                  color={BLUE}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => go("/Bendahara/tagihan")}
            >
              <Ionicons
                name="add"
                size={27}
                color="white"
              />
              <Text style={styles.buttonText}>
                Buat Tagihan Baru
              </Text>
            </TouchableOpacity>
          </View>

          {/* VERIFIKASI PEMBAYARAN */}
          <View style={styles.section}>
            <SectionHeader
              title="Verifikasi Pembayaran"
              onPress={() =>
                go("/Bendahara/verifikasi")
              }
            />

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() =>
                setShowKelas(!showKelas)
              }
            >
              <Text style={styles.dropdownText}>
                Kelas {kelas}
              </Text>
              <Ionicons
                name={
                  showKelas
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={18}
                color={BLUE}
              />
            </TouchableOpacity>

            {showKelas &&
              daftarKelas.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setKelas(item.id);
                    setShowKelas(false);
                  }}
                >
                  <Text style={styles.body}>
                    {item.nama}
                  </Text>
                </TouchableOpacity>
              ))}

            <View style={styles.stats}>
              <Stat
                color="#00AE32"
                value={kelasAktif?.lunas ?? 0}
                label="Lunas"
              />
              <Stat
                color="#FFA116"
                value={kelasAktif?.belum ?? 0}
                label="Belum"
              />
              <Stat
                color="#1872ED"
                value={kelasAktif?.total ?? 0}
                label="Siswa"
              />
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.th, { flex: 2.3 }]}>
                  No. Nama Siswa
                </Text>
                <Text style={[styles.th, { flex: 1.1 }]}>
                  Status
                </Text>
                <Text style={[
                  styles.th,
                  { flex: 1, textAlign: "right" },
                ]}>
                  Tagihan
                </Text>
              </View>

              {siswa.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.tableRow}
                  onPress={() =>
                    go("/Bendahara/verifikasi")
                  }
                >
                  <View style={styles.studentCell}>
                    <Text style={styles.bold}>
                      {index + 1}
                    </Text>
                    <Text
                      style={styles.studentName}
                      numberOfLines={2}
                    >
                      {item.nama}
                    </Text>
                  </View>

                  <View style={styles.statusCell}>
                    <StatusBadge
                      status={item.status}
                    />
                  </View>

                  <Text style={styles.amountCell}>
                    {rupiah(item.tagihan)}
                  </Text>
                </TouchableOpacity>
              ))}

              {siswa.length === 0 && (
                <Text style={styles.empty}>
                  Belum ada data siswa.
                </Text>
              )}
            </View>
          </View>

          {/* RIWAYAT PEMBAYARAN */}
          <View style={styles.section}>
            <SectionHeader
              title="Riwayat Pembayaran"
              onPress={() =>
                go("/Bendahara/riwayat")
              }
            />

            {riwayat.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyCard}
                onPress={() =>
                  go("/Bendahara/riwayat")
                }
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.historyName}
                    numberOfLines={2}
                  >
                    {item.nama}
                  </Text>

                  <Text style={styles.historyDetail}>
                    Kelas {item.kelas}
                  </Text>

                  <Text style={styles.historyDetail}>
                    {item.jenis}
                  </Text>
                </View>

                <View style={styles.historyRight}>
                  <StatusBadge status="Lunas" />

                  <Text style={styles.historyAmount}>
                    {rupiah(item.nominal)}
                  </Text>

                  <View style={styles.dateRow}>
                    <Ionicons
                      name="calendar"
                      size={14}
                      color={BLUE}
                    />
                    <Text style={styles.dateText}>
                      {item.tanggal}
                    </Text>
                  </View>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={23}
                  color={BLUE}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// KOMPONEN

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seeAll}>
          Lihat Semua
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const success =
    status === "Lunas" || status === "Aktif";

  return (
    <View
      style={[
        styles.badge,
        {
          borderColor: success
            ? "#4DD77C"
            : "#FF3030",
        },
      ]}
    >
      <Text
        style={{
          color: success
            ? "#009F2C"
            : "#F00000",
          fontSize: 11,
        }}
      >
        {status}
      </Text>
    </View>
  );
}

function Stat({
  color,
  value,
  label,
}: {
  color: string;
  value: number;
  label: string;
}) {
  return (
    <View style={styles.stat}>
      <View
        style={[
          styles.dot,
          { backgroundColor: color },
        ]}
      />
      <Text style={styles.statValue}>
        {value}
      </Text>
      <Text style={styles.statLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingBottom: 24,
  },
  header: {
    height: 220,
    justifyContent: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 23,
    gap: 12,
    paddingTop: 15,
  },
  headerText: {
    flex: 1,
    alignItems: "center",
  },
  schoolName: {
    color: "#FFDF55",
    fontSize: 19,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    lineHeight: 28,
  },
  motto: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -24,
    paddingHorizontal: 18,
    paddingTop: 22,
    gap: 12,
  },
  section: {
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "#FBFDFF",
    borderRadius: 16,
    padding: 13,
    gap: 13,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    color: BLUE,
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    flexShrink: 1,
  },
  seeAll: {
    color: "#222222",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  billCard: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 11,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  billInfo: {
    flex: 1,
    gap: 6,
  },
  billTitle: {
    color: BLUE,
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  billDetail: {
    color: BLUE,
    fontSize: 12,
  },
  bold: {
    color: BLUE,
    fontFamily: "Poppins_700Bold",
  },
  billRight: {
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 5,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: BLUE,
    borderRadius: 6,
    minHeight: 43,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#C1CDEA",
    borderRadius: 5,
    width: 145,
    height: 35,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  dropdownText: {
    fontFamily: "Poppins_700Bold",
    color: BLUE,
    fontSize: 12,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  body: {
    color: BLUE,
    fontSize: 13,
  },
  stats: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "space-between",
  },
  stat: {
    borderWidth: 1,
    borderColor: "#C1CDEA",
    backgroundColor: "white",
    borderRadius: 5,
    flex: 1,
    minHeight: 39,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statValue: {
    color: BLUE,
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
  },
  statLabel: {
    color: BLUE,
    fontSize: 11,
  },
  table: {
    borderWidth: 1,
    borderColor: "#C1CDEA",
    backgroundColor: "#FFFFFF",
  },
  tableHeader: {
    backgroundColor: "#E8EFFF",
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  th: {
    color: BLUE,
    fontSize: 11,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#C1CDEA",
    minHeight: 51,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 3,
  },
  studentCell: {
    flex: 2.3,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  studentName: {
    color: BLUE,
    fontSize: 10,
    flex: 1,
  },
  statusCell: {
    flex: 1.1,
    alignItems: "center",
  },
  amountCell: {
    flex: 1,
    textAlign: "right",
    color: BLUE,
    fontSize: 10,
  },
  empty: {
    textAlign: "center",
    padding: 15,
    color: "#777777",
  },
  historyCard: {
    backgroundColor: LIGHT,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 11,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  historyName: {
    color: BLUE,
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
  },
  historyDetail: {
    color: BLUE,
    fontSize: 11,
    marginTop: 7,
  },
  historyRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 10,
  },
  historyAmount: {
    color: BLUE,
    fontSize: 13,
    fontFamily: "Poppins_700Bold",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  dateText: {
    color: BLUE,
    fontSize: 10,
  },
});
