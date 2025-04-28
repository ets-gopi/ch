"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { increment } from "@/lib/redux/slices/counter.slice";
import Link from "next/link";
import React from "react";

export default function Home() {
  const counterStore = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  console.log(counterStore);

  return (
    <React.Fragment>
      <div>hello world</div>
      <p>{counterStore.value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button>-</button>
      <Link href="/products">Products</Link>
    </React.Fragment>
  );
}
