
/**
 * Simulates payment processing
 * Returns a promise that resolves to true after a delay
 */
export const simulatePaymentProcessing = async (): Promise<boolean> => {
  // This is a simulation that always succeeds after a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo mode: all payments succeed
      resolve(true);
    }, 1500);
  });
};

/**
 * Calculate prices for checkout
 */
export const calculatePrices = (subtotal: number): {
  subtotal: number;
  shippingPrice: number;
  taxAmount: number;
  orderTotal: number;
} => {
  const shippingPrice = subtotal > 50 ? 0 : 5.99;
  const taxRate = 0.0725; // 7.25% tax rate
  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingPrice + taxAmount;

  return {
    subtotal,
    shippingPrice,
    taxAmount,
    orderTotal
  };
};
