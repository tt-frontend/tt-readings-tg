import { FC, useCallback, useState } from "react";
import {
  ButtonsWrapper,
  Description,
  PageWrapper,
  Title,
  WindowWrapper,
} from "./AddPersonalNumberPage.styled";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FormItem } from "@/components/FormItem";
import { LinkInfoPanel } from "@/components/LinkInfoPanel";
import { Building } from "@/components/icons/Building";
import { useNavigate } from "react-router-dom";
import { AddPersonalNumberPageProps } from "./AddPersonalNumnerPage.types";

export const AddPersonalNumberPage: FC<AddPersonalNumberPageProps> = ({
  existingCities,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const next = useCallback(() => {
    setCurrentTab((prev) => prev + 1);
  }, [setCurrentTab]);

  const back = useCallback(() => {
    setCurrentTab((prev) => prev - 1);
  }, [setCurrentTab]);

  const navigate = useNavigate();

  return (
    <PageWrapper>
      {currentTab === 0 && (
        <WindowWrapper>
          <Title>Выберите город</Title>
          <Select
            value={selectedCity}
            placeholder="город"
            onChange={(value) => setSelectedCity(value)}
            allowClear
          >
            {existingCities?.map((city) => (
              <Select.Option value={city}>{city}</Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={next} disabled>
            Продолжить
          </Button>
        </WindowWrapper>
      )}
      {currentTab === 1 && (
        <WindowWrapper>
          <Title>Введите данные квартиры</Title>
          <FormItem label="Номер лицевого счета">
            <Input placeholder="000000000000" />
          </FormItem>
          <FormItem label="Фамилия собственника">
            <Input placeholder="000000000000" />
          </FormItem>
          <ButtonsWrapper>
            <Button type="primary" onClick={next}>
              Продолжить
            </Button>
            <Button type="primary" ghost onClick={back}>
              Вернуться назад
            </Button>
          </ButtonsWrapper>
        </WindowWrapper>
      )}
      {currentTab === 2 && (
        <WindowWrapper>
          <div>
            <Title>Мы нашли адрес!</Title>
            <Description>Пожалуйста, проверьте адрес квартиры.</Description>
          </div>
          <LinkInfoPanel
            icon={<Building />}
            title="Санкт-Петербург, улица Чайковского, дом 79, квартира 75"
          />
          <ButtonsWrapper>
            <Button type="primary" onClick={() => navigate("/")}>
              Все верно
            </Button>
            <Button type="primary" ghost onClick={back}>
              Вернуться назад
            </Button>
          </ButtonsWrapper>
        </WindowWrapper>
      )}
    </PageWrapper>
  );
};
