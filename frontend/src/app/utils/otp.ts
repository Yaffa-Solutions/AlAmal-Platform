const sendOTP=(email:string):Promise<{status:number; data:any}> =>{
    return fetch('http://localhost:4000/api/otp/request',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username:email})
    })
    .then((res:Response)=>{
      const status = res.status
      return res.json().then((data:string) => ({ status, data }))
    })

}
export default sendOTP;