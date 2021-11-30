import { useEffect, useState } from "react";
import db from "../../firebase";
import { addToBasket } from "../slices/basketSlice";
import { addToUserSearch } from "../slices/userSearchSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Header from "../components/Header";
import moment from "moment";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";


const MAX_RATING = 5;
const MIN_RATING = 1;

function product({products, product}) {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const router = useRouter();
  const [mainImage, setMainImage] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
   setMainImage(product.images[0])
  }, [product])

  useEffect(() => {
   dispatch(addToUserSearch(product.category))
  }, [])

  const addItemToBasket = () => {
    
    const newProduct = {
      ...product,
      quantity: 1,
      images: product.images[0]
    }
    dispatch(addToBasket(newProduct));
    toast("Added to the cart!");
  };
  return (
    <div>
      <Header products={products} />
      <div>
        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 py-8 sm:py-15 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
              <div className="sm:w-1/2 xl:w-1/3 w-full sm:h-full max-h-72 md:max-h-full">
                <img
                  alt="ecommerce"
                  className="object-contain shadow-md object-center rounded p-2 border w-full h-96 border-gray-200 max-h-72 md:max-h-96"
                  src={mainImage}
                />
                <div className="flex flex-row mt-2 mr-0 ml-0">
                  {product.images.map((image) => (
                    <img
                      onClick={() => setMainImage(image)}
                      alt="ecommerce"
                      className={`object-contain ${
                        image === mainImage ? "border-red-600" : ""
                      }
                    py-2 cursor-pointer object-center rounded mx-1 shadow-md my-1 border w-full border-gray-200  max-h-20 md:max-h-20`}
                      src={image}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 w-full lg:pl-10  mt-36 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {product.category}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">{rating} Stars</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed">{product.desc}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    $58.00
                  </span>
                  <button
                    onClick={addItemToBasket}
                    style={{backgroundColor: "#0a8fad"}}
                    className="flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded"
                  >
                    Add To Cart
                  </button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h1 className="justify-self-center text-lg text-center pb-4">You may also like:</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center mr-10 ml-10 mb-10">
            {products
              .filter(
                (prod) =>
                  prod.category === product.category && prod.id !== product.id
              )
              .slice(0, 4)
              .map((p) => (
                <div onClick={() => {
                  router.push({
                    pathname: "/product",
                    query: { id: p.id },
                  });
                }} className="flex cursor-pointer flex-col max-w-md sm:max-w-xs m-4 w-full sm:w-1/4  shadow-md border border-gray-200 justify-center items-center">
                  <img
                    alt="ecommerce"
                    className={`object-contain
                    py-2 object-center rounded mx-1 my-1 w-ful max-h-44 md:max-h-28`}
                    src={p.images[0]}
                  />
                  <p className="p-4 my-2 line-clamp-2 pb-0">{p.title}</p>
                  <div className="mb-2 md:mb-5 font-bold text-red-700 pt-2">
                  <Currency quantity={p.price} currency="EUR" />
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default product;

export async function getServerSideProps(context) {
  const firebaseItems = await db.collection("items").orderBy("timestamp", "desc").get();

  const products = await Promise.all(
    firebaseItems.docs.map(async (item) => ({
      id: item.id,
      title: item.data().title,
      images: item.data().images,
      desc: item.data().desc,
      price: item.data().price,
      category: item.data().category,
      timestamp: moment(item.data().timestamp.toDate()).unix(),
    }))
  );

  const product = products.find(prod => prod.id === context.query.id)

  return { props: { products, product } };
}
