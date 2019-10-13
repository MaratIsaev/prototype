import React, { useState, useEffect } from "react";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import { IntlProvider, load } from "@progress/kendo-react-intl";
import RangeCashCell from "components/rangeCashCell";
import RangeDateCell from "components/rangeDateCell";
import CommandCell from "components/commandCell";
import DialogForm from "components/dialogForm";
import style from "./style.scss";

import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";

import ruNumbers from "cldr-numbers-full/main/ru/numbers.json";
import ruLocalCurrency from "cldr-numbers-full/main/ru/currencies.json";
import ruCaGregorian from "cldr-dates-full/main/ru/ca-gregorian.json";
import ruDateFields from "cldr-dates-full/main/ru/dateFields.json";

const pagerSettings = {
  buttonCount: 3,
  info: false,
  previousNext: true
};

load(
  likelySubtags,
  currencyData,
  weekData,
  ruLocalCurrency,
  ruNumbers,
  ruCaGregorian,
  ruDateFields
);

const Table = props => {
  const { customers, updateCustomer, deleteCustomer, createCustomer } = props;

  const [data, setData] = useState([]);
  const [customersForGrid, setCustomersForGrid] = useState(data);
  const [pagingState, setPagingState] = useState({ skip: 0, take: 5 });
  const [sort, setSort] = useState([{ field: "id", dir: "desc" }]);
  const [filter, setFilter] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState(null);

  const setInitialData = () => {
    const initialData = customers.map(el => ({
      ...el,
      date: new Date(el.date)
    }));
    setData(initialData);
  };

  const pageChange = event => {
    setPagingState({
      skip: event.page.skip,
      take: event.page.take
    });
  };

  const updateClick = customer => {
    updateCustomer(customer);
    cancelClick();
  };

  const cancelClick = () => {
    setEditedCustomer(null);
    setNewCustomer(null);
  };

  const addClick = () => {
    setNewCustomer({});
  };

  const onItemChange = e => {
    const { field, value } = e;
    const updatedData = data.map(el => {
      if (el.id === editID) return { ...el, [field]: value };
      return el;
    });
    setData(updatedData);
  };

  useEffect(() => {
    setInitialData();
  }, [customers]);

  useEffect(() => {
    setCustomersForGrid(filterBy(orderBy(data, sort), filter));
  }, [sort, filter, data, pagingState]);

  const totalLength = customersForGrid.length;
  const displayCustomers = customersForGrid.slice(
    pagingState.skip,
    pagingState.take + pagingState.skip
  );

  const ComandColumn = CommandCell({
    editClick: setEditedCustomer,
    removeClick: deleteCustomer
  });

  const dialogMode = (newCustomer && "new") || (editedCustomer && "edit");
  const dialogFormProps = {
    dialogMode,
    cancelClick,
    editedCustomer,
    newCustomer,
    updateClick,
    addClick: payload => {
      createCustomer(payload);
      cancelClick();
    }
  };

  return (
    <>
      <IntlProvider locale="ru-RU">
        <Grid
          editField="inEdit"
          sortable={true}
          filterable={true}
          pageable={pagerSettings}
          total={totalLength}
          className={style.table}
          onPageChange={pageChange}
          sort={sort}
          onSortChange={e => setSort(e.sort)}
          data={displayCustomers}
          skip={pagingState.skip}
          take={pagingState.take}
          filter={filter}
          onFilterChange={e => setFilter(e.filter)}
          onItemChange={onItemChange}
        >
          <GridToolbar>
            <button
              title="Добавить"
              className="k-button k-primary"
              onClick={addClick}
            >
              Добавить
            </button>
          </GridToolbar>
          <GridColumn
            field="id"
            title="Номер"
            width="90px"
            filterable={false}
          />
          <GridColumn field="name" title="Имя" width="175px" filter="text" />
          <GridColumn
            field="date"
            title="Дата"
            filter="date"
            format="{0:d}"
            filterCell={RangeDateCell}
            width="400px"
            filter="date"
          />
          <GridColumn
            field="cash"
            title="Сумма"
            width="270px"
            format="{0:c2}"
            filterCell={RangeCashCell}
          />
          <GridColumn
            width="190px"
            filterable={false}
            sortable={false}
            cell={ComandColumn}
          />
        </Grid>
      </IntlProvider>
      {dialogMode && <DialogForm {...dialogFormProps} />}
    </>
  );
};

export default Table;
