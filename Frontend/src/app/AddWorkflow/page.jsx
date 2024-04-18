"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { Sidebar } from "primereact/Sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
// import { useToasts } from 'react-toast-notifications';

const page = () => {
  // const { addToast } = useToasts();
  const [workflowMasterID, setWorkflowMasterID] = React.useState("");
  const [workflowName, setWorkflowName] = React.useState("");
  const [workflowNameErr, setWorkflowNameErr] = React.useState(false);
  const [workflowNameErrText, setWorkflowNameErrText] = React.useState("");

  const [workflowType, setWorkflowType] = React.useState("");

  const triggerOptionsList = [
    { label: "Incoming API Call - Get", value: "1" },
    { label: "Incoming API Call - Put", value: "2" },
    { label: "Incoming API Call - Post", value: "3" },
    { label: "Incoming API Call - Delete", value: "4" },
  ];
  const [selectTrigger, setSelectTrigger] = React.useState(
    triggerOptionsList[0].value
  );
  const [selectTriggerErr, setSelectTriggerErr] = React.useState(false);
  const [selectTriggerErrText, setSelectTriggerErrText] = React.useState("");

  const [triggerUrl, setTriggerUrl] = React.useState("");
  const [triggerUrlErr, setTriggerUrlErr] = React.useState(false);
  const [triggerUrlErrText, setTriggerUrlErrText] = React.useState("");

  const [parameterName, setParameterName] = React.useState("");
  const [parameterNameErr, setParameterNameErr] = React.useState(false);
  const [parameterNameErrText, setParameterNameErrText] = React.useState("");

  const [parameterValue, setParameterValue] = React.useState("");
  const [parameterValueErr, setParameterValueErr] = React.useState(false);
  const [parameterValueErrText, setParameterValueErrText] = React.useState("");

  const actionOptionsList = [
    { label: "Outgoing API Call - Get", value: "1" },
    { label: "Outgoing API Call - Put", value: "2" },
    { label: "Outgoing API Call - Post", value: "3" },
    { label: "Outgoing API Call - Delete", value: "4" },
  ];
  const [selectAction, setSelectAction] = React.useState(
    actionOptionsList[0].value
  );
  const [selectActionErr, setSelectActionErr] = React.useState(false);
  const [selectActionErrText, setSelectActionErrText] = React.useState("");

  const [actionUrl, setActionUrl] = React.useState("");
  const [actionUrlErr, setActionUrlErr] = React.useState(false);
  const [actionUrlErrText, setActionUrlErrText] = React.useState("");

  const [actionParameterName, setActionParameterName] = React.useState("");
  const [actionParameterNameErr, setActionParameterNameErr] =
    React.useState(false);
  const [actionParameterNameErrText, setActionParameterNameErrText] =
    React.useState("");

  const [actionParameterValue, setActionParameterValue] = React.useState("");
  const [actionParameterValueErr, setActionParameterValueErr] =
    React.useState(false);
  const [actionParameterValueErrText, setActionParameterValueErrText] =
    React.useState("");

  const [showOptions, setShowOptions] = React.useState(false);
  const [isOpenTriggerIncomingSidebar, setIsOpenTriggerIncomingSidebar] =
    React.useState(false);
  const [isOpenActionOutgoingSidebar, setIsOpenActionOutgoingSidebar] =
    React.useState(false);
  const [isDeleteModal, setDeleteModal] = React.useState(false);

  const resetScreen = async () => {
    setWorkflowName("");
    setWorkflowNameErr(false);
    setWorkflowNameErrText("");

    setSelectTrigger("");
    setSelectTriggerErr(false);
    setSelectTriggerErrText("");

    setTriggerUrl("");
    setTriggerUrlErr(false);
    setTriggerUrlErrText("");

    setActionParameterName("");
    setActionParameterNameErr(false);
    setActionParameterNameErrText("");

    setParameterValue("");
    setParameterValueErr(false);
    setParameterValueErrText("");

    setSelectAction("");
    setSelectActionErr(false);
    setSelectActionErrText("");

    setActionUrl("");
    setActionUrlErr(false);
    setActionUrlErrText("");

    setParameterName("");
    setParameterNameErr(false);
    setParameterNameErrText("");

    setActionParameterValue("");
    setActionParameterValueErr(false);
    setActionParameterValueErrText("");

    setShowOptions(false);
    setIsOpenTriggerIncomingSidebar(false);
    setIsOpenActionOutgoingSidebar(false);
  };

  const validateFields = () => {
    let isValid = true;
    if (isOpenTriggerIncomingSidebar) {
      if (!selectTrigger) {
        setSelectTriggerErr(true);
        setSelectTriggerErrText("Trigger is required");
        isValid = false;
      }
      if (!triggerUrl) {
        setTriggerUrlErr(true);
        setTriggerUrlErrText("Trigger URL is required");
        isValid = false;
      }
      if (!parameterName) {
        setParameterNameErr(true);
        setParameterNameErrText("Query Parameter Name is required");
        isValid = false;
      }
      if (!parameterValue) {
        setParameterValueErr(true);
        setParameterValueErrText("Query Parameter Value is required");
        isValid = false;
      }
    }
    if (isOpenActionOutgoingSidebar) {
      if (!selectAction) {
        setSelectActionErr(true);
        setSelectActionErrText("Action is required");
        isValid = false;
      }
      if (!actionUrl) {
        setActionUrlErr(true);
        setActionUrlErrText("Action URL is required");
        isValid = false;
      }
      if (!actionParameterName) {
        setActionParameterNameErr(true);
        setActionParameterNameErrText("Query Parameter Name is required");
        isValid = false;
      }
      if (!actionParameterValue) {
        setActionParameterValueErr(true);
        setActionParameterValueErrText("Query Parameter Value is required");
        isValid = false;
      }
    }
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    debugger;
    e.preventDefault();
    if (validateFields()) {
      let data = {
        //WorkflowId: workflowId,
        WorkflowName: workflowName,
        WorkflowType: workflowType,
        SelectTrigger: selectTrigger,
        TriggerUrl: triggerUrl,
        ParameterName: parameterName,
        ParameterValue: parameterValue,
        SelectAction: selectAction,
        ActionUrl: actionUrl,
        ActionParameterName: actionParameterName,
        ActionParameterValue: actionParameterValue,
      };
      try {
        const response = await api.post(
          "http://localhost:3001/dashboard/addWorkflow",
          data
        );
        if (response.Success) {
          // addToast(response.Message, { appearance: 'success' });
          resetScreen();
        } else {
          // addToast(response.message, { appearance: 'error' });
        }
      } catch (err) {
        // addToast(err.message || "An error occurred", { appearance: 'error' });
      }
    }
  };

  const handleOpen = async (items, type) => {
    if (type === "Add") {
      setShowOptions(!showOptions);
      // setShowOptions(true);
    } else if (type === "TriggerIncoming") {
      setIsOpenTriggerIncomingSidebar(true);
      setWorkflowType(type);
    } else if (type === "ActionOutgoing") {
      setIsOpenActionOutgoingSidebar(true);
      setWorkflowType(type);
    } else if (type === "Delete") {
      setDeleteModal(true);
    }
  };

  const handleClose = async (type) => {
    if (type === "TriggerIncomingSidebar") {
      setIsOpenTriggerIncomingSidebar(false);
    } else if (type === "ActionOutgoingSidebar") {
      setIsOpenActionOutgoingSidebar(false);
    } else if (type === "CancelForm") {
      resetScreen();
    } else if (type === "Delete") {
      setDeleteModal(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Workflow Configuration</h1>
      <div className="flex justify-center mt-10 mr-10">
        <div className="mb-4">
          <label
            htmlFor="workflowName"
            className="block text-sm font-semibold mb-2"
          >
            Workflow Name :
          </label>
          <input
            type="text"
            id="workflowName"
            className="w-full px-3 py-2 border rounded"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            placeholder="Workflow Name"
          />
          {/* {workflowNameErr ? <small className="p-error block text-red-500">{workflowNameErrText}</small> : null} */}
        </div>
        <div className=" mt-6 mr-10 bg-gry shadow-md rounded-md">
          <div className="bg-grey-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Button
              severity="secondary"
              onClick={(e) => handleOpen(e, "TriggerIncoming")}
            >
              Trigger Incoming API Call
            </Button>
          </div>
          <div className="bg-grey-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            <Button
              severity="secondary"
              onClick={(e) => handleOpen(e, "ActionOutgoing")}
            >
              Action Outgoing API Call - GET
            </Button>
          </div>
        </div>
      </div>
      <Sidebar
        className="sidebar-lg"
        visible={isOpenTriggerIncomingSidebar}
        position="right"
        onHide={() => handleClose("TriggerIncomingSidebar")}
        showCloseIcon={false}
        style={{ height: "100" }}
      >
        <div>
          {/* <form onSubmit={handleFormSubmit}> */}
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="selectTrigger"
                className="block text-sm font-semibold mb-2"
              >
                Select Trigger:
              </label>
              <Dropdown
                id="selectTrigger"
                className="w-full"
                options={triggerOptionsList}
                value={selectTrigger}
                onChange={(e) => setSelectTrigger(e.value)}
                placeholder="Select a trigger"
              />
            </div>
            {selectTriggerErr ? (
              <small className="p-error block text-red-500">
                {selectTriggerErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="triggerUrl"
              className="block text-sm font-semibold mb-2"
            >
              Trigger URL :
            </label>
            <input
              type="text"
              id="triggerUrl"
              className="w-full px-3 py-2 border rounded"
              value={triggerUrl}
              onChange={(e) => setTriggerUrl(e.target.value)}
              placeholder="Trigger URL"
            />
            {triggerUrlErr ? (
              <small className="p-error block text-red-500">
                {triggerUrlErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="parameterName"
              className="block text-sm font-semibold mb-2"
            >
              Query Parameter Name :
            </label>
            <input
              type="text"
              id="parameterName"
              className="w-full px-3 py-2 border rounded"
              value={parameterName}
              onChange={(e) => setParameterName(e.target.value)}
              placeholder="Query Parameter Name"
            />
            {parameterNameErr ? (
              <small className="p-error block text-red-500">
                {parameterNameErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="parameterValue"
              className="block text-sm font-semibold mb-2"
            >
              Query Parameter Value :
            </label>
            <input
              type="text"
              id="parameterValue"
              className="w-full px-3 py-2 border rounded"
              value={parameterValue}
              onChange={(e) => setParameterValue(e.target.value)}
              placeholder="Query Parameter value"
            />
            {parameterValueErr ? (
              <small className="p-error block text-red-500">
                {parameterValueErrText}
              </small>
            ) : null}
          </div>
          <div>
            <button
              className="bg-grey-500 text-black py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handleClose("TriggerIncomingSidebar")}
            >
              Save
            </button>
            {/* <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button> */}
          </div>
          {/* </form> */}
        </div>
      </Sidebar>
      <Sidebar
        className="sidebar-lg"
        visible={isOpenActionOutgoingSidebar}
        position="right"
        onHide={() => handleClose("ActionOutgoingSidebar")}
        showCloseIcon={false}
        style={{ height: "100" }}
      >
        <div>
          {/* <form onSubmit={handleFormSubmit}> */}
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="selectAction"
                className="block text-sm font-semibold mb-2"
              >
                Select Action:
              </label>
              <Dropdown
                id="selectAction"
                className="w-full"
                options={actionOptionsList}
                value={selectAction}
                onChange={(e) => setSelectAction(e.value)}
                placeholder="Select an action"
              />
            </div>
            {selectActionErr ? (
              <small className="p-error block text-red-500">
                {selectActionErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="actionUrl"
              className="block text-sm font-semibold mb-2"
            >
              Action URL :
            </label>
            <input
              type="text"
              id="actionUrl"
              className="w-full px-3 py-2 border rounded"
              value={actionUrl}
              onChange={(e) => setActionUrl(e.target.value)}
              placeholder="Action URL"
            />
            {actionUrlErr ? (
              <small className="p-error block text-red-500">
                {actionUrlErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="actionParameterName"
              className="block text-sm font-semibold mb-2"
            >
              Query Parameter Name :
            </label>
            <input
              type="text"
              id="actionParameterName"
              className="w-full px-3 py-2 border rounded"
              value={actionParameterName}
              onChange={(e) => setActionParameterName(e.target.value)}
              placeholder="Query Parameter Name"
            />
            {actionParameterNameErr ? (
              <small className="p-error block text-red-500">
                {actionParameterNameErrText}
              </small>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="actionParameterValue"
              className="block text-sm font-semibold mb-2"
            >
              Query Parameter Value :
            </label>
            <input
              type="text"
              id="actionParameterValue"
              className="w-full px-3 py-2 border rounded"
              value={actionParameterValue}
              onChange={(e) => setActionParameterValue(e.target.value)}
              placeholder="Query Parameter value"
            />
            {actionParameterValueErr ? (
              <small className="p-error block text-red-500">
                {actionParameterValueErrText}
              </small>
            ) : null}
          </div>
          <div>
            {/* <button
              className="bg-grey-500 text-black py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handleClose("ActionOutgoingSidebar")}
            >
              Cancel
            </button> */}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => handleClose("ActionOutgoingSidebar")}
            >
              Save
            </button>
          </div>
          {/* </form> */}
        </div>
      </Sidebar>{" "}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={(e) => {handleFormSubmit(e)}}
      >
        Submit
      </button>
      <button
        type="submit"
        className="bg-grey-500 text-black py-2 px-4 rounded hover:bg-blue-600"
        onClick={(e) =>handleClose("CancelForm")}
      >
        Cancel
      </button>
    </div>
  );
};

export default page;
