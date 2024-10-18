import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { ContentList } from "@/components/ContentList";
import CourseLayout from "@/components/CourseLayout";
import { LectureVideo } from "@/components/LectureVideo";
import { Loader } from "@/components/Loader";
import { useChapter } from "@/core/store/chapter";
import { useCourse } from "@/core/store/course";
import { useLecture } from "@/core/store/lecture";
import { useUser } from "@/core/store/user";

const LectureView = () => {
  const colorScheme = useColorScheme();
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
        userId: (user as any)?.userId,
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
        <Loader
          variant={"large"}
          color={colorScheme === "light" ? "black" : "white"}
        />
      )}
    </>
  );
};

export default LectureView;
