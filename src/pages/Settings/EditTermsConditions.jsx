import { Button, message } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // for tracking loading state

  const handleSaveChanges = async () => {
    if (!content.trim()) {
      message.error("Terms & Conditions content cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      // Simulating a save action (e.g., an API call)
      // Replace this with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      message.success("Changes saved successfully!");
      navigate("/settings/terms-conditions"); // Navigate back after saving
    } catch (error) {
      message.error("Failed to save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
          <h2 className="text-2xl font-semibold">Edit Terms & Conditions</h2>
        </div>

        <div className="h-full">
          <ReactQuill
            placeholder="Enter your updated terms & conditions..."
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            className="h-[50vh] bg-white"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className="px-8 w-[250px]"
          onClick={handleSaveChanges}
          loading={loading} // Show loading spinner when saving
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditTermsConditions;
