import { ScreenLayout } from "@/src/components/layout";
import { Text } from "@/src/components/text";
import React from "react";
import { View } from "react-native";

export const ChildSafetyPolicyScreen = () => {
  return (
    <ScreenLayout
      appBar={{
        title: "Child Safety & Community Guidelines",
      }}
    >
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Poetree Child Safety & Community Guidelines
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Last Updated: December 8, 2025
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Effective Date: December 8, 2025
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
            At Poetree Inc ("Poetree," "we," "us," or "our"), the safety and
            well-being of our community members, especially children and minors,
            is our highest priority. These Community Guidelines establish our
            commitment to maintaining a safe, respectful, and lawful platform for
            all users of the Poetree mobile application (available at
            com.poetree.ca on Google Play).
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            1. Zero Tolerance for Child Sexual Abuse and Exploitation (CSAE)
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            Poetree strictly prohibits and has zero tolerance for any content,
            activity, or behavior related to Child Sexual Abuse and Exploitation
            (CSAE), including but not limited to:
          </Text>
          <View className="ml-4 mb-3">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Child Sexual Abuse Material (CSAM): Any content that depicts,
              promotes, or solicits sexual activity involving minors (individuals
              under 18 years of age)
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Grooming: Any attempt to build an emotional connection with a minor
              to gain trust for the purposes of sexual abuse or exploitation
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Sexual solicitation of minors: Any content or communication that
              sexually solicits, requests, or coerces minors
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Sexualization of minors: Content that depicts, encourages, or
              promotes the sexualization of minors
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Trafficking or exploitation: Content that promotes, solicits, or
              facilitates the trafficking or exploitation of children
            </Text>
          </View>
          <Text className="text-base font-semibold text-gray-900 dark:text-white leading-6 mb-2">
            Any violation of this policy will result in:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Immediate removal of the content
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Immediate and permanent account termination
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Report to the National Center for Missing &amp; Exploited Children
              (NCMEC) and appropriate law enforcement authorities
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            2. Our Commitment to CSAM Detection and Reporting
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            Poetree is committed to preventing and addressing Child Sexual Abuse
            Material (CSAM) on our platform through the following measures:
          </Text>
          <View className="ml-4 mb-3">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">User Reporting System:</Text> We
              provide an in-app reporting mechanism that allows users to report
              content or users that violate our policies, including content related
              to child safety
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">Content Review:</Text> All reported
              content is reviewed by our trust and safety team
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">Law Enforcement Cooperation:</Text> We
              cooperate fully with law enforcement agencies and regulatory
              authorities in investigating CSAE and CSAM
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">NCMEC Reporting:</Text> We report
              known or suspected CSAM to the National Center for Missing &amp;
              Exploited Children (NCMEC) as required by law
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">Continuous Monitoring:</Text> We
              continuously monitor and improve our detection and response
              capabilities
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            3. How to Report Child Safety Concerns
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            If you encounter content or behavior on Poetree that violates child
            safety policies, you can report it through the following methods:
          </Text>
          <View className="ml-4 mb-3">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">In-App Reporting:</Text> Use the
              "Report" button available on user profiles and content (poems,
              playlists) to flag inappropriate content or behavior. Select the
              appropriate category such as "Inappropriate Content" or "Harassment"
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">Child Safety Contact:</Text> For
              urgent child safety concerns, contact us at:{"\n"}
              Email: info@poetree.ca{"\n"}
              Privacy & Safety: privacy@poetree.ca
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • <Text className="font-semibold">Emergency Situations:</Text> If you
              believe a child is in immediate danger, please contact local law
              enforcement authorities or emergency services immediately
            </Text>
          </View>
          <Text className="text-base font-semibold text-gray-900 dark:text-white leading-6 mb-2">
            What to Include in Your Report:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Username or profile link of the reported user
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Link to or description of the specific content
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Detailed description of the violation
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Any additional context that may be helpful
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            4. Additional Community Guidelines
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            To maintain a safe and respectful community, Poetree also prohibits:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Harassment, bullying, or threats of violence
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Hate speech or discrimination based on race, ethnicity, religion,
              gender, sexual orientation, disability, or other protected
              characteristics
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Impersonation or fake accounts
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Spam, scams, or fraudulent activity
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Graphic violence or gore
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Adult nudity or sexual content (outside of CSAE, which has zero
              tolerance)
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Illegal activities or promotion of dangerous behavior
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            5. Legal Compliance
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            Poetree complies with all applicable child safety laws and regulations,
            including but not limited to:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Children's Online Privacy Protection Act (COPPA)
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • 18 U.S.C. § 2258A (CSAM reporting requirements)
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Canadian laws regarding child protection and online safety
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Google Play Child Safety Standards Policy
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • All applicable international child protection laws
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            6. Enforcement and Consequences
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            Violation of these Community Guidelines may result in:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Content removal
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Warning or strike on your account
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Temporary or permanent account suspension
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Report to law enforcement authorities
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Legal action as appropriate
            </Text>
          </View>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            7. Updates to These Guidelines
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
            We may update these Community Guidelines from time to time to reflect
            changes in our practices, legal requirements, or community needs. We
            will notify users of any material changes through the app or via email.
            Your continued use of Poetree after such changes constitutes acceptance
            of the updated guidelines.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            8. Contact Information
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-2">
            <Text className="font-semibold">Poetree Inc</Text>
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
            78 Bay hill, Concord, Yukon L4K 1G9, Canada
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-3">
            Phone: +1 (416) 419-9718
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
            <Text className="font-semibold">General Support & Child Safety:</Text> info@poetree.ca
          </Text>
          <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
            <Text className="font-semibold">Privacy, Data Protection & Safety:</Text>{" "}
            privacy@poetree.ca
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-base font-semibold text-gray-900 dark:text-white leading-6 mb-3">
            Additional Resources:
          </Text>
          <View className="ml-4">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • National Center for Missing &amp; Exploited Children (NCMEC):
              CyberTipline.org
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Canadian Centre for Child Protection: Cybertip.ca
            </Text>
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              • Internet Watch Foundation: iwf.org.uk
            </Text>
          </View>
        </View>

        <View className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Text className="text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Thank You for Helping Keep Poetree Safe
          </Text>
          <Text className="text-sm text-blue-800 dark:text-blue-200">
            Our community's safety depends on all of us working together. If you
            see something concerning, please report it immediately. Together, we can
            maintain Poetree as a safe, creative space for poets around the world.
          </Text>
        </View>
    </ScreenLayout>
  );
};
