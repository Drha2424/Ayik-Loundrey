import prisma from '../configs/prisma.config.js';

export const getOrderan = async (req, res, next) => {
  try {
    const orderan = await prisma.orderan.findMany({
      include: { layanan: true, paket: true }
    });
    res.status(200).json({ status: 'success', data: orderan });
  } catch (error) {
    next(error);
  }
};

export const getOrderanById = async (req, res, next) => {
  try {
    const orderan = await prisma.orderan.findUnique({
      where: { id_orderan: Number(req.params.id) },
      include: { layanan: true, paket: true }
    });
    if (!orderan) return res.status(404).json({ status: 'error', message: 'Not found' });
    res.status(200).json({ status: 'success', data: orderan });
  } catch (error) {
    next(error);
  }
};

export const createOrderan = async (req, res, next) => {
  try {
    const orderan = await prisma.orderan.create({ data: req.body });
    res.status(201).json({ status: 'success', data: orderan });
  } catch (error) {
    next(error);
  }
};

export const updateOrderan = async (req, res, next) => {
  try {
    const orderan = await prisma.orderan.update({
      where: { id_orderan: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json({ status: 'success', data: orderan });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderan = async (req, res, next) => {
  try {
    await prisma.orderan.delete({ where: { id_orderan: Number(req.params.id) } });
    res.status(200).json({ status: 'success', message: 'Orderan deleted successfully' });
  } catch (error) {
    next(error);
  }
};
