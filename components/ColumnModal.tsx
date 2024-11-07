import { useColorScheme } from "nativewind";
import { useState, type Dispatch, type SetStateAction } from "react";
import ReactNativeModal from "react-native-modal";

import { snapPoints } from "@/constants";
import {
  Pressable,
  View,
  Text,
  Modal,
  type ModalReturn,
  Entypo,
  Feather,
  ScrollView,
} from "@/ui";

import { CustomButton } from "./CustomButton";
import { InputBox } from "./InputBox";

import type { KanbanColumn } from "@/types";

interface ColumnModalProps {
  modal: ModalReturn;
  modalType: boolean;
  currentColumn: KanbanColumn;
  setCurrentColumn: Dispatch<SetStateAction<KanbanColumn>>;
  handleColumnModalClose: () => void;
  addColumn: () => Promise<void>;
  updateColumn: () => Promise<void>;
  deleteColumn: () => Promise<void>;
}

export const ColumnModal = ({
  modal,
  modalType,
  currentColumn,
  setCurrentColumn,
  handleColumnModalClose,
  addColumn,
  updateColumn,
  deleteColumn,
}: ColumnModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const { colorScheme } = useColorScheme();
  return (
    <View>
      <ReactNativeModal
        isVisible={showModal}
        onModalHide={() => setShowModal(false)}
      >
        <View className="rounded-xl p-5">
          <View className="flex flex-row justify-between items-center mb-5">
            <Text className="text-lg font-bold">Select Modal</Text>
            <Pressable onPress={() => setShowModal(false)}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </ReactNativeModal>
      <Modal
        ref={modal.ref}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <ScrollView className="py-2 px-5 rounded-xl flex flex-col pb-10 bg-white dark:bg-black w-full h-full">
          <View className="flex flex-row justify-start items-center gap-x-5">
            <View className="bg-gray-200 rounded-full">
              <Pressable onPress={handleColumnModalClose}>
                <Entypo name="cross" size={24} color={"black"} />
              </Pressable>
            </View>
            <View>
              <Text className="text-xl font-bold">
                {!modalType ? "Add New Column" : "Update Column"}
              </Text>
            </View>
          </View>
          <View className="flex flex-col gap-y-1 pb-10">
            <View>
              <InputBox
                label="Name"
                placeholder="Enter the name"
                IconLeft={
                  <Feather
                    name="user"
                    size={24}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                }
                defaultValue={currentColumn.name}
                onChangeText={(val) =>
                  setCurrentColumn((prev) => ({ ...prev, name: val }))
                }
              />
            </View>
            <View className="pt-4">
              {!modalType ? (
                <View>
                  <CustomButton onPress={addColumn} title="Add" />
                </View>
              ) : (
                <View className="flex flex-col gap-y-2">
                  <CustomButton onPress={updateColumn} title="Update" />
                  <CustomButton onPress={deleteColumn} title="Delete" />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
