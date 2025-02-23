import ProductsTabs from "./ProductsTabs";

const OurProducts = () => {
  return (
    <section className="lg:max-w-screen-2xl w-full container mx-auto py-6 flex flex-col justify-center items-center p-4">
      <h1 className="font-bold text-2xl py-4">منتجاتنا</h1>
      <ProductsTabs />
    </section>
  );
};

export default OurProducts;
