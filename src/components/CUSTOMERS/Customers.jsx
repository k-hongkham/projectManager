import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import useAuth from "../hooks/userAuth.js";
import useLogin from "../hooks/useLogin.js";
import useCustomer from "../hooks/useCustomer.js";

import { getAllCustomers, updateCustomer } from "../../axios";

import CreateCustomer from "./CreateCustomer.jsx";
import UpdateCustomer from "./UpdateCustomer.jsx";
import DeleteCustomer from "./DeleteCustomer.jsx";

const Customers = () => {
  const { token, user } = useAuth();
  const {
    allCustomers,
    setAllCustomers,
    companyName,
    setCompanyName,
    companyRep,
    setCompanyRep,
    salesRep,
    setSalesRep,
    description,
    setDescription,
    needs,
    setNeeds,
    prospectValue,
    setProspectValue,
    setCustomer,
    customer,
  } = useCustomer();

  const [accessCustomers, setAccessCustomers] = useState(false);
  const [editCustomer, setEditCustomer] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const rowEvents = {
    onClick: (row) => {
      console.log(row);
      console.log("modalInfo", modalInfo);
      setModalInfo(row);
    },
  };

  const handleModalOpening = () => {
    setAccessCustomers(true);

    console.log("handling the open model", accessCustomers);
  };

  const handleUpdateCustomerInfo = async () => {
    setEditCustomer(true);
    const currentCustomer = customer.id;
    const updatedCustomerInfo = await updateCustomer(
      token,
      customer.id,
      companyName,
      companyRep,
      salesRep,
      description,
      needs,
      prospectValue
    );
    console.log("handle update customer", customer.id);
    console.log("handle update currentCustomer", currentCustomer);
    setCustomer(updatedCustomerInfo);

    const updatedCustomerListing = await getAllCustomers(token);
    setAllCustomers(updatedCustomerListing);
  };

  useEffect(() => {
    const getCustomers = async () => {
      if (localStorage.getItem("token")) {
        const theCustomers = await getAllCustomers(token);
        setAllCustomers(theCustomers);
      }
    };
    getCustomers();
  }, [token]);

  return (
    <div className="container">
      <Button variant="primary" onClick={handleModalOpening}>
        New Customer +
      </Button>
      <Modal
        show={accessCustomers}
        onHide={() => {
          setAccessCustomers(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <CreateCustomer
          setAllCustomers={setAllCustomers}
          accessCustomers={accessCustomers}
          setAccessCustomers={setAccessCustomers}
        />
      </Modal>
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Current Customers</h6>
        {Array.isArray(allCustomers) && allCustomers.length
          ? allCustomers.map((customer, idx) => {
              return (
                <div
                  className="d-flex text-muted pt-3 customerId"
                  key={`allCustomersList: ${idx}`}
                >
                  <div style={{ marginRight: "10px" }}>{customer.id}</div>
                  <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                    <div className="d-flex justify-content-between">
                      <strong className="d-block text-gray-dark">
                        {customer.CompanyName}
                      </strong>
                    </div>
                    {customer.Description}
                  </div>
                  <p style={{ marginRight: "10px" }}>
                    {customer.ProspectValue}
                  </p>

                  <Button
                    variant="info"
                    rowEvents={rowEvents}
                    onClick={handleUpdateCustomerInfo}
                  >
                    Update Information
                  </Button>

                  {editCustomer ? (
                    <UpdateCustomer
                      setAllCustomers={setAllCustomers}
                      editCustomer={editCustomer}
                      setEditCustomer={setEditCustomer}
                      allCustomers={allCustomers}
                      customer={customer}
                    />
                  ) : null}

                  <DeleteCustomer
                    customer={customer}
                    setAllCustomers={setAllCustomers}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Customers;
