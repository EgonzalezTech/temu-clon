"use client";

import { createCheckoutSession } from "@/actions/stripe-actions";
import { formatPrice } from "@/lib/utils";
import {
  useCartStore,
  type CartItem as CartItemType,
} from "@/stores/cart-store";
import { Loader2, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";

const freeShippingAmount = 15; // $15 for free shipping

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeItem, updateQuantity } = useCartStore(
    useShallow((state) => ({
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
    }))
  );

  const isFreeItem = item.price === 0;

  return (
    <div
      key={`cart-item-${item.id}`}
      className="flex gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {item.title}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isFreeItem ? (
            <span className="text-emerald-600 font-medium">FREE</span>
          ) : (
            formatPrice(item.price)
          )}
        </div>
        <div className="flex items-center gap-3 mt-2">
          {isFreeItem ? (
            <div className="text-sm text-emerald-600 font-medium">
              Prize Item
            </div>
          ) : (
            <>
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="border rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={`cart-qty-slct-${item.id}-${num}`} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600 dark:hover:text-red-400 text-sm"
              >
                Remove
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    cartId,
    removeItem,
    updateQuantity,
    items,
    close,
    isOpen,
    syncWithUser,
    setLoaded,
    getTotalPrice,
    getTotalItems,
  } = useCartStore(
    useShallow((state) => ({
      cartId: state.cartId,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      items: state.items,
      close: state.close,
      isOpen: state.isOpen,
      syncWithUser: state.syncWithUser,
      setLoaded: state.setLoaded,
      getTotalPrice: state.getTotalPrice,
      getTotalItems: state.getTotalItems,
    }))
  );

  useEffect(() => {
    const initCart = async () => {
      await useCartStore.persist.rehydrate();
      await syncWithUser();
      setLoaded(true);
    };

    initCart();
  }, []);

  const [loadingProceed, setLoadingProceed] = useState<boolean>(false);
  const handleProceedToCheckout = async () => {
    if (!cartId || loadingProceed) {
      return;
    }
    setLoadingProceed(true);

    const checkoutUrl = await createCheckoutSession(cartId);

    try {
      const anyWindow = window as any;

      if (anyWindow.umami) {
        anyWindow.umami.track("proceed_to_checkout", {
          cartId: cartId,
          totalPrice: getTotalPrice(),
          currency: "USD",
        });
      }
    } catch (e) {}

    window.location.href = checkoutUrl;

    setLoadingProceed(false);
  };

  const totalPrice = getTotalPrice();

  const remainingForFreeShipping = useMemo(() => {
    return Math.max(0, freeShippingAmount - totalPrice);
  }, [totalPrice]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 transition-opacity backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`
          fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 shadow-2xl
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 animate-bounce text-gray-900 dark:text-gray-100" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Shopping Cart
              </h2>
              <span className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-900 dark:text-gray-100" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400 dark:text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Looks like you have not added any items to your cart yet!
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <CartItem key={"cart-item-" + item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700">
              {/* Shipping progress */}
              {remainingForFreeShipping > 0 ? (
                <div className="p-4 bg-blue-50 dark:bg-blue-900 border-b border-blue-200 dark:border-blue-700">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
                    <span>🚚</span>
                    <span className="font-medium">
                      {`Add ${formatPrice(
                        remainingForFreeShipping
                      )} more for FREE shipping`}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(
                          100,
                          (totalPrice / freeShippingAmount) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-green-50 dark:bg-green-900 border-b border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-300">
                    <span>✨</span>
                    <span>You have unlocked FREE shipping!</span>
                  </div>
                </div>
              )}

              {/* Order summary & checkout */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-medium">
                      {remainingForFreeShipping > 0
                        ? "Calculated at checkout"
                        : "FREE"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-lg">Total</span>
                    <span className="font-bold text-lg">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <button
                    className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-900 transition-colors flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed"
                    onClick={handleProceedToCheckout}
                    disabled={loadingProceed}
                  >
                    {loadingProceed ? (
                      <div className="flex items-center gap-1">
                        Navigating to checkout...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>🔒</span>
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>🔄</span>
                      <span>30-day returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>💳</span>
                      <span>All major payment methods accepted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
