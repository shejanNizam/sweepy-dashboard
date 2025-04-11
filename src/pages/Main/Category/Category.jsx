import { Button, Input, Modal, Pagination, Spin, Upload } from "antd";
import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/features/common/commonApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";

const Category = () => {
  const [page, setPage] = useState(1);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const { data, isLoading, refetch } = useGetAllCategoryQuery({ page });
  const [addCategory] = useAddCategoryMutation();
  const [editCategory] = useEditCategoryMutation();

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const response = await addCategory(formData);

      SuccessSwal({
        title: "",
        text: response.message || "Category added successfully",
      });
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          error?.data?.message || error?.message || "Failed to add category",
      });
    }
  };

  const handleEditCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("newName", name);
      if (image) {
        formData.append("image", image);
      }

      const response = await editCategory({
        categoryId,
        editCategoryData: formData,
      });
      SuccessSwal({
        title: "",
        text: response.message || "Category updated successfully",
      });
      refetch();
      setIsModalVisible(false);
    } catch (error) {
      ErrorSwal({
        title: "",
        text:
          error?.data?.message || error?.message || "Failed to update category",
      });
    }
  };

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    setCategoryId(null);
    setName("");
    setImage(null);
    setIsModalVisible(true);
  };

  const handleOpenModalForEdit = (category) => {
    setIsEditMode(true);
    setCategoryId(category.name);
    setName(category.name);
    setImage(category.image);
    setIsModalVisible(true);
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button type="primary" size="large" onClick={handleOpenModalForAdd}>
          Add Category
        </Button>
      </div>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center w-full h-64">
            <Spin size="large" />
          </div>
        ) : data?.data.length === 0 ? (
          <>
            <p className=" font-semibold text-xl text-center text-red-600 ">
              {" "}
              No category found. Please add some category!{" "}
            </p>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.data?.map((category) => (
                <div
                  key={category.name}
                  className="border p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={`https://armonia-ifti.sarv.live/${category.image}`}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <p className="text-lg font-semibold text-center">
                    {category.name}
                  </p>
                  <Button
                    type="primary"
                    onClick={() => handleOpenModalForEdit(category)}
                    block
                    className="mt-4"
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

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
          <Upload
            beforeUpload={(file) => {
              setImage(file);
              return false;
            }}
            showUploadList={false}
          >
            <Button block>Upload Image</Button>
          </Upload>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="mt-2"
          />
          <Button
            type="primary"
            onClick={isEditMode ? handleEditCategory : handleAddCategory}
            className="w-full mt-4"
          >
            {isEditMode ? "Save Changes" : "Save"}
          </Button>
        </div>
      </Modal>

      {/* Pagination */}
      <div className=" flex justify-center py-8">
        <Pagination
          defaultCurrent={1}
          // position={["bottomCenter"]}
          showQuickJumper={true}
          showSizeChanger={false}
          total={data?.pagination?.totalData || 0}
          current={page}
          onChange={(currentPage) => setPage(currentPage)}
          pageSize={10}
        />
      </div>
    </>
  );
};

export default Category;
