import { prismaClient } from "../../database/prisma-client";

// Create
export async function createrOrder({ user, amount, side, type }) {
    const order = { user, amount, side, type };
    const orderEntity = await prismaClient.order.creater({ data: order });
    return orderEntity;
}

// Read
export async function getAllOrders() {
    return null;
}

export async function getOrdersFrom({ user }) {
    return null;
}

export async function getOrder({ id }) {
    return null;
}

// Delete
export async function deleteOrder({ user, side, type }) {
    return null;
}