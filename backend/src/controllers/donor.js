import { createDonor } from '../services/donorCreate.js';
import { donorSchema } from '../validation/donor.js';
import prisma from '../config/db.js';


export const createDonorController = async (req, res, next) => {
    try {
        const validation = donorSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ error: validation.error.issues[0].message });
        }
        const { name, phone, country, gender } = validation.data;
        const userId = req.user.id;

        const donor = await createDonor(userId, validation.data);
        await prisma.user.update({
            where: { id: userId },
            data: { status: 'ACTIVE' },
        });

        res.status(201).json({ message: 'Donor created successfully', donor });
    } catch (err) {
        console.error('Error in createDonorController:', err);
        next(err);
    }
};

export const getDonorByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const donor = await prisma.donor.findUnique({ where: { user_id: Number(userId) } });
    if (!donor) return res.status(404).json({ message: 'Donor not found' });
    res.json({ donorId: donor.id });
  } catch (err) {
    next(err);
  }
};
