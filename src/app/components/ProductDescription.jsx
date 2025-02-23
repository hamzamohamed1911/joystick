import { useState } from "react";

const ProductDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-xl text-xl text-[#0D0D0D]">
      <p>
        {isExpanded ? description : `${description.slice(0, maxLength)} ...  `}
        {description.length > maxLength && (
          <button
            onClick={toggleDescription}
            className="text-primary underline"
          >
            {isExpanded ? " رؤية الأقل " : "  رؤية المزيد"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ProductDescription;
