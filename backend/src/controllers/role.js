import { assignRoleToUser } from "../services/role.js";

export const assignRoleController = async (req, res,next) => {
    try {
        const { role } = req.body;
        const userId = req.user.id;
        if (!role) {
            return res.status(400).json({ error: 'role is required' });
        }
        const updatedUser = await assignRoleToUser(userId, role);
        return res.status(200).json({
            message: 'role assigned successfully',
            userId:updatedUser.userId,
            role:updatedUser.role
        })
    } catch (err) {
        console.error('error in assignRoleController:', err);
        next(err)
        
    }
}