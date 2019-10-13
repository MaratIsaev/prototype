import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { IntlProvider, load } from "@progress/kendo-react-intl";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Input, NumericTextBox } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";

import ruCaGregorian from "cldr-dates-full/main/ru/ca-gregorian.json";
import ruDateFields from "cldr-dates-full/main/ru/dateFields.json";

load(ruCaGregorian, ruDateFields);

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Кол-во символов: 2 - 32!")
    .max(32, "Кол-во символов: 2 - 32!")
    .required("Обязательно"),
  cash: Yup.number().required("Обязательно"),
  date: Yup.string().required("Обязательно")
});

const DialogForm = props => {
  const {
    dialogMode,
    cancelClick,
    editedCustomer,
    newCustomer,
    updateClick,
    addClick
  } = props;

  const buffer = dialogMode === "new" ? newCustomer : editedCustomer;

  const saveClick = dialogMode === "new" ? addClick : updateClick;

  return (
    <Formik
      initialValues={buffer}
      isInitialValid={dialogMode === "edit"}
      validationSchema={ValidationSchema}
      validateOnBlur={true}
    >
      {({ errors, values, touched, isValid, handleBlur, handleChange }) => (
        <IntlProvider locale="ru-RU">
          <Dialog onClose={cancelClick}>
            <form>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Имя заказчика
                  <br />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Имя заказчика"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={32}
                    valid={touched.name ? !errors.name : true}
                    validationMessage={touched.name && errors.name}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Сумма заказа
                  <br />
                  <NumericTextBox
                    name="cash"
                    value={values.cash}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="100"
                    min={0}
                    max={1000}
                    valid={touched.date ? !errors.date : true}
                  />
                </label>
              </div>
              <div>
                <label>
                  Дата
                  <br />
                  <DatePicker
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Дата заказа"
                    valid={touched.date ? !errors.date : true}
                  />
                </label>
              </div>
            </form>
            <DialogActionsBar>
              <button className="k-button" onClick={cancelClick}>
                Отмена
              </button>
              <button
                className="k-button"
                onClick={() => saveClick(values)}
                disabled={!isValid}
              >
                Сохранить
              </button>
            </DialogActionsBar>
          </Dialog>
        </IntlProvider>
      )}
    </Formik>
  );
};

export default DialogForm;
