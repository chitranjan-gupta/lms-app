import dayjs from "dayjs";
import { useColorScheme } from "nativewind";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import ReactNativeModal from "react-native-modal";
import DateTimePicker from "react-native-ui-datepicker";

import { snapPoints } from "@/constants";
import {
  Pressable,
  View,
  Text,
  Modal,
  type ModalReturn,
  Entypo,
  Feather,
  MaterialIcons,
  Octicons,
} from "@/ui";

import { CustomButton } from "./CustomButton";
import { InputBox } from "./InputBox";

import type { KanbanRow } from "@/types";

interface RowModalProps {
  modal: ModalReturn;
  modalType: boolean;
  currentCard: KanbanRow;
  data: {
    key: string;
    value: string;
  }[];
  setCurrentCard: Dispatch<SetStateAction<KanbanRow>>;
  handleModalClose: () => void;
  addCard: () => Promise<void>;
  updateCard: () => Promise<void>;
  deleteCard: () => Promise<void>;
}

export const RowModal = ({
  modal,
  modalType,
  currentCard,
  data,
  setCurrentCard,
  handleModalClose,
  addCard,
  updateCard,
  deleteCard,
}: RowModalProps) => {
  const { colorScheme } = useColorScheme();
  const [date, setDate] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [showColumn, setShowColumn] = useState(false);
  const [showDateTime, setShowDateTime] = useState(false);
  const [chooseDate, setChooseDate] = useState(false);
  const column = useMemo(
    () => data.find((col) => col.key === currentCard.columnId),
    [data, currentCard.columnId],
  );
  return (
    <View>
      <ReactNativeModal
        isVisible={showModal}
        onModalHide={() => setShowModal(false)}
      >
        <View className="rounded-xl p-5 bg-white dark:bg-white">
          <View className="flex flex-row justify-between items-center mb-5">
            <Text className="text-lg font-bold">Select Modal</Text>
            <Pressable onPress={() => setShowModal(false)}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          </View>
          {showDateTime && (
            <DateTimePicker
              mode="single"
              date={date}
              timePicker
              onChange={(params: any) => {
                setDate(params.date);
                if (chooseDate) {
                  setCurrentCard((prev) => ({
                    ...prev,
                    rejectedDate: params.date,
                  }));
                } else {
                  setCurrentCard((prev) => ({
                    ...prev,
                    appliedDate: params.date,
                  }));
                }
              }}
            />
          )}
          {showColumn && (
            <SelectList
              setSelected={(val: string) =>
                setCurrentCard((prev) => ({ ...prev, columnId: val }))
              }
              data={data}
              save="key"
              inputStyles={{
                color: colorScheme === "light" ? "black" : "white",
              }}
              dropdownTextStyles={{
                color: colorScheme === "light" ? "black" : "white",
              }}
            />
          )}
        </View>
      </ReactNativeModal>
      <Modal ref={modal.ref} snapPoints={snapPoints}>
        <View className="py-2 px-5 rounded-xl flex flex-col pb-10 bg-white dark:bg-black">
          <View className="flex flex-row justify-between items-center">
            <View>
              <Text className="text-xl font-bold">
                {!modalType ? "Add New Card" : "Update Card"}
              </Text>
            </View>
            <View>
              <Pressable onPress={handleModalClose}>
                <Entypo name="cross" size={24} color="black" />
              </Pressable>
            </View>
          </View>
          <View className="flex flex-col gap-y-1 pb-10">
            <View>
              <InputBox
                label="Title"
                placeholder="Enter the title"
                IconLeft={
                  <Feather
                    name="user"
                    size={24}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                }
                value={currentCard.title}
                onChangeText={(val) =>
                  setCurrentCard((prev) => ({ ...prev, title: val }))
                }
              />
            </View>
            <View>
              <InputBox
                label="Company"
                placeholder="Enter the company"
                IconLeft={
                  <Octicons
                    name="organization"
                    size={24}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                }
                value={currentCard.subtitle}
                onChangeText={(val) =>
                  setCurrentCard((prev) => ({ ...prev, subtitle: val }))
                }
              />
            </View>
            <View className="flex flex-col justify-between items-start">
              <Text className="text-lg font-bold">Column</Text>
              <Pressable
                onPress={() => {
                  setShowColumn(true);
                  setShowDateTime(false);
                  setShowModal(true);
                }}
                className="flex flex-row bg-gray-100 p-4 rounded-full w-full"
              >
                <Feather name="columns" size={24} color="black" />
                <Text className="font-bold text-base ml-4 !text-black">
                  {column ? column?.value : "Select Column"}
                </Text>
              </Pressable>
            </View>
            <View>
              <View className="w-full flex flex-col justify-between items-start">
                <Text className="text-lg font-bold">Applied Date</Text>
                <Pressable
                  onPress={() => {
                    setChooseDate(false);
                    setShowDateTime(true);
                    setShowColumn(false);
                    setShowModal(true);
                  }}
                  className="flex flex-row bg-gray-100 p-4 rounded-full w-full"
                >
                  <MaterialIcons name="date-range" size={24} color="black" />
                  <Text className="font-bold text-base ml-4 !text-black">
                    {currentCard?.appliedDate?.toString() || "Choose Date"}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View>
              <View className="w-full flex flex-col justify-between items-start">
                <Text className="text-lg font-bold">Rejected Date</Text>
                <Pressable
                  onPress={() => {
                    setChooseDate(true);
                    setShowDateTime(true);
                    setShowColumn(false);
                    setShowModal(true);
                  }}
                  className="flex flex-row bg-gray-100 p-4 rounded-full w-full"
                >
                  <MaterialIcons name="date-range" size={24} color="black" />
                  <Text className="font-bold text-base ml-4 !text-black">
                    {currentCard?.rejectedDate?.toString() || "Choose Date"}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className="pt-4">
              {!modalType ? (
                <View>
                  <CustomButton onPress={addCard} title="Add" />
                </View>
              ) : (
                <View className="flex flex-col gap-y-2">
                  <CustomButton onPress={updateCard} title="Update" />
                  <CustomButton onPress={deleteCard} title="Delete" />
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
