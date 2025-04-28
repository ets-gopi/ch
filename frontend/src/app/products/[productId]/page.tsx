"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import {
  getProductById,
  setProductNameById,
} from "@/lib/redux/slices/product.slice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { number } from "zod";

const UpdateProductName = ({
  product,
}: {
  product: { id: number; name: string };
}) => {
  const dispatch = useAppDispatch();
  const productStore = useAppSelector((state) => state.products);
  return (
    <input
      value={
        productStore.list.find((item, ind) => item.id === product.id)?.name
      }
      onChange={(e) => {
        dispatch(
          setProductNameById({ productId: product.id, name: e.target.value })
        );
      }}
    />
  );
};
const ProductPageById = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const productStore = useAppSelector((state) => state.products);
  console.log(params);
  useEffect(() => {
    if (params.productId) {
      dispatch(getProductById(Number(params.productId)));
    }
  }, [dispatch]);

  return (
    <>
      <div>ProductView</div>
      {productStore.selectedProduct && (
        <>
          <p>{productStore.selectedProduct.name}</p>
          <UpdateProductName product={productStore.selectedProduct} />
        </>
      )}
    </>
  );
};

export default ProductPageById;
