import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress: form.email,
      password: form.password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            // Handle pending session tasks
            // See https://clerk.com/docs/guides/development/custom-flows/authentication/session-tasks
            console.log(session?.currentTask);
            return;
          }
          router.push("/");
          // const url = decorateUrl("/");
          // if (url.startsWith("http")) {
          //   window.location.href = url;
          // } else {
          //   router.push(url);
          // }
        },
      });
    } else if (signIn.status === "needs_second_factor") {
      // See https://clerk.com/docs/guides/development/custom-flows/authentication/multi-factor-authentication
    } else if (signIn.status === "needs_client_trust") {
      // For other second factor strategies,
      // see https://clerk.com/docs/guides/development/custom-flows/authentication/client-trust
      const emailCodeFactor = signIn.supportedSecondFactors.find(
        (factor) => factor.strategy === "email_code",
      );

      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
      }
    } else {
      // Check why the sign-in is not complete
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[240px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry
          />
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/(auth)/sign-up"
            className="text-lg text-general-200 text-center mt-10"
          >
            <Text>Don&apos;t have an Account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
