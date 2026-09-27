  import { useState } from "react";
  import {
    useQuery,
    useMutation,
    useQueryClient
  } from "@tanstack/react-query";

  import {
    getSpareParts,
    createSparePart,
    deleteSparePart
  } from "./sparePartsService";

  import SparePartsTable from "./sparePartsTable";
  import AddSparePartForm from "./AddSpare";

  function SpareParts() {

    const [search, setSearch] = useState("");
    const [isFormOpen , setIsFormOpen] = useState(false);
    const [editingSparePart, setEditingSparePart] = useState(null);
    const queryClient = useQueryClient();

    // GET
    const {
      data: spareParts = [],
      isLoading,
      isError,
      error
    } = useQuery({
      queryKey: ["spareParts"],
      queryFn: getSpareParts
    });

    // POST
    const createMutation = useMutation({
      mutationFn: createSparePart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["spareParts"]
        });
      }
    });

    // DELETE
    const deleteMutation = useMutation({
      mutationFn: deleteSparePart,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["spareParts"]
        });
      }
    });

    const filteredSpareParts = spareParts.filter((part) =>
      part.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (data) => {
      createMutation.mutate(data);
      setIsFormOpen(false);
    };

    const handleDelete = (id) => {
      if (!window.confirm("Are you sure you want to delete this customer?")) return;
      deleteMutation.mutate(id);
    };

    const handleEdit = (part) => {
      setEditingSparePart(part);
      setIsFormOpen(true);
    }

    const handleCloseForm = () => {
      setIsFormOpen(false);
      setEditingSparePart(null);
    }

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
              Spare Parts directory
            </span>

            <h1>Spare Parts</h1>

            <p className="page-header-desc">
              Manage your AutoCare Spare Parts information in one place.
            </p>
          </div>

          <button className="add-btn"
            onClick={() => setIsFormOpen(true)}>
            +
            Add Spares
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
              {filteredSpareParts.length} of {spareParts.length} spare parts
            </span>

          </div>

          {/* Your SparePartsTable goes here */}
          <SparePartsTable
            spareParts={filteredSpareParts}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        {isFormOpen && (
            <AddSparePartForm
            onClose={handleCloseForm}
            onSave={handleSave}
            initialData={editingSparePart}
          />
        )}
        </div>

      </section>
    );
  }

  export default SpareParts;