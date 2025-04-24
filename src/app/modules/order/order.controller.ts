import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { orderServices } from './order.service';
import { stripe } from '../../config';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.createOrderIntoDB(
    req.body,
    req.user
  );

  console.log(result);

  res.status(201).json({
    success: true,
    message: 'Order created succesfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getAllOrdersFromDB(req.query);

  res.status(200).json({
    success: true,
    message: 'All orders retrieved successfully',
    data: result,
  });
});

const getOrderDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getOrderDetailsFromDB(req.params.orderId);

  res.status(200).json({
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getMyOrdersFromDB(
    req.query,
    req.user
  );

  res.status(200).json({
    success: true,
    message: 'Order retrive succesfully',
    data: result,
  });
});

const createCheckoutSession = catchAsync(async (req, res) => {
  const { items } = req.body;
  console.log(items)

  const lineItems = items.map((item: any) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity || 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_LOCAL_URL}/success`,
    cancel_url: `${process.env.CLIENT_LOCAL_URL}/cancel`,
  });

  res.json({ sessionId: session.id });
});

export const orderController = {
  createOrder,
  getOrderDetails,
  getMyOrders,
  createCheckoutSession,
  getAllOrders,
};
