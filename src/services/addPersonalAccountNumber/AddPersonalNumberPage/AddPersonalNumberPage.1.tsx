import { FC, useCallback, useEffect, useState } from "react";
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
import { useFormik } from "formik";

export const AddPersonalNumberPage: FC<AddPersonalNumberPageProps> = ({
  existingCities,
  handleFindAccount,
  homeownerAccount,
  isLoading,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const { values, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      city: null as null | string,
      accountNumber: "",
      apartmentNumber: "",
    },
    onSubmit: (values) => {
      if (!values.city) return;

      handleFindAccount({
        City: values.city,
        AccountNumber: values.accountNumber,
        ApartmentNumber: values.apartmentNumber,
      });
    },
  });

  const next = useCallback(() => {
    setCurrentTab((prev) => prev + 1);
  }, [setCurrentTab]);

  const back = useCallback(() => {
    setCurrentTab((prev) => prev - 1);
  }, [setCurrentTab]);

  useEffect(() => {
    if (homeownerAccount) setCurrentTab(2);
  }, [homeownerAccount]);

  const navigate = useNavigate();

  return (
    <PageWrapper>
      {currentTab === 0 && (
        <WindowWrapper>
          <Title>Выберите город</Title>
          <Select
            value={values.city}
            placeholder="город"
            onChange={(value) => setFieldValue("city", value)}
            allowClear
          >
            {existingCities?.map((city) => (
              <Select.Option value={city}>{city}</Select.Option>
            ))}
          </Select>
          <Button type="primary" onClick={next} disabled={!values.city}>
            Продолжить
          </Button>
        </WindowWrapper>
      )}
      {currentTab === 1 && (
        <WindowWrapper>
          <Title>Введите данные квартиры</Title>
          <FormItem label="Номер лицевого счета">
            <Input
              placeholder="000000000000"
              value={values.accountNumber}
              onChange={handleChange}
              name="accountNumber"
            />
          </FormItem>
          <FormItem label="Номер квартиры">
            <Input
              value={values.apartmentNumber}
              onChange={handleChange}
              name="apartmentNumber"
            />
          </FormItem>
          <ButtonsWrapper>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              disabled={
                !values.accountNumber || !values.apartmentNumber || isLoading
              }
            >
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
            title={getAddressString} //"Санкт-Петербург, улица Чайковского, дом 79, квартира 75"
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
