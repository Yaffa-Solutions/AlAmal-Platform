type OTPResponse = {
  message: string;
  error?: string;
};

const sendOTP = async (
  email: string
): Promise<{ status: number; data: OTPResponse }> => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/otp/request`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email }),
      credentials: "include",
    }
  );
  const data = await res.json();
  return { status: res.status, data };
};

export default sendOTP;
