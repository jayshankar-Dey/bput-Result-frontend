/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


const Recheching_Rows = ({item}) => {
    console.log(item)
    const{
        _id,
        semistarID,
        subjects,
        collage,
        name,
        reg,
        price,
        semistar,
        payment,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        createdAt,
        updatedAt,
      }=item

    
  return (
    <div className="md:w-[60rem] flex flex-col md:flex-row justify-between p-2 bg-white shadow border *:leading-8">
             <div>
             <h1>semistarID:({semistarID})</h1>
             <h1>Total subjects: {subjects.length}</h1>
             {
                subjects.map((subject,i)=>(
                  <h1 className="font-semibold  bg-orange-100 underline text-blue-500" key={i}>{subject}</h1>
                ))
             }
             <h1>collage: {collage}</h1>
             <h1>name: {name}</h1>
             </div>
             <div>
             <h1>reg: {reg}</h1>
             <h1>price : {price}</h1>
             <h1>semistar: {semistar}</h1>
             <h1 className="underline">payment:- {payment?<span className="text-green-500 font-bold ">success</span>:<span className="text-red-500 font-bold">failed</span>}</h1>
             </div>
             <div>
             <h1>payment_id:- ( {razorpay_payment_id} )</h1>
             <h1>order_id:- ( {razorpay_order_id} )</h1>
             <h1>createdAt:- ( { Date(createdAt).split("GMT")[0]} )</h1>
             <h1>updatedAt:- ( {Date(updatedAt).split("GMT")[0]} )</h1>
             </div>
            </div>
  )
}

export default Recheching_Rows
