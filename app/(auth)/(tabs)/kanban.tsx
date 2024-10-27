import {
  KanbanBoard,
  ColumnModel,
  CardModel,
} from "@intechnity/react-native-kanban-board";
import { useMemo, useState } from "react";

import { ColumnModal, RowModal } from "@/components";
import { useColumns } from "@/core/store/columns";
import { useRows } from "@/core/store/rows";
import { camelCase } from "@/lib";
import { kanbanStyles } from "@/styles";
import {
  SafeAreaView,
  View,
  FocusAwareStatusBar,
  Button,
  useModal,
} from "@/ui";

import type { KanbanColumn, KanbanRow } from "@/types";

const JobBoard = () => {
  const initialCard: KanbanRow = {
    title: "",
    subtitle: "",
    columnId: "",
    appliedDate: "",
    rejectedDate: "",
    notes: "",
    tags: [],
  };
  const initialColumn: KanbanColumn = {
    name: "",
  };

  const rowmodal = useModal();
  const columnmodal = useModal();
  const [modalType, setModalType] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(initialColumn);
  const [currentCard, setCurrentCard] = useState<KanbanRow>(initialCard);

  const newColumns = useColumns((state) => state.columns);
  const addColumns = useColumns((state) => state.addColumns);
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
            new ColumnModel(column.$id, camelCase(column.name), column),
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
              row,
              row.index,
            ),
        ),
    [newRows],
  );

  const addCard = async () => {
    await addRows([
      {
        title: currentCard.title,
        subtitle: currentCard.subtitle,
        columnId: currentCard.columnId,
        index:
          newColumns.find((column) => column.$id === currentCard.columnId)
            ?.kanbanRow?.length! + 1,
        appliedDate: currentCard.appliedDate,
        rejectedDate: currentCard.rejectedDate,
        notes: currentCard.notes,
        tags: currentCard.tags,
      },
    ]);
    handleRowModalClose();
  };

  const updateCard = async () => {};

  const deleteCard = async () => {};

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
    setCurrentCard((prev) => ({
      ...prev,
      title: card.title,
      subtitle: card.subtitle,
      columnId: card.columnId,
      appliedDate: card.item.appliedDate,
      rejectedDate: card.item.rejectedDate,
      notes: card.item.notes,
      tags: card.item.tags,
    }));
    setModalType(true);
    rowmodal.present();
  };

  const addColumn = async () => {
    await addColumns([{ name: currentColumn.name, index: columns.length + 1 }]);
  };

  const updateColumn = async () => {};

  const deleteColumn = async () => {};

  const handleRowModalClose = () => {
    rowmodal.dismiss();
    setCurrentCard(initialCard);
  };

  const handleColumnModalClose = () => {
    rowmodal.dismiss();
    setCurrentColumn(initialColumn);
  };

  return (
    <View className="w-full h-full">
      <FocusAwareStatusBar />

      <SafeAreaView className="w-full h-full items-center justify-center">
        <View className="mt-[30px] flex flex-row gap-x-2">
          <Button
            onPress={() => rowmodal.present()}
            label="Add card"
            className="border p-2 rounded-xl"
          />
          <Button
            onPress={() => columnmodal.present()}
            label="Add column"
            className="border p-2 rounded-xl"
          />
        </View>
        <View className="w-full h-full">
          <KanbanBoard
            columns={columns}
            cards={rows}
            onDragEnd={onCardDragEnd}
            onCardPress={onCardPress}
            style={kanbanStyles.kanbanStyle}
            columnHeaderContainerStyle={kanbanStyles.kanbanHeader}
            cardContainerStyle={kanbanStyles.kanbanCard}
          />
        </View>

        <ColumnModal
          modal={columnmodal}
          currentColumn={currentColumn}
          modalType={false}
          setCurrentColumn={setCurrentColumn}
          handleModalClose={handleColumnModalClose}
          addColumn={addColumn}
          updateColumn={updateColumn}
          deleteColumn={deleteColumn}
        />
        <RowModal
          modal={rowmodal}
          modalType={modalType}
          currentCard={currentCard}
          data={data}
          setCurrentCard={setCurrentCard}
          handleModalClose={handleRowModalClose}
          addCard={addCard}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      </SafeAreaView>
    </View>
  );
};

export default JobBoard;
