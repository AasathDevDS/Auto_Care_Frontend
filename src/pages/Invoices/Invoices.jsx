import { useState } from "react";
import { getInvoices,
    createInvoices,
    deleteInvoices } from "./InvoiceAPI";
import {
    useQuery,
    useMutation,
    useQueryClient
  } from "@tanstack/react-query";

import InvoiceTable from "./InvoiceTable";
import AddInvoiceForm from "./AddInvoice";
import InvoiceDetailsView from "./InvoiceDetailView";

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [isFormOpen , setIsFormOpen] = useState(false);
  const [isDetailsFormOpen , setIsDetailsFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const queryClient = useQueryClient();

  // GET
    const {
      data: invoices = [],
      isLoading,
      isError,
      error
    } = useQuery({
      queryKey: ["invoices"],
      queryFn: getInvoices
    });

   // POST
      const createMutation = useMutation({
        mutationFn: createInvoices,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["invoices"]
          });
        }
      });

  // DELETE
      const deleteMutation = useMutation({
        mutationFn: deleteInvoices,
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["invoices"]
          });
        }
      });

    const filteredInvoices = invoices.filter((invoice) =>
      invoice.vehicle_number.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (data) => {
      createMutation.mutate(data);
      // console.log(data);
      setIsFormOpen(false);
    };
    

    const handleDelete = (id) => {
      if (!window.confirm("Are you sure you want to delete this customer?")) return;
      deleteMutation.mutate(id);
    };

    const handleEdit = (invoice) => {
      setEditingInvoice(invoice);
      setIsFormOpen(true);
    }

    const handleCloseForm = () => {
      setIsFormOpen(false);
    }

    const handleEyeClick = (invoiceItem) => {
    setSelectedInvoice(invoiceItem);
    setIsDetailsFormOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsFormOpen(false);
    setSelectedInvoice(null);
  };

  const handleOpenEditModal = (invoiceItem) => {
    setEditingInvoice(invoiceItem);
    setIsFormOpen(true);
  };


    if (isLoading) {
      return <div>Loading spare parts...</div>;
    }

    if (isError) {
      return <div>Error: {error.message}</div>;
    }

  return (
    <section className="module-page">

        <div className="page-header">

          <div className="page-header-text">
            <span className="section-tag">
              Invoices directory
            </span>

            <h1>Invoices</h1>

            <p className="page-header-desc">
              Manage your AutoCare Invoices information in one place.
            </p>
          </div>

          <button className="add-btn"
          onClick={() => setIsFormOpen(true)}
          >
            +
            Add Invoice
          </button>

        </div>

        <div className="module-panel">

          <div className="table-toolbar">

            <div className="search-box">

              <span className="search-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search ...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <span className="record-count">
              {invoices.length} Invoices 
            </span>

          </div>

          {/* Invoices Table  */}
          <InvoiceTable
            invoices={filteredInvoices}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onEyeView={handleEyeClick}
          />
        {isFormOpen && (
            <AddInvoiceForm
            onClose={handleCloseForm}
            onSave={handleSave}
            initialData={editingInvoice}
          />
        )}

        {/* View Details Modal */}
        {isDetailsFormOpen && (
          <InvoiceDetailsView
            invoice={selectedInvoice}
            onClose={handleCloseDetails}
            onEdit={(invoiceToEdit) => {
              handleCloseDetails();
              handleOpenEditModal(invoiceToEdit);
            }}
          />
        )}
        </div>

      </section>

  );
}