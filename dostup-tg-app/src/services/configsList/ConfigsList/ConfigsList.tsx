import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  ExpiredAt,
  FolderSc,
  LogoImage,
  NoConfigsWrapper,
  QRImage,
} from "./ConfigsList.styled";
import { ConfigsListTypes } from "./ConfigsList.types";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Skeleton,
} from "@nextui-org/react";
import dayjs from "dayjs";
import { Download, QrCode } from "react-bootstrap-icons";
import { api } from "@/api";
import { ConfigResponse } from "@/api/types";
import vkQr from "@vkontakte/vk-qr";
import dostupIcon from "./dostupLogo.png";

export const ConfigsList: FC<ConfigsListTypes> = ({ isLoading, configs }) => {
  const [dataString, setDataString] = useState<{
    config: ConfigResponse;
    str: string;
  } | null>(null);

  useEffect(() => {
    if (dataString) {
      Telegram.WebApp.expand();
    }
  }, [dataString]);

  const fetchConfigData = useCallback(async (config: ConfigResponse) => {
    const telegramId = Telegram.WebApp.initDataUnsafe.user?.id;

    if (!telegramId || !config.publicKey) return;

    const { data } = await api.configConfigStringDetail(telegramId, {
      publicKey: config.publicKey,
    });

    setDataString({ str: data, config });
  }, []);

  const downloadConfig = useCallback(async (config: ConfigResponse) => {
    const telegramId = Telegram.WebApp.initDataUnsafe.user?.id;

    if (!telegramId || !config.publicKey) return;

    await api.configDownloadDetail(telegramId, { publicKey: config.publicKey });

    Telegram.WebApp.HapticFeedback.notificationOccurred("success");
    Telegram.WebApp.close();
  }, []);

  const qrCodeSvg = useMemo(() => {
    if (!dataString) return;

    const qrSvg = vkQr.createQR(dataString.str, {
      qrSize: 256,
      isShowLogo: true,
      logoData: "423432",
      ecc: 0,
    });

    const base64data = btoa(unescape(encodeURIComponent(qrSvg)));

    return `data:image/svg+xml;base64,${base64data}`;
  }, [dataString]);

  if (isLoading) {
    return (
      <Card className="w-[100%] space-y-5 p-4" radius="md">
        <Skeleton className="rounded-lg">
          <div className="h-12 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={false}>
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }

  if (!configs?.length) {
    return (
      <NoConfigsWrapper>
        <FolderSc />У вас пока нет доступов
      </NoConfigsWrapper>
    );
  }

  return (
    <>
      {dataString && qrCodeSvg && (
        <Modal
          isOpen
          onClose={() => setDataString(null)}
          backdrop="opaque"
          size="sm"
          style={{ transform: "translateY(-12px)" }}
        >
          <ModalContent>
            <ModalHeader>{dataString.config.name}</ModalHeader>
            <ModalBody style={{ position: "relative" }}>
              <QRImage src={qrCodeSvg} />
              <LogoImage src={dostupIcon} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      {configs.map((elem) => (
        <Card className="w-[100%]" radius="lg" key={elem.id}>
          <CardHeader className="flex justify-between">
            <div className="font-medium">{elem.name}</div>
            <ExpiredAt>
              осталось {dayjs(elem.expiresAt).diff(dayjs(), "day")} дней
            </ExpiredAt>
          </CardHeader>
          <CardBody className="p-2 flex-col">
            <ButtonGroup>
              <Button
                onClick={() => elem.id && downloadConfig(elem)}
                fullWidth
                color="primary"
                startContent={<Download />}
              >
                Скачать
              </Button>
              <Button
                fullWidth
                color="secondary"
                startContent={<QrCode />}
                onClick={() => fetchConfigData(elem)}
              >
                QR
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      ))}
    </>
  );
};
