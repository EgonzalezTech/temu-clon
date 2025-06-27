import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import {
  getCategoryBySlug,
  getProductsByCategorySlug,
} from "@/sanity/lib/client";
import React from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategorySlug(slug),
  ]);

  return (
    <div>
      <SalesCampaignBanner />

      <div className="bg-red-50 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-2">
            {category.title} - UP TO 90% OFF! 🔥
          </h1>
          <p className="text-center text-red-500 text-sm md:text-base animate-pulse">
            ⚡️ Flash Sale Ending Soon! ⏰ Limited Time Only
          </p>
          <p className="text-center text-gray-600 text-xs mt-2">
            {category.description}
          </p>
        </div>
      </div>

      {/* Guarantee Items adaptados para modo oscuro */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 dark:from-yellow-900/20 dark:to-yellow-900/30 py-3 transition-colors duration-300">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 dark:text-yellow-400 text-xl">
                🚚
              </span>
              <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                Free Shipping
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 dark:text-yellow-400 text-xl">
                ⭐️
              </span>
              <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                Top Rated
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 dark:text-yellow-400 text-xl">
                💰
              </span>
              <span className="text-yellow-700 dark:text-yellow-300 font-medium">
                Best Prices
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            🎉 {products.length} Amazing Deals Available Now!
          </p>
        </div>

        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default CategoryPage;
