import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { ContentList } from "@/components/ContentList";
import CourseLayout from "@/components/CourseLayout";
import { LectureVideo } from "@/components/LectureVideo";
import { useChapter } from "@/core/store/chapter";
import { useCourse } from "@/core/store/course";
import { useLecture } from "@/core/store/lecture";
import { useUser } from "@/core/store/user";

const LectureView = () => {
  const user = useUser((state) => state.user);
  const courseid = useCourse((state) => state.courseid);
  const chapterid = useChapter((state) => state.chapterid);
  const status = useLecture((state) => state.status);
  const lectureid = useLecture((state) => state.lectureid);
  const lecture = useLecture((state) => state.lecture);
  const getLecture = useLecture((state) => state.getLecture);
  useEffect(() => {
    if (courseid && chapterid && lectureid) {
      getLecture({
        lectureId: lectureid,
        chapterId: chapterid,
        courseId: courseid,
        purchase: true,
        userId: user?.userId,
      });
    }
  }, [lectureid, chapterid, courseid, user, getLecture]);

  return (
    <>
      {status !== "pending" && lecture ? (
        <CourseLayout>
          <ContentList
            ListHeaderComponent={
              <LectureVideo playbackId={lecture.muxData?.playbackId!} />
            }
            onPress={"LectureDetail"}
          />
        </CourseLayout>
      ) : (
        <View className="w-full h-full flex flex-row justify-center items-center bg-white">
          <ActivityIndicator size={"large"} />
        </View>
      )}
    </>
  );
};

export default LectureView;
