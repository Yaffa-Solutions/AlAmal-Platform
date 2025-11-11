import prisma from '../config/db.js';

export const assignRoleToUser = async (userId, role) => {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
        })
        return {
            message: 'role assigned successfully',
            userId: user.id,
            role: user.role
        }
    }
    catch (err) {
        console.error('error in assignRoleToUser:', err);
        throw err

    }
}