import prisma from '../configs/prisma.config.js';

export const getPaket = async (req, res, next) => {
  try {
    const paket = await prisma.paket.findMany();
    res.status(200).json({ status: 'success', data: paket });
  } catch (error) {
    next(error);
  }
};

export const getPaketById = async (req, res, next) => {
  try {
    const paket = await prisma.paket.findUnique({ where: { id_paket: Number(req.params.id) } });
    if (!paket) return res.status(404).json({ status: 'error', message: 'Not found' });
    res.status(200).json({ status: 'success', data: paket });
  } catch (error) {
    next(error);
  }
};

export const createPaket = async (req, res, next) => {
  try {
    const paket = await prisma.paket.create({ data: req.body });
    res.status(201).json({ status: 'success', data: paket });
  } catch (error) {
    next(error);
  }
};

export const updatePaket = async (req, res, next) => {
  try {
    const paket = await prisma.paket.update({
      where: { id_paket: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json({ status: 'success', data: paket });
  } catch (error) {
    next(error);
  }
};

export const deletePaket = async (req, res, next) => {
  try {
    await prisma.paket.delete({ where: { id_paket: Number(req.params.id) } });
    res.status(200).json({ status: 'success', message: 'Paket deleted successfully' });
  } catch (error) {
    next(error);
  }
};
