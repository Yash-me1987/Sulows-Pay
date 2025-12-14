export interface PaymentForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  upiId: string;
  qrCodeUrl: string;
  businessName: string;
  description: string;
  currency: "INR" | "USD" | "EUR" | "GBP";
  acceptInternational: boolean;
  createdAt: string;
}

export interface PaymentSubmission {
  formId: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  paymentMethod: "upi" | "card" | "netbanking" | "qr";
  transactionId?: string;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}
