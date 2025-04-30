import { Button, Image, Modal, Upload, Input } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing React Icons for Edit and Delete
import {
  useCreateAdvertisementMutation,
  useDeleteAdvertisementMutation,
  useEditAdvertisementMutation,
  useGetAllAdvertisementsQuery,
} from "../../../redux/features/advertisement/advertisementApi";
import { ErrorSwal, SuccessSwal } from "../../../utils/allSwalFire";
import Swal from "sweetalert2";

export default function Advertisement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const { data, isLoading, isError } = useGetAllAdvertisementsQuery();
  const [createAdvertisement, { isLoading: createLoading }] =
    useCreateAdvertisementMutation();
  const [editAdvertisement, { isLoading: editLoading }] =
    useEditAdvertisementMutation();
  const [deleteAdvertisement] = useDeleteAdvertisementMutation();

  const handleEdit = (ad) => {
    setCurrentAd({ ...ad, type: "edit" });
    setIsModalOpen(true);
  };

  const handleImageUpload = (file) => {
    setNewImage(file);
    return false; // Prevent auto upload
  };

  const handleSave = async () => {
    const formData = new FormData();
    try {
      if (!currentAd?.title) {
        throw new Error("Title is required!");
      } else {
        formData.append("title", currentAd?.title);
      }
      if (!newImage && currentAd?.type === "create") {
        throw new Error("Image is required!");
      } else if (newImage) {
        formData.append("image", newImage);
      }

      if (currentAd.type === "edit") {
        await editAdvertisement({
          id: currentAd._id,
          data: formData,
        }).unwrap();
        SuccessSwal({
          title: "Success",
          text: "Successfully updated!",
        });
      }
      if (currentAd.type === "create") {
        await createAdvertisement({
          data: formData,
        }).unwrap();
        SuccessSwal({
          title: "Success",
          text: "Successfully Created!",
        });
      }
      setIsModalOpen(false);
      setNewImage(null);
      setCurrentAd(null);
    } catch (error) {
      console.log(error);
      ErrorSwal({
        title: "",
        text:
          error?.data?.message ||
          error?.message ||
          error?.error ||
          "Something went wrong!",
      });
    }
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteAdvertisement({ id }).unwrap();
          SuccessSwal({
            title: "Success",
            text: response.message || "Successfully deleted!",
          });
        } catch (error) {
          ErrorSwal({
            title: "",
            text:
              error?.data?.message || error?.data || "Something went wrong!",
          });
        }
      }
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
        <h2 className="text-2xl font-semibold">Advertisements</h2>
      </div>
      <p className="text-sm text-gray-500  px-4 py-6">
        [Note: You can upload a maximum of 5 banners.]
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((ad) => (
          <div
            key={ad._id}
            className="relative border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Image
              // src={ad.image}
              src={`${import.meta.env.VITE_IMAGE_URL}${ad.image}`}
              alt={`Advertisement ${ad.id}`}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Button
                icon={<FaEdit />}
                type="default"
                shape="circle"
                size="small"
                onClick={() => handleEdit(ad)}
              />
              <Button
                icon={<FaTrashAlt />}
                type="default"
                shape="circle"
                size="small"
                onClick={() => handleDelete(ad._id)}
              />
            </div>
            <p className="text-lg mt-2">Title: {ad.title || "N/A"}</p>
          </div>
        ))}
      </div>

      <Button
        className="mt-6 w-full border-dashed border-2 border-orange-400 py-4 text-orange-400"
        icon={<AiOutlineCloudUpload />}
        type="text"
        onClick={() => {
          setCurrentAd({ type: "create" });
          setIsModalOpen(true);
        }}
      >
        Upload Image
      </Button>

      {/* Edit Modal */}
      <Modal
        title={`${
          currentAd?.type === "create" ? "Create" : "Edit"
        } Advertisement`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            loading={editLoading || createLoading}
            key="save"
            type="primary"
            onClick={handleSave}
          >
            Save
          </Button>,
        ]}
        centered
        width={500}
      >
        <div className={"mb-3"}>
          <p className={"mb-1"}>Title</p>
          <Input
            onChange={(e) =>
              setCurrentAd((c) => ({ ...c, title: e.target.value }))
            }
            value={currentAd?.title}
          />
        </div>
        <div className="space-y-4">
          <p className={"mb-1"}>Image</p>
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button block className={"w-full"}>
              Upload Image
            </Button>
          </Upload>
          {newImage && (
            <div className="mt-4">
              <img
                src={URL.createObjectURL(newImage)}
                alt="New Advertisement"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
