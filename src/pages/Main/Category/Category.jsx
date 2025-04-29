import { Button, Input, Modal, Spin, Table } from "antd";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing React Icons for Edit and Delete
// import {
//   useAddCategoryMutation,
//   useEditCategoryMutation,
//   useGetAllCategoryQuery,
// } from "../../../redux/features/common/commonApi"; // Commented out Redux/RTK query imports
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} from "../../../redux/features/common/commonApi";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import Search from "antd/es/input/Search";

const Category = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
    data: updateData,
    isError,
    isLoading,
    error,
  } = useGetCategoryQuery({ search });
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [editCategory, { isLoading: isEditing }] = useEditCategoryMutation();
  const [addCategory,{isLoading:isAdded}] = useAddCategoryMutation()

  console.log("===========>aiman", updateData?.data, error);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Simulate addCategory and editCategory mutations with dummy success response
  const handleAddCategory = async ({name}) => {
    try {
      // Simulate an API response
      console.log("aiman", categoryId,name);

      const response = await addCategory({name});

      console.log("====", categoryId, response);

      if (response?.data?.success) {
        // Display success message with the response message
        SuccessSwal({
          title: "Category Add Successfully",
          // text: response?.message?.message || "Category deleted successfully",
        });

        // Hide the delete modal on success
        setIsModalVisible(false);
      } else {
        // Handle unexpected responses
        throw new Error(response?.error?.data?.errorType);
      }
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to update category",
      });
    }
  };

  const handleEditCategory = async ({categoryId,name}) => {
    try {
      // Simulate an API response
      console.log("aiman", categoryId,name);

      const response = await editCategory({categoryId,name});

      console.log("====", categoryId, response);

      if (response?.data?.success) {
        // Display success message with the response message
        SuccessSwal({
          title: "Category Edit Successfully",
          // text: response?.message?.message || "Category deleted successfully",
        });

        // Hide the delete modal on success
        setIsModalVisible(false);
      } else {
        // Handle unexpected responses
        throw new Error(response?.error?.data?.errorType);
      }
    } catch (error) {
      ErrorSwal({
        title: "",
        text: error?.message || "Failed to update category",
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // console.log("========>", id);

      // Awaiting the API call for deleting the category
      const response = await deleteCategory(categoryId);

      console.log("response======>", response);

      // Check if response is successful (assuming response contains a 'message' field)
      if (response?.data?.success) {
        // Display success message with the response message
        SuccessSwal({
          title: "Delete Success",
          text: response?.message?.message || "Category deleted successfully",
        });

        // Hide the delete modal on success
        setIsDeleteModalVisible(false);
      } else {
        // Handle unexpected responses
        throw new Error(response?.error?.data?.errorType);
      }
    } catch (error) {
      console.log("error===>", error);

      // Handle error and display an error message from the response (if any)
      const errorMessage =
        error?.error?.data?.errorType ||
        error?.message ||
        "Failed to delete category";

      // Display error message using Swal
      ErrorSwal({
        title: "",
        text: errorMessage,
      });
    }
  };

  

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    setCategoryId(null);
    setName("");
    setIsModalVisible(true);
  };

  const handleOpenModalForEdit = (category) => {
    setIsEditMode(true);
    setCategoryId(category._id);
    setName(category.name);
    setIsModalVisible(true);
  };

  const handleOpenDeleteModal = (category) => {
    console.log(category);

    setCategoryId(category._id);
    setIsDeleteModalVisible(true);
  };
  const onSearch = (date) => {
    if (updateData) {
      setSearch(date);
    }
  };

  const columns = [
    {
      title: "S. No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex justify-center gap-2">
          <Button
            icon={<FaEdit />} // Edit icon
            type="primary"
            shape="round"
            onClick={() => handleOpenModalForEdit(record)}
          />
          <Button
            icon={<FaTrash />} // Delete icon
            type="danger"
            shape="round"
            onClick={() => handleOpenDeleteModal(record)}
          />
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button type="primary" size="large" onClick={handleOpenModalForAdd}>
          Add Category
        </Button>
      </div>
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Category</h2>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>

      <LoaderWraperComp
        isLoading={isLoading}
        isError={isError}
        dataEmpty={false}
        // loader={
        //   <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        //     <Skeleton active className="w-full h-full" />
        //     <Skeleton active className="w-full h-full" />

        //   </div>
        // }
        className={"h-[12.02vh]"}
      >
        <div>
          <Table
            columns={columns}
            dataSource={updateData?.data}
            rowKey={(record) => record.id}
            // pagination={{
            //   current: page,
            //   total: data?.pagination?.totalData || 0,
            //   pageSize: 10,
            //   showSizeChanger: false,
            //   onChange: (current) => setPage(current),
            // }}
            pagination={false}
          />
        </div>
      </LoaderWraperComp>

      {/* Modal for Add/Edit Category */}
      <Modal
        title={isEditMode ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={500}
      >
        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="mt-2"
          />
          <Button
            type="primary"
            onClick={
              isEditMode
                ? () => handleEditCategory({categoryId,name})
                : ()=>handleAddCategory({categoryId,name})
            }
            className="w-full mt-4"
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Category"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="danger"
            onClick={() => handleDeleteCategory(categoryId)}
            className="bg-red-600 text-white"
          >
            Delete{" "}
            {isDeleting && (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            )}
          </Button>,
        ]}
        centered
        width={400}
      >
        <p>Are you sure you want to delete this category?</p>
      </Modal>
    </>
  );
};

export default Category;
