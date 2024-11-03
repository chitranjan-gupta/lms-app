import type { ImageSource } from "expo-image";
import type { AnimationObject } from "lottie-react-native";
import type { ReactNode } from "react";
import type {
  TextInputProps,
  TouchableOpacityProps,
  ImageSourcePropType,
} from "react-native";

declare interface Onboarding {
  id: number;
  animation?: AnimationObject;
  image?: ImageSourcePropType | ImageSource;
  title: string;
  description: string;
  descriptionColor: string;
  textColor: string;
  backgroundColor: string;
}

declare interface Verification {
  state: string;
  error: string;
  code: string;
}

declare interface SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

declare interface TokenType {
  access: string;
  refresh: string;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
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

declare interface TabBarProps {
  focused: boolean;
  name: string;
  color: string;
  icontype:
    | "fontawesome"
    | "ionicons"
    | "feather"
    | "materialicons"
    | "entypo"
    | "image";
  source?: ImageSourcePropType;
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

declare interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  website_url: string;
  logo_url?: string;
  description?: string;
  careers: Career[];
  $createdAt: string;
  $updatedAt: string;
}

declare enum CAREER_TYPE {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
  CONTRACT = "Contract",
  INTERNSHIP = "Internship",
  TEMPORARY = "Temporary",
}

declare enum SECTOR_TYPE {
  PUBLIC = "Public",
  PRIVATE = "Private",
}

declare enum WORK_MODE {
  FLEXIBLE = "Flexible",
  REMOTE = "Remote",
  ONSITE = "Onsite",
}

declare interface Career {
  id: string;
  title: string;
  location?: string;
  career_url: string;
  description?: string;
  department?: string;
  salary_range?: string;
  application_deadline?: string;
  career_type: CAREER_TYPE;
  sector_type: SECTOR_TYPE;
  work_mode: WORK_MODE;
  level: string;
  date_posted: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  skills?: string[];
  company: Company;
  $createdAt: string;
  $updatedAt: string;
}

declare interface Kanban_Column {
  id: string;
  name: string;
  position: number;
  kanbanRow: Kanban_Row[];
}

declare interface Kanban_Row {
  id: string;
  kanbanColumn: Kanban_Column;
  title: string;
  subtitle: string;
  position: number;
  appliedDate?: string;
  rejectedDate?: string;
  notes?: string;
  tags?: string[];
  career?: Career;
  kanbanColumnId: string;
}

declare interface KanbanRow
  extends Omit<Kanban_Row, "id" | "kanbanColumn" | "position"> {
  columnId: string;
}

declare interface KanbanColumn
  extends Omit<Kanban_Column, "id" | "kanbanRow" | "position"> {}
