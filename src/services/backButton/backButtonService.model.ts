import { Modal } from "antd";
import { createEvent, createStore, sample } from "effector";

const unregister = createEvent();
const registerMessage = createEvent<string>();
const handleBack = createEvent();
const goBack = createEvent();

const $confirmMessage = createStore<string | null>("Показания не сохранены!")
  .on(registerMessage, (_, message) => message)
  .reset(unregister);

sample({
  source: $confirmMessage,
  clock: handleBack,
  fn: (message) => {
    if (!message) return goBack();

    Modal.confirm({
      title: "Вы хотите покинуть страничку?",
      content: message,
      okText: "Да",
      cancelText: "Отмена",
      onOk: () => {
        goBack();
      },
      centered: true,
    });
  },
});

export const backButtonService = {
  inputs: { registerMessage, unregister, handleBack, goBack },
  outputs: { $confirmMessage },
};
