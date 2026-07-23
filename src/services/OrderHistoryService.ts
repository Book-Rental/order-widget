import { Order } from "../types/orderHistory";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrdersByUserId = async (
  userId:string
):Promise<Order[]> => {

  const response = await fetch(
    `${API_URL}/api/order/getByUserId/${userId}?limit=1`
  );


  if(!response.ok){
    throw new Error("Failed to fetch orders");
  }


  const result = await response.json();


  return result?.data?.orders ?? [];

};