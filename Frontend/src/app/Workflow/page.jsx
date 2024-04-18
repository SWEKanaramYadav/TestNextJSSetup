"use client";
import React from 'react';
import Link from 'next/link';
import { userouter } from "next/navigation";
import axios from 'axios';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';



const Home = () => {
  const [workflowMasterID,setWorkflowMasterID] = React.useState('');
  const [workflowData, setWorkflowData] = React.useState([]);
  const [isDeleteModal, setDeleteModal] = React.useState(false);


  const handleOpen = async (item, type) => {
    if (type === 'Add') {
      props.navigate('/AddWorkflow', { state: { WorkflowMasterID: item.workflowMasterID } })
    }else    if (type === 'Edite') {
  // setWorkflowType(type);
} else if (type === 'Delete') {
  setDeleteModal(true);
}
};

const handleClose = async (type) => {
 if (type === 'Edite') {
  // setIsOpenActionOutgoingSidebar(false);
  // resetScreen();
} else if (type === 'Delete') {
  setDeleteModal(false);
}
};


  const actionBodyTemplate = (rowData) => {

    return (
        <div className='table-icon'>
            <Button className='' onClick={() => handleOpen(rowData, 'ViewBankMaster')} tooltip={"View"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                <i className='icon-view'></i>
            </Button>
            <Button className='' onClick={() => handleOpen(rowData, 'EditeBankMaster')} tooltip={"Edit"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                <i className='icon-edit'></i>
            </Button>

            <Button className='' onClick={() => handleOpen(rowData, "DeleteBankMaster")} tooltip={"Delete"} tooltipOptions={{ className: 'bluegray-tooltip', position: 'top' }}>
                <i className='icon-delete'  ></i>
            </Button>
        </div>

    )
}

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Workflow Configuration</h1>
      <div className="flex justify-end mt-10 mr-10">
        <div>
          <Link href="/AddWorkflow">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ADD
            </button>
          </Link>
        </div>
      </div>
      <div className="card">
        <DataTable value={workflowData} tableStyle={{ minWidth: '50rem' }}>
          <Column field="Sr.No" header="Code"></Column>
          <Column field="WorkflowType" header="Workflow Type"></Column>
          <Column field="Parameter Name" header="Parameter Name"></Column>
          <Column field="Parameter value" header="Parameter Value"></Column>
          <Column header="Action" body= {actionBodyTemplate} ></Column>
        </DataTable>
      </div>

      <Dialog
                header="Delete Master"
                visible={isDeleteModal}
                className='dialog-popup'
                onHide={(e) => handleClose('Delete')}
                draggable={false}
                closable={false}
                position="top"
            >
                <span>Are you sure want to delete the Workflow from system ?</span>
                <div className='dialog-footer'>
                    <button className='btn-dialog-cancel' onClick={(e) => handleClose('Delete')}>
                        cancel
                    </button>
                    <button className='btn-dialog-delete'
                    //  onClick={() => handleDelete(Id)}
                     >Delete </button>
                </div>
            </Dialog>

    </div>
  );
};

export default Home