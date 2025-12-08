import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import React from "react";
import { View } from "react-native";

export const TermsAndConditionsScreen = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Terms and Conditions",
      }}
    >
     
        <View className="flex flex-col gap-6">
          <View>
            <Text className="text-2xl font-bold mb-4 dark:text-white">
              Website Terms and Conditions of Use
            </Text>
          </View>

          <View className="flex flex-col gap-6">
            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                1. Terms
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                By accessing this Website, accessible from https://www.poetree.ca, you are agreeing to be bound by these 
                Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. 
                If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this 
                Website are protected by copyright and trade mark law.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                2. Use License
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Permission is granted to temporarily download one copy of the materials on Poetree Inc's Website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this 
                license you may not:
              </Text>
              <View className="ml-4">
                <Text className="text-base dark:text-gray-300">• modify or copy the materials;</Text>
                <Text className="text-base dark:text-gray-300">• use the materials for any commercial purpose or for any public display;</Text>
                <Text className="text-base dark:text-gray-300">• attempt to reverse engineer any software contained on Poetree Inc's Website;</Text>
                <Text className="text-base dark:text-gray-300">• remove any copyright or other proprietary notations from the materials; or</Text>
                <Text className="text-base dark:text-gray-300">• transferring the materials to another person or "mirror" the materials on any other server.</Text>
              </View>
              <Text className="text-base leading-6 dark:text-gray-300">
                This will let Poetree Inc to terminate upon violations of any of these restrictions. Upon termination, your viewing right will 
                also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                3. Disclaimer
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                All the materials on Poetree Inc's Website are provided "as is". Poetree Inc makes no warranties, may it be expressed or implied, 
                therefore negates all other warranties. Furthermore, Poetree Inc does not make any representations concerning the accuracy or 
                reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                4. Limitations
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Poetree Inc or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the 
                materials on Poetree Inc's Website, even if Poetree Inc or an authorize representative of this Website has been notified, 
                orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or 
                limitations of liability for incidental damages, these limitations may not apply to you.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                5. Revisions and Errata
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                The materials appearing on Poetree Inc's Website may include technical, typographical, or photographic errors. Poetree Inc 
                will not promise that any of the materials in this Website are accurate, complete, or current. Poetree Inc may change the 
                materials contained on its Website at any time without notice. Poetree Inc does not make any commitment to update the materials.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                6. Links
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Poetree Inc has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such 
                linked site. The presence of any link does not imply endorsement by Poetree Inc of the site. The use of any linked website 
                is at the user's own risk.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                7. Site Terms of Use Modifications
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Poetree Inc may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are 
                agreeing to be bound by the current version of these Terms and Conditions of Use.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                8. Your Privacy
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Please read our Privacy Policy.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                8a. Child Safety and Community Guidelines
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Poetree Inc is committed to maintaining a safe environment for all users. We have zero tolerance for Child Sexual Abuse
                and Exploitation (CSAE) and Child Sexual Abuse Material (CSAM). By using our platform, you agree to comply with our
                Child Safety & Community Guidelines, which explicitly prohibit any content or behavior related to CSAE, CSAM, grooming,
                or exploitation of minors. Violations will result in immediate account termination and reporting to law enforcement authorities.
                Please review our complete Child Safety & Community Guidelines for detailed information.
              </Text>
            </View>

            <View className="flex flex-col gap-3">
              <Text className="text-lg font-bold dark:text-white">
                9. Governing Law
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                Any claim related to Poetree Inc's Website shall be governed by the laws of ca without regards to its conflict of law provisions.
              </Text>
            </View>
          </View>
        </View>
     
    </ScreenLayout>
  );
};