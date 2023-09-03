import { useCallback, useEffect, useState } from "react";
import { ConfigsList } from "./ConfigsList";
import { ConfigResponse } from "@/api/types";
import { api } from "@/api";

export const ConfigsListContainer = () => {
  const [configs, setConfigs] = useState<ConfigResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConfigs = useCallback(async () => {
    const telegramId = Telegram.WebApp.initDataUnsafe.user?.id;

    if (!telegramId) return;

    setIsLoading(true);

    const { data: confings } = await api.configGetForUserDetail(telegramId, {});

    setIsLoading(false);

    setConfigs(confings);
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  return <ConfigsList isLoading={isLoading} configs={configs} />;
};
