import { getCurrentSession } from "@/actions/auth";
import { getWheelOfFortuneConfiguration } from "@/actions/wheel-of-fortune-actions";
import { ThemeContextProvider } from "@/components/Contexts/ThemeContext";
import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import WheelOfFortune from "@/components/layout/WheelOfFortune";
import ProductGrid from "@/components/product/ProductGrid";
import Theme from "@/components/Theme/Theme";
import { getAllProducts } from "@/sanity/lib/client";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const Home = async () => {
  const { user } = await getCurrentSession();

  const products = await getAllProducts();

  const { randomProducts, winningIndex } =
    await getWheelOfFortuneConfiguration();

  return (
    <div>
      <ThemeContextProvider>
        <SalesCampaignBanner />
        <WheelOfFortune products={randomProducts} winningIndex={winningIndex} />

        <section className="container mx-auto py-8">
          <ProductGrid products={products} />
        </section>
        <Theme />
        <ScrollToTopButton />
      </ThemeContextProvider>
    </div>
  );
};

export default Home;
