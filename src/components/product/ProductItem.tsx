"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-2 right-2 z-10">
       <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce'>HOT!</span>
         
        
      </div>

      <div className="relative h-48 w-full">
        {product.image && (
          <Image
            src={urlFor(product.image).width(256).url()}
            alt={product.title || "Product Image"}
            fill
            className="object-contain p-2"
            loading="lazy"
          />
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 h-10 mb-1">
          {product.title}
        </h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-500 dark:text-red-400">
              ${(product.price || 0).toFixed(2)}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
              ${((product.price || 0) * 5).toFixed(2)}
            </span>
          </div>
          <div className="text-xs font-semibold mb-2 text-green-600 dark:text-green-400">
            🔥{" "}
            {100 +
              Math.abs(
                product._id
                  .split("")
                  .reduce((acc, char) => acc + char.charCodeAt(0), 0) % 500
              )}{" "}
            + sold in last 24h
          </div>
          <Link
            href={`/product/${product._id}`}
            className="w-full text-center bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-700 dark:to-orange-600 text-white py-2 rounded-full text-sm font-bold hover:brightness-110 transition-all"
          >
            GRAB IT NOW!
          </Link>
          <div className="text-xs text-red-500 dark:text-red-400 text-center mt-1 animate-pulse">
            ⚡ Limited time offer!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
