// import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Categories } from "@/components/Categories";
import { Courses, RecentCourses } from "@/components/Courses";
import { icons } from "@/constants";
import { useAuth, signOut } from "@/core/auth";
import { useCategories } from "@/core/store/categories";
import { useCourses } from "@/core/store/courses";
import { removeUser } from "@/core/store/user";

const Home = () => {
  const isloading = useAuth((state) => state.isloading);
  const loading = useCourses((state) => state.status);
  const courses = useCourses((state) => state.courses);
  const getCourses = useCourses((state) => state.getCourses);
  const isPending = useCategories((state) => state.status);
  const categories = useCategories((state) => state.categories);
  const getCategories = useCategories((state) => state.getCategories);

  useEffect(() => {
    getCourses();
    getCategories();
  }, [getCategories, getCourses]);

  const handleSignOut = async () => {
    removeUser();
    await signOut();
  };

  return (
    <View className="bg-white w-full h-full">
      {loading === "pending" && isPending === "pending" ? (
        <View className="w-full h-full flex flex-row justify-center items-center">
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      ) : (
        <SafeAreaView className="bg-white w-full h-full ">
          <View className="w-full px-5">
            <View className="w-full flex flex-row items-center justify-between my-5">
              <Text className="text-3xl font-extrabold">Welcome 👋</Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
                disabled={isloading}
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>
          </View>
          <Courses courses={courses} loading={loading} />
          <View className="w-full px-5 flex flex-row items-center justify-between">
            <Text className="text-3xl font-bold mt-3 mb-3">Categories</Text>
          </View>
          <Categories categories={categories} loading={isPending} />
          <View className="w-full flex flex-row mx-5">
            <Text className="text-3xl font-bold mt-5 mb-3">Recent Courses</Text>
          </View>
          <RecentCourses courses={courses} loading={loading} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;
