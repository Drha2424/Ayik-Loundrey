import prisma from '../configs/prisma.config.js';

export const getLayanan = async (req, res, next) => {
  try {
    const layanan = await prisma.layanan.findMany();
    res.status(200).json({ status: 'success', data: layanan });
  } catch (error) {
    next(error);
  }
};

export const getLayananById = async (req, res, next) => {
  try {
    const layanan = await prisma.layanan.findUnique({ where: { id_layanan: Number(req.params.id) } });
    if (!layanan) return res.status(404).json({ status: 'error', message: 'Not found' });
    res.status(200).json({ status: 'success', data: layanan });
  } catch (error) {
    next(error);
  }
};

export const createLayanan = async (req, res, next) => {
  try {
    const layanan = await prisma.layanan.create({ data: req.body });
    res.status(201).json({ status: 'success', data: layanan });
  } catch (error) {
    next(error);
  }
};

export const updateLayanan = async (req, res, next) => {
  try {
    const layanan = await prisma.layanan.update({
      where: { id_layanan: Number(req.params.id) },
      data: req.body
    });
    res.status(200).json({ status: 'success', data: layanan });
  } catch (error) {
    next(error);
  }
};

export const deleteLayanan = async (req, res, next) => {
  try {
    await prisma.layanan.delete({ where: { id_layanan: Number(req.params.id) } });
    res.status(200).json({ status: 'success', message: 'Layanan deleted successfully' });
  } catch (error) {
    next(error);
  }
};
