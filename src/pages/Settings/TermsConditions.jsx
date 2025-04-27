import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

const TermsConditions = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-button p-4 rounded-t-md text-white">
          <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
        </div>

        <div className="w-full bg-white rounded-2xl min-h-[60vh]">
          <div className="space-y-4 p-10">
            <p className="text-[#464343]">
              Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
              orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
              facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
              amet turpis habitant. Imperdiet tincidunt nisl consectetur
              hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
              pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
              morbi elementum nisl magnis convallis arcu enim tortor. Cursus a
              sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi
              posuere faucibus.
            </p>

            <p className="text-[#464343]">
              Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae
              orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend
              facilisis aliquet tempus morbi leo sagittis. Pellentesque odio
              amet turpis habitant. Imperdiet tincidunt nisl consectetur
              hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam
              pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc
              morbi elementum nisl magnis convallis arcu enim tortor.
            </p>
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

export default TermsConditions;
