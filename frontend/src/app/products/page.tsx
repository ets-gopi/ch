"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import Link from "next/link";
import React from "react";

const Products = () => {
  const productStore = useAppSelector((state) => state.products);
  console.log(productStore);

  return (
    <React.Fragment>
      <div>Products</div>
      <ul className="flex gap-1">
        {productStore.list.map((item, ind) => (
          <div key={item.id}>
            <p>{item.name}</p>
            <Link href={`/products/${item.id}`}>view</Link>
          </div>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Products;
