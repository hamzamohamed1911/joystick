const ConfirmButton = ({ handleSubmit }) => {
    return (
      <button
        className="w-full text-center py-3 my-2 bg-primary text-white rounded-lg"
        onClick={handleSubmit}
      >
        استكمال عملية الشراء
      </button>
    );
  };
  
  export default ConfirmButton;
  