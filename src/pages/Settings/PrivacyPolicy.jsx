import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useGetPrivacyQuery } from "../../redux/features/common/commonApi";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data: privacy, isFetching } = useGetPrivacyQuery();
  if (isFetching) return <>Loading...</>;
  // Directly use the description in JSX
  const description = privacy?.data?.description;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        </div>

        <div className="w-full bg-white rounded-2xl min-h-[60vh]">
          <div className="space-y-4 p-10">
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className="text-[#464343]"
            ></p>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
            htmlType="submit"
            type="primary"
            className="px-8 w-[250px]"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
