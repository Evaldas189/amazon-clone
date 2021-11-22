import { useEffect, useState } from "react";
import Spinner from "../svg/Spinner";
import LoginModal from "./LoginModal";
import Product from "./Product";
import {
  AdjustmentsIcon
} from "@heroicons/react/outline";
import { selectFilter } from "../slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { resetFilter } from "../slices/filterSlice";

function ProductFeed({ products, searchValue, setOpenFilter }) {

  const [sortedProducts, setSortedProducts] = useState(products);
  const filter = useSelector(selectFilter);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let newProducts = [...products];
    if (searchValue !== "") {
      newProducts.sort(
        (a, b) =>
          b.category.toLowerCase().includes(searchValue.toLowerCase()) - a.category.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    setSortedProducts(newProducts);
  }, [searchValue])

   useEffect(() => {
    let newProducts = [...products];
    if (filter && searchValue === "") {

      if (
        filter?.keyword === "" &&
        filter?.minValue === "" &&
        filter?.maxValue === "" &&
        filter?.sort === ""
      ) {
        newProducts = products
      } else {
        if (filter?.keyword !== "") {
          let arr1;
          let arr2;
          newProducts = products.filter((product) =>
            product.title.toLowerCase().includes(filter.keyword.toLowerCase())
          );
          arr2 = products.filter((product) =>
            product.desc.toLowerCase().includes(filter.keyword.toLowerCase())
          );
          Array.prototype.push.apply(newProducts,arr2); 
        }
        if (filter?.minValue !== "") {
          newProducts = newProducts.filter(
            (product) => parseInt(product.price) >= parseInt(filter.minValue)
          );
        }
        if (filter?.maxValue !== "") {
          newProducts = newProducts.filter(
            (product) => parseInt(product.price) <= parseInt(filter.maxValue)
          );
        }

        if (filter?.sort !== "") {
          if (filter.sort === "1") {
            newProducts.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
          }
          else if (filter.sort === "2") {
            newProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
          }
          else if (filter.sort === "3") {
            newProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
          }
          else{
            newProducts.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
          }
        }
      }
      
      setLoading(true);
      setSortedProducts(newProducts);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }   
   }, [filter])

   useEffect(() => {
     dispatch(resetFilter())
   }, [router])


  return (
    <div className="relative grid-flow-row-dense grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
      <div
        onClick={() => setOpenFilter(true)}
        className="fixed z-40 top-1/2 -left-2 h-14 bg-red-600 rounded-r-full"
      >
        <AdjustmentsIcon
          className="h-9 p-2 text-yellow-400 transform rotate-90"
          style={{ marginTop: 10 }}
        />
      </div>
      {!loading ? (
        <>
          {sortedProducts
            ?.slice(0, 5)
            .map(({ id, title, price, desc, category, images }, index) => (
              <Product
                index={index}
                key={id}
                id={id}
                title={title}
                price={price}
                desc={desc}
                category={category}
                images={images[0]}
              />
            ))}
          {sortedProducts.length >= 8 && (
            <img
              className="hidden md:block md:col-span-full"
              src="https://cdn.buyee.jp/sliderbanner/amazon_amazonTopImage/en/1/index_en.png"
              alt=""
            />
          )}

          {sortedProducts
            ?.slice(5, products.length)
            .map(({ id, title, price, desc, category, images }, index) => (
              <Product
                index={index}
                key={id}
                id={id}
                title={title}
                price={price}
                desc={desc}
                category={category}
                images={images[0]}
              />
            ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default ProductFeed;
