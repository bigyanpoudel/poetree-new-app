import { Scafold } from "@/src/components";
import { ListItem, ListSubHeading } from "@/src/components/list";
import { useIsDarkTheme } from "@/src/hooks/useAppThemeScheme";
import { useGetCurrentUser } from "@/src/hooks/useRootHook";
import { useAppProvider } from "@/src/provider/appProvider";
import { Colors } from "@/src/utils/constant/colors";
import { performLogout } from "@/src/utils/logout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Globe,
  HelpCircle,
  Info,
  Key as KeyIcon,
  LogIn,
  CreditCard as LucideCreditCard,
  LucideListPlus,
  LucidePlus,
  Mail,
  Palette as PaletteIcon,
  Shield,
  ShoppingBag,
  User,
  UserCircle,
  UserPlus,
  BookOpen,
  FileText,
} from "lucide-react-native";
import React from "react";
import { Appearance, View } from "react-native";
import { Divider, List } from "react-native-paper";
import { Toast } from "toastify-react-native";
export const AccountSetting = () => {
  const router = useRouter();
  const { user, setUser } = useAppProvider();
  const isDark = useIsDarkTheme();
  const currentUser = useGetCurrentUser();
  const toggleTheme = () => {
    if (isDark) {
      Appearance.setColorScheme("light");
    } else {
      Appearance.setColorScheme("dark");
    }
  };

  const handleLogout = async () => {
    try {
      // Use the shared logout function with setUser
      const success = await performLogout(setUser);

      if (success) {
        // Show success message
        Toast.success("Logged out successfully!");
      } else {
        Toast.error("Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Toast.error("Failed to logout. Please try again.");
    }
  };
  return (
    <Scafold paddingVertical={0}>
      <View className="flex flex-col">
        {/* Account Settings Section */}
        <List.Section>
          <ListSubHeading>Account</ListSubHeading>
          {user?._id ? (
            <>
              <ListItem
                title="Profile"
                left={(props) => <User {...props} size={20} />}
                onPress={() => {
                  router.navigate(
                    `/user/${user._id}?slug=${currentUser?.data?.slug}`
                  );
                }}
              />
              <ListItem
                title="Edit Profile"
                left={(props) => <UserCircle {...props} size={20} />}
                onPress={() => {
                  router.navigate("/account/edit-profile");
                }}
              />
              <ListItem
                title="Change Password"
                left={(props) => <KeyIcon {...props} size={20} />}
                onPress={() => {
                  router.push("/account/change-password");
                }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </List.Section>
        <Divider />
        {user?._id && (
          <>
            <List.Section>
              <ListSubHeading>Creator</ListSubHeading>
              <ListItem
                title="Create Poem"
                left={(props) => <LucidePlus {...props} size={20} />}
                onPress={() => {
                  router.navigate("/create-poem");
                }}
              />
              <ListItem
                title="Create Playlist"
                left={(props) => <LucideListPlus {...props} size={20} />}
                onPress={() => {
                  router.navigate("/create-playlist");
                }}
              />
              <ListItem
                title="My Purchase"
                left={(props) => <ShoppingBag {...props} size={20} />}
                onPress={() => {
                  router.navigate("/my-purchase");
                }}
              />
            </List.Section>

            <Divider />
            {/* Anthology Section */}
            <List.Section>
              <ListSubHeading>Anthology</ListSubHeading>
              <ListItem
                title="Anthologies"
                left={(props) => <BookOpen {...props} size={20} />}
                onPress={() => {
                  router.navigate("/anthologies");
                }}
              />
              {user && (
                <ListItem
                  title="My Submissions"
                  left={(props) => <FileText {...props} size={20} />}
                  onPress={() => {
                    router.navigate("/my-submissions");
                  }}
                />
              )}
            </List.Section>

            <Divider />
            {/* Payment Section */}
            <List.Section>
              <ListSubHeading>Payment</ListSubHeading>
              <ListItem
                title="Payment Account"
                left={(props) => <LucideCreditCard {...props} size={20} />}
                onPress={() => {
                  router.navigate("/account/payment-account");
                }}
              />
            </List.Section>

            <Divider />
          </>
        )}



        {/* Preferences Section */}
        <List.Section>
          <ListSubHeading>Preferences</ListSubHeading>
          <ListItem
            title="Theme"
            left={(props) => <PaletteIcon {...props} size={20} />}
            onPress={() => {
              toggleTheme();
            }}
            right={(props) => (
              <MaterialCommunityIcons
                name={isDark ? "brightness-3" : "brightness-7"}
                size={20}
                {...props}
                color={isDark ? Colors.dark.text : Colors.light.text}
              />
            )}
          />
        </List.Section>

        <Divider />

        {/* Legal Section */}
        <List.Section>
          <ListSubHeading>Legal</ListSubHeading>
          <ListItem
            title="Terms and Conditions"
            left={(props) => <Shield {...props} size={20} />}
            onPress={() => {
              router.push("/terms-and-conditions");
            }}
          />
          <ListItem
            title="Privacy Policy"
            left={(props) => <Globe {...props} size={20} />}
            onPress={() => {
              router.push("/privacy-policy");
            }}
          />
        </List.Section>

        <Divider />

        {/* Help & Support Section */}
        <List.Section>
          <ListSubHeading>Help & Support</ListSubHeading>
          <ListItem
            title="Support"
            left={(props) => <HelpCircle {...props} size={20} />}
            onPress={() => {
              router.push("/support");
            }}
          />
          <ListItem
            title="About Us"
            left={(props) => <Info {...props} size={20} />}
            onPress={() => {
              router.push("/about-us");
            }}
          />
          <ListItem
            title="Contact Us"
            left={(props) => <Mail {...props} size={20} />}
            onPress={() => {
              router.push("/contact-us");
            }}
          />
        </List.Section>
        {user?._id && (
          <>
            <Divider />
            <List.Section>
              <ListItem
                title="Logout"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={handleLogout}
              />
            </List.Section>
          </>
        )}
      </View>
    </Scafold>
  );
};
