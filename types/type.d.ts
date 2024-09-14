import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface TokenType {
  access: string;
  refresh: string;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  isLoading?: boolean;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  IconLeft?: any;
  IconRight?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

declare interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  courses: Course[];
  refresh_token?: string;
  created_at: string;
  updated_at: string;
}

declare interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  categoryId?: string;
  category: Category;
  chapters: Chapter[];
  attachments: CourseAttachment[];
  purchases: Purchase[];
  userId: string;
  User: User;
  created_at: string;
  update_at: string;
}

declare interface Category {
  id: string;
  name: string;
  courses: Course[];
}

declare interface CourseAttachment {
  id: string;
  name: string;
  url: string;
  courseId: string;
  course: Course;
  created_at: string;
  updated_at: string;
}

declare interface Chapter {
  id: string;
  title: string;
  description?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  courseId: string;
  course: Course;
  userProgress: ChapterProgress[];
  lectures: Lecture[];
  attachments: ChapterAttachment[];
  duration: number;
  created_at: string;
  updated_at: string;
}

declare interface ChapterAttachment {
  id: string;
  name: string;
  url: string;
  chapterId: string;
  chapter: Chapter;
  created_at: string;
  updated_at: string;
}

declare interface Lecture {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: MuxData;
  userProgress: LectureProgress[];
  attachments: LectureAttachment[];
  duration: number;
  courseId: string;
  chapterId: string;
  chapter: Chapter;
  created_at: string;
  updated_at: string;
}

declare interface LectureAttachment {
  id: string;
  name: string;
  url: string;
  lectureId: string;
  lecture: Lecture;
  created_at: string;
  updated_at: string;
}

declare interface MuxData {
  id: string;
  assetId: string;
  playbackId?: string;
  lectureId?: string;
  lecture: Lecture;
}

declare interface ChapterProgress {
  id: string;
  userId: string;
  chapterId: string;
  chapter: Chapter;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
}

declare interface LectureProgress {
  id: string;
  userId: string;
  lectureId: string;
  lecture: Lecture;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
}

declare interface Purchase {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  created_at: string;
  updated_at: string;
}

declare interface StripeCustomer {
  id: string;
  userId: string;
  stripeCustomerId: string;
  created_at: string;
  updated_at: string;
}
