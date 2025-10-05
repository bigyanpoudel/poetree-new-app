import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import React from "react";
import { View } from "react-native";

export const PrivacyPolicyScreen = () => {
  const TABLE = [
    "WHAT INFORMATION DO WE COLLECT?",
    "HOW DO WE USE YOUR INFORMATION?",
    "WILL YOUR INFORMATION BE SHARED WITH ANYONE?",
    "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    "HOW LONG DO WE KEEP YOUR INFORMATION?",
    "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    "WHAT ARE YOUR PRIVACY RIGHTS?",
    "CONTROLS FOR DO-NOT-TRACK FEATURES?",
    "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    "DO WE MAKE UPDATES TO THIS NOTICE?",
    "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    "HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?",
  ];

  return (
    <ScreenLayout
      appBar={{
        title: "Privacy Policy",
      }}
    >
     
        <View className="flex flex-col gap-6">
          <View>
            <Text className="text-2xl font-bold mb-4 dark:text-white">
              PRIVACY POLICY
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Last updated August 06, 2023
            </Text>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-base leading-6 dark:text-gray-300">
              <Text className="dark:text-white/60 text-gray-600">
                Thank you for choosing to be part of our community at Poetree, doing business as Jide Fortran{" "}
              </Text>
              (<Text className="dark:text-white/60 text-gray-600 font-bold">"Jide Fortran"</Text>, "we", "us", "our"). 
              We are committed to protecting your personal information and your right to privacy. If you have any questions or 
              concerns about this privacy notice, or our practices with regards to your personal information, please contact us at info@poetree.ca.
            </Text>
            
            <Text className="text-base leading-6 dark:text-gray-300">
              When you visit our website http://www.poetree.ca (the "Website"), and more generally, use any of our services 
              (the "Services", which include the Website), we appreciate that you are trusting us with your personal information. 
              We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible 
              what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read 
              through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, 
              please discontinue use of our Services immediately.
            </Text>
            
            <Text className="text-base leading-6 dark:text-gray-300">
              This privacy notice applies to all information collected through our Services (which, as described above, includes our Website), 
              as well as, any related services, sales, marketing or events.
            </Text>
            
            <Text className="text-base leading-6 dark:text-gray-300">
              Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.
            </Text>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              TABLE OF CONTENTS
            </Text>
            <View className="flex flex-col gap-2">
              {TABLE.map((item, index) => (
                <Text key={item} className="text-sm font-medium dark:text-gray-300">
                  {index + 1}. {item}
                </Text>
              ))}
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              1. WHAT INFORMATION DO WE COLLECT?
            </Text>
            <View className="flex flex-col gap-4 pl-4">
              <View>
                <Text className="text-base font-semibold mb-2 dark:text-white">
                  Personal information you disclose to us
                </Text>
                <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                  <Text className="font-bold">In Short:</Text> We collect personal information that you provide to us.
                </Text>
                <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                  We collect personal information that you voluntarily provide to us when you register on the Website, 
                  express an interest in obtaining information about us or our products and Services, when you participate 
                  in activities on the Website (such as by posting messages in our online forums or entering competitions, 
                  contests or giveaways) or otherwise when you contact us.
                </Text>
                <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                  The personal information that we collect depends on the context of your interactions with us and the Website, 
                  the choices you make, and the products and features you use. The personal information we collect may include the following:
                </Text>
                <View className="ml-4">
                  <Text className="text-base dark:text-gray-300">• Email addresses</Text>
                  <Text className="text-base dark:text-gray-300">• Usernames</Text>
                  <Text className="text-base dark:text-gray-300">• Passwords</Text>
                  <Text className="text-base dark:text-gray-300">• Other similar information</Text>
                </View>
                <Text className="text-base leading-6 dark:text-gray-300 mt-2">
                  All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to 
                  such personal information.
                </Text>
              </View>
              
              <View>
                <Text className="text-base font-semibold mb-2 dark:text-white">
                  Information automatically collected
                </Text>
                <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                  <Text className="font-bold">In Short:</Text> Some information — such as your Internet Protocol (IP) address and/or browser and 
                  device characteristics — is collected automatically when you visit our Website.
                </Text>
                <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                  We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal 
                  your specific identity (like your name or contact information) but may include device and usage information, such as your IP 
                  address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, 
                  location, information about how and when you use our Website, and other technical information.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              2. HOW DO WE USE YOUR INFORMATION?
            </Text>
            <View className="pl-4">
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                <Text className="font-bold">In Short:</Text> We process your information for purposes based on legitimate business interests, 
                the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                We use personal information collected via our Website for a variety of business purposes described below. We process your 
                personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a 
                contract with you, with your consent, and/or for compliance with our legal obligations.
              </Text>
              
              <Text className="text-base font-semibold mb-2 dark:text-white">
                We use the information we collect or receive:
              </Text>
              <View className="ml-4">
                <Text className="text-base dark:text-gray-300 mb-2">
                  • <Text className="font-semibold">To facilitate account creation and logon process:</Text> If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.
                </Text>
                <Text className="text-base dark:text-gray-300 mb-2">
                  • <Text className="font-semibold">To post testimonials:</Text> We post testimonials on our Website that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial.
                </Text>
                <Text className="text-base dark:text-gray-300 mb-2">
                  • <Text className="font-semibold">To manage user accounts:</Text> We may use your information for the purposes of managing our account and keeping it in working order.
                </Text>
                <Text className="text-base dark:text-gray-300 mb-2">
                  • <Text className="font-semibold">To protect our Services:</Text> We may use your information as part of our efforts to keep our Website safe and secure (for example, for fraud monitoring and prevention).
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
            </Text>
            <View className="pl-4">
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                <Text className="font-bold">In Short:</Text> We only share information with your consent, to comply with laws, to provide you 
                with services, to protect your rights, or to fulfill business obligations.
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations, and Vital Interests.
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </Text>
            <View className="pl-4">
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                <Text className="font-bold">In Short:</Text> We may use cookies and other tracking technologies to collect and store your information.
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information.
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              8. WHAT ARE YOUR PRIVACY RIGHTS?
            </Text>
            <View className="pl-4">
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                <Text className="font-bold">In Short:</Text> In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), 
                you have rights that allow you greater access to and control over your personal information.
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300">
                In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the 
                right to request access, request rectification or erasure, restrict processing, data portability, and object to processing.
              </Text>
            </View>
          </View>

          <View className="flex flex-col gap-4">
            <Text className="text-lg font-bold mb-2 dark:text-white">
              12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
            </Text>
            <View className="pl-4">
              <Text className="text-base leading-6 dark:text-gray-300 mb-2">
                If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO), 
                Jide Fasesin, by email at privacy@poetree.ca, by phone at 4164199718, or by post to:
              </Text>
              <Text className="text-base leading-6 dark:text-gray-300 mt-2">
                Poetree{"\n"}
                Jide Fasesin{"\n"}
                78 Bay hill{"\n"}
                Concord, Yukon L4K 1G9{"\n"}
                Canada
              </Text>
            </View>
          </View>
        </View>
    
    </ScreenLayout>
  );
};