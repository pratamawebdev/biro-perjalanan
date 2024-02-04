import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Sidebar from "../Fragments/Sidebar";
import Topbar from "../Fragments/Topbar";
import Table from "../Fragments/Table";
import {
  addTourist,
  deleteTourist,
  getTourist,
  getTouristDetails,
  updateTourist,
} from "../../services/tourist.service";
import Pagination from "../Fragments/Dashboard/Pagination";
import Swal from "sweetalert2";

interface Tourist {
  $id: string;
  createdat: string;
  id: string;
  tourist_email: string;
  tourist_profilepicture: string;
  tourist_location: string;
  tourist_name: string;
}

const DashboardLayouts = () => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [tourist, setTourist] = useState<Tourist[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this tourist!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#5bc0de",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTourist(id, (success) => {
          if (success) {
            setTourist((prev) => prev.filter((tourist) => tourist.id !== id));
            Swal.fire("Deleted!", "Tourist has been deleted.", "success");
          } else {
            console.error("Failed to delete tourist");
            Swal.fire("Error", "Failed to delete tourist", "error");
          }
        });
      }
    });
  };

  const handleNewTourist = () => {
    Swal.fire({
      title: "Add New Tourist",
      html: `
        <div class="flex flex-col items-start mb-2">
          <label for="newTouristName">Name:</label>
          <input type="text" id="newTouristName" class="swal2-input">
        </div>
        <div class="flex flex-col items-start mb-2">
        <label for="newTouristEmail">Email:</label>
        <input type="email" id="newTouristEmail" class="swal2-input">
        </div>
        <div class="flex flex-col items-start mb-2">
        <label for="newTouristLocation">Location:</label>
        <input type="text" id="newTouristLocation" class="swal2-input">
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const newTouristData = {
          tourist_name: (
            document.getElementById("newTouristName") as HTMLInputElement
          ).value,
          tourist_email: (
            document.getElementById("newTouristEmail") as HTMLInputElement
          ).value,
          tourist_location: (
            document.getElementById("newTouristLocation") as HTMLInputElement
          ).value,
        };

        addTourist(newTouristData, (success) => {
          if (success) {
            fetchData(currentPage, itemsPerPage);
            Swal.fire("Added!", "New tourist has been added.", "success");
          } else {
            console.error("Failed to add new tourist");
            Swal.fire("Error", "Failed to add new tourist", "error");
          }
        });
      }
    });
  };

  const fetchData = (page: number, perPage: number) => {
    getTourist(page, perPage, (data) => {
      setTourist(data?.data || []);
      setTotalPages(Math.ceil(data?.totalrecord / perPage));
    });
  };

  useEffect(() => {
    fetchData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
      setShowNav(false);
    } else {
      setIsMobile(false);
      setShowNav(true);
    }
  };

  const handleEdit = (id: string) => {
    const selectedTourist = tourist.find((t) => t.id === id);

    if (selectedTourist) {
      Swal.fire({
        title: "Edit Tourist",
        html: `
          <div class="flex flex-col items-start mb-2">
          <label for="touristName">Name:</label>
          <input type="text" id="touristName" class="swal2-input " value="${selectedTourist.tourist_name}">
          </div>   
          <div class="flex flex-col items-start  mb-2">
          <label for="touristEmail">Email:</label>
          <input type="email" id="touristEmail" class="swal2-input " value="${selectedTourist.tourist_email}">
          </div>   
          <div class="flex flex-col items-start  mb-2">
          <label for="touristLocation">Location:</label>
          <input type="text" id="touristLocation" class="swal2-input" value="${selectedTourist.tourist_location}">
          </div> 
          
          `,
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTourist = {
            id: id,
            tourist_name: (
              document.getElementById("touristName") as HTMLInputElement
            ).value,
            tourist_email: (
              document.getElementById("touristEmail") as HTMLInputElement
            ).value,
            tourist_location: (
              document.getElementById("touristLocation") as HTMLInputElement
            ).value,
          };

          updateTourist(id, updatedTourist, (success) => {
            if (success) {
              setTourist((prev) =>
                prev.map((t) => (t.id === id ? { ...t, ...updatedTourist } : t))
              );

              Swal.fire("Updated!", "Tourist has been updated.", "success");
            } else {
              console.error("Failed to update tourist");
              Swal.fire("Error", "Failed to update tourist", "error");
            }
          });
        }
      });
    }
  };

  const handleDetail = (id: string) => {
    getTouristDetails(id, (data) => {
      if (data) {
        Swal.fire({
          title: "Tourist Details",
          html: `
            <div>
              <p><strong>Name:</strong> ${data.tourist_name}</p>
              <p><strong>Email:</strong> ${data.tourist_email}</p>
              <p><strong>Location:</strong> ${data.tourist_location}</p>
              <!-- Add other fields as needed -->
            </div>
          `,
          showCancelButton: false,
          confirmButtonText: "OK",
        });
      } else {
        console.error("Failed to fetch tourist details");
        Swal.fire("Error", "Failed to fetch tourist details", "error");
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Topbar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter=" transform transition duration-[400ms] "
        enterFrom=" -translate-x-full "
        enterTo=" translate-x-0 "
        leave=" transform  duration-[400ms] transition ease-in-out "
        leaveFrom=" translate-x-0 "
        leaveTo=" -translate-x-full"
      >
        <Sidebar showNav={showNav} />
      </Transition>
      <main
        className={`pb-16 pt-8 h-screen  transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 py-16 md:px-16">
          <div className="flex flex-col gap-8 mb-8 md:justify-between md:items-center md:flex-row">
            <p className="text-3xl font-bold ">Tourist</p>
            <button
              className="bg-green-300 btn w-fit"
              onClick={handleNewTourist}
            >
              New Tourist
            </button>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-md shadow-lg shadow-black/10 ">
            <div className="flex flex-col items-start gap-3 mb-4 sm:justify-between sm:flex-row md:flex-row ">
              <div className="flex items-center gap-8 "></div>
            </div>

            {tourist.length < 1 ? (
              <div className="flex flex-col items-center justify-center gap-8">
                <p className="text-sm font-medium md:text-2xl">
                  No data available.
                </p>
                <img
                  src="./nodata.svg"
                  alt=""
                  className="w-full max-w-44 md:max-w-80"
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table
                  data={tourist}
                  onDelete={(id) => handleDelete(id)}
                  onEdit={(id) => handleEdit(id)}
                  onDetail={(id) => handleDetail(id)}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardLayouts;
