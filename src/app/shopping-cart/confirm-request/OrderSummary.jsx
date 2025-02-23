import ConfirmButton from "./ConfirmButton";

const OrderSummary = ({ total, handleSubmit }) => {
    return (
      <div className="xl:max-w-[400px] lg:max-w-[350px] w-full">
        <div className="text-[#A6A798] flex justify-between font-semibold text-lg my-4">
          <span>السعر</span>
          <span>{total} جنيه</span>
        </div>
        <div className="text-[#A6A798] flex justify-between font-semibold text-lg my-4">
          <span>الشحن</span>
          <span>50.00 جنيه</span>
        </div>
        <div className="text-[#A6A798] flex justify-between font-semibold text-lg my-4">
          <span>الإجمالي</span>
          <span>{Number(total) + 50} جنيه</span>
        </div>
        <ConfirmButton handleSubmit={handleSubmit} />
      </div>
    );
  };
  
  export default OrderSummary;
  