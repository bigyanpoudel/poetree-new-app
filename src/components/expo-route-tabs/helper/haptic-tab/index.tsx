import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
/**
 * Custom tab bar button component that provides haptic feedback on iOS devices when pressed.
 *
 * This component wraps the default tab bar button and adds a subtle, light vibration feedback
 * on iOS when the user interacts with it. The feedback enhances the user experience by providing
 * tactile confirmation of the interaction. The component also ensures that any existing behavior
 * of the tab button's `onPressIn` event is preserved.
 *
 * @param {BottomTabBarButtonProps} props - The properties passed down to the bottom tab bar button.
 *
 * @returns {JSX.Element} A custom tab bar button with haptic feedback functionality for iOS.
 */
export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
