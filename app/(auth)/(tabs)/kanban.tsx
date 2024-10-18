import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import {
  KanbanBoard,
  ColumnModel,
  CardModel,
} from "@intechnity/react-native-kanban-board";
import { useMemo, useState } from "react";
import { Alert, Button, useColorScheme } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ReactNativeModal } from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColumns } from "@/core/store/columns";
import { useRows } from "@/core/store/rows";
import { camelCase } from "@/lib";
import { kanbanStyles } from "@/styles";

const JobBoard = () => {
  const colorScheme = useColorScheme();

  const [currentCard, setCurrentCard] = useState({
    title: "",
    subtitle: "",
    columnId: "",
  });

  const [showModal, setShowModal] = useState(false);

  const newColumns = useColumns((state) => state.columns);
  const newRows = useRows((state) => state.rows);
  const addRows = useRows((state) => state.addRows);
  const updateRows = useRows((state) => state.updateRows);

  const data = useMemo(
    () =>
      newColumns.map((column) => {
        return { key: column.$id, value: column.name };
      }),
    [newColumns],
  );

  const columns = useMemo<ColumnModel[]>(
    () =>
      newColumns
        .sort((a, b) => a.index - b.index)
        .map(
          (column) =>
            new ColumnModel(column.$id, camelCase(column.name), column.index),
        ),
    [newColumns],
  );

  const rows = useMemo<CardModel[]>(
    () =>
      newRows
        .sort((a, b) => a.index - b.index)
        .map(
          (row) =>
            new CardModel(
              row.$id,
              row.kanbanColumn.$id,
              row.title,
              row.subtitle,
              "",
              [],
              null,
              row.index,
            ),
        ),
    [newRows],
  );

  const addNewCard = async () => {
    await addRows([
      {
        title: currentCard.title,
        subtitle: currentCard.subtitle,
        columnId: currentCard.columnId,
        index:
          newColumns.find((column) => column.$id === currentCard.columnId)
            ?.kanbanRow?.length! + 1,
      },
    ]);
    setShowModal(false);
  };

  const onCardDragEnd = async (
    srcColumn: ColumnModel,
    destColumn: ColumnModel,
    item: CardModel,
    cardIdx: number,
  ) => {
    const updatedRows = [...newRows];

    // Find the index of the moved card and remove it from the source column
    const itemIndex = updatedRows.findIndex((card) => card.$id === item.id);
    const [movedCard] = updatedRows.splice(itemIndex, 1);

    // Update the moved card's column
    movedCard.kanbanColumn.$id = destColumn.id;
    // Set the index for the moved card based on its new position
    movedCard.index = cardIdx + 1; // Set the index based on the new position

    // Insert the moved card into the new position
    updatedRows.splice(cardIdx, 0, movedCard);

    // Check if dragging within the same column
    if (srcColumn.id === destColumn.id) {
      // Update indices for all cards in the same column
      let start = 0;
      const affectedCards = updatedRows.reduce<typeof updatedRows>(
        (acc, card) => {
          if (card.kanbanColumn.$id === srcColumn.id) {
            if (card.$id !== movedCard.$id) {
              // Push the card with the updated index only if it's not the moved card
              acc.push({
                ...card,
                index: movedCard.index !== start + 1 ? start + 1 : start + 2,
              }); // Sequentially update indices starting from 1
              start++; // Increment start only when pushing an updated card
            } else {
              acc.push({ ...card }); // Push the moved card without changing its index
            }
          }
          return acc;
        },
        [],
      );

      // const affectedCards = updatedRows.filter(
      //   (card) => card.kanbanColumn.$id === srcColumn.id
      // );
      // affectedCards.forEach((card, index) => {
      //   if (card.$id !== movedCard.$id) {
      //     card.index = index + 1;
      //   }
      // });

      // Update the rows state with the new configuration
      await updateRows(affectedCards);
    } else {
      // Update indices for the source column
      const sourceColumnCards = updatedRows.reduce<typeof updatedRows>(
        (acc, card) => {
          if (card.kanbanColumn.$id === srcColumn.id) {
            acc.push({ ...card, index: acc.length + 1 }); // Sequentially update indices starting from 1
          }
          return acc;
        },
        [],
      );

      // const sourceColumnCards = updatedRows.filter(
      //   (card) => card.kanbanColumn.$id === srcColumn.id
      // );
      // sourceColumnCards.forEach((card, index) => {
      //   card.index = index + 1;
      // });

      let start = 0;
      const destColumnCards = updatedRows.reduce<typeof updatedRows>(
        (acc, card) => {
          if (card.kanbanColumn.$id === destColumn.id) {
            if (card.$id !== movedCard.$id) {
              acc.push({
                ...card,
                index: movedCard.index !== start + 1 ? start + 1 : start + 2,
              }); // Adjust for cards already in the destination
              start++; // Increment start only when pushing an updated card
            } else {
              acc.push({ ...card }); // Push the moved card without changing its index
            }
          }
          return acc;
        },
        [],
      );

      // const destColumnCards = updatedRows.filter(
      //   (card) => card.kanbanColumn.$id === destColumn.id
      // );
      // destColumnCards.forEach((card, index) => {
      //   card.index = index + sourceColumnCards.length + 1;
      // });

      // Update the rows state with the new configuration
      await updateRows([...sourceColumnCards, ...destColumnCards]);
    }
  };

  const onCardPress = (card: CardModel) => {
    Alert.alert(`Card '$r{card.title}' pressed`);
  };

  return (
    <ThemedView className="w-full h-full" lightColor="white" darkColor="black">
      <SafeAreaView className="flex-[1] items-center justify-center">
        <ThemedView
          className="mt-[20px]"
          lightColor="transparent"
          darkColor="transparent"
        >
          <Button onPress={() => setShowModal(true)} title="Add new card" />
        </ThemedView>

        <KanbanBoard
          columns={columns}
          cards={rows}
          onDragEnd={onCardDragEnd}
          onCardPress={onCardPress}
          style={kanbanStyles.kanbanStyle}
          columnHeaderContainerStyle={kanbanStyles.kanbanHeader}
          cardContainerStyle={kanbanStyles.kanbanCard}
        />

        <ReactNativeModal
          isVisible={showModal}
          onModalHide={() => {
            setShowModal(false);
          }}
        >
          <ThemedView
            className="py-2 px-5 rounded-xl flex flex-col"
            lightColor="white"
            darkColor="black"
          >
            <ThemedText className="text-xl font-bold">Add New Card</ThemedText>
            <ThemedView
              className="flex flex-col gap-y-1"
              lightColor="transparent"
              darkColor="transparent"
            >
              <ThemedView lightColor="transparent" darkColor="transparent">
                <InputField
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
              </ThemedView>
              <ThemedView lightColor="transparent" darkColor="transparent">
                <InputField
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
              </ThemedView>
              <ThemedText className="text-black">Choose the column</ThemedText>
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
              <CustomButton onPress={addNewCard} title="Add" />
            </ThemedView>
          </ThemedView>
        </ReactNativeModal>
      </SafeAreaView>
    </ThemedView>
  );
};

export default JobBoard;
