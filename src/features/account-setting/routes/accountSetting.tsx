import { Scafold } from "@/src/components";
import { ListItem, ListSubHeading } from "@/src/components/list";
import { useRouter } from "expo-router";
import {
  CircleDollarSign,
  Globe,
  HelpCircle,
  Info,
  Key as KeyIcon,
  LogIn,
  CreditCard as LucideCreditCard,
  Mail,
  Palette as PaletteIcon,
  Shield,
  UserCircle,
  UserPlus,
} from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Divider, List } from "react-native-paper";
export const AccountSetting = () => {
  const router = useRouter();
  return (
    <Scafold paddingVertical={0}>
      <View className="flex flex-col">
        {/* Account Settings Section */}
        <List.Section>
          <ListSubHeading>Account Settings</ListSubHeading>
          <ListItem
            title="Edit Profile"
            left={(props) => <UserCircle {...props} size={20} />}
            onPress={() => {
              router.navigate("/user/profile");
            }}
          />
          <ListItem
            title="Create Poem"
            left={(props) => <KeyIcon {...props} size={20} />}
            onPress={() => {
              router.navigate("/create-poem");
            }}
          />
          <ListItem
            title="Create Plyalist"
            left={(props) => <KeyIcon {...props} size={20} />}
            onPress={() => {
              router.navigate("/create-playlist");
            }}
          />
          <ListItem
            title="Change Password"
            left={(props) => <KeyIcon {...props} size={20} />}
            onPress={() => {}}
          />
          <ListItem
            title="Sign In"
            left={(props) => <LogIn {...props} size={20} />}
            onPress={() => {
              router.push("/signin");
            }}
          />
          <ListItem
            title="Sign Up"
            left={(props) => <UserPlus {...props} size={20} />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        {/* Payment Section */}
        <List.Section>
          <ListSubHeading>Payment</ListSubHeading>
          <ListItem
            title="Payment Account"
            left={(props) => <LucideCreditCard {...props} size={20} />}
            onPress={() => {}}
          />
          <ListItem
            title="Payment Details"
            left={(props) => <CircleDollarSign {...props} size={20} />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        {/* Preferences Section */}
        <List.Section>
          <ListSubHeading>Preferences</ListSubHeading>
          <ListItem
            title="Theme"
            left={(props) => <PaletteIcon {...props} size={20} />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        {/* Legal Section */}
        <List.Section>
          <ListSubHeading>Legal</ListSubHeading>
          <ListItem
            title="Terms and Conditions"
            left={(props) => <Shield {...props} size={20} />}
            onPress={() => {}}
          />
          <ListItem
            title="Privacy Policy"
            left={(props) => <Globe {...props} size={20} />}
            onPress={() => {}}
          />
        </List.Section>

        <Divider />

        {/* Help & Support Section */}
        <List.Section>
          <ListSubHeading>Help & Support</ListSubHeading>
          <ListItem
            title="Support"
            left={(props) => <HelpCircle {...props} size={20} />}
            onPress={() => {}}
          />
          <ListItem
            title="About Us"
            left={(props) => <Info {...props} size={20} />}
            onPress={() => {}}
          />
          <ListItem
            title="Contact Us"
            left={(props) => <Mail {...props} size={20} />}
            onPress={() => {}}
          />
        </List.Section>
        <Divider />
        <List.Section>
          <ListItem
            title="Logout"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={() => console.log("Logout pressed")}
          />
        </List.Section>
      </View>
    </Scafold>
  );
};
