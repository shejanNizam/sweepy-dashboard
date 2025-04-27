import { Button } from "antd";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

const EditAbout = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const placeholder = "Enter your updated privacy policy...";

  const handleSaveChanges = () => {
    // Handle save functionality, possibly submit the form or send an API request
    console.log("Updated content:", content);
    // After saving, you might navigate to a different page
    navigate("/settings/privacy-policy");
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
          <h2 className="text-2xl font-semibold">Edit About Us</h2>
        </div>

        <div className="h-full">
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-[50vh] bg-white"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          onClick={handleSaveChanges}
          className="px-8 w-[250px]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditAbout;
