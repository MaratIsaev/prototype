import React from "react";
import { connect } from "react-redux";
import { updateCustomer, deleteCustomer, createCustomer } from "../../actions";
import Table from "components/table";

const CustomersPage = props => {
  return (
    <>
      <Table {...props} />
    </>
  );
};

const mstp = state => ({
  customers: state.customers
});

const mdtp = dispatch => ({
  updateCustomer: payload => dispatch(updateCustomer(payload)),
  deleteCustomer: payload => dispatch(deleteCustomer(payload)),
  createCustomer: payload => dispatch(createCustomer(payload))
});

export default connect(
  mstp,
  mdtp
)(CustomersPage);
