export const logoutController = (req, res) => {
  res.clearCookie('token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/', 
  });

  res.status(200).json({ message: 'Logged out' });
};
