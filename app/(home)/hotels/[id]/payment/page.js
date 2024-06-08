import PaymentForm from "@/_components/payment/PaymentForm";
import { getHotelById, getUserByEmail } from "@/_models/queries";
import { getDayDifference } from "@/_utils/data-utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const PaymentPage = async({params: {id}, searchParams: {checkin, checkout}}) => {
  const session = await auth();
  if(!session) {
    redirect('/login');
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  // console.log(loggedInUser);

  const hotelInfo = await getHotelById(id, checkin, checkout);
  // console.log('hotelblue', hotelInfo);
  
  const hasCheckinCheckout = checkin && checkout;
  
  let totalDay = 1;
  if(hasCheckinCheckout) {
   totalDay = Math.ceil(getDayDifference(checkin, checkout));
  }

  let cost = (totalDay * (hotelInfo?.highRate + hotelInfo?.lowRate) / 2).toFixed(2);

  return (
    <section className="container">
      <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
        <h1 className="font-bold text-2xl">Payment Details</h1>
        <p className="text-gray-600 text-sm">You have picked <b>{hotelInfo?.name}</b> and base price is <b>${cost}</b> {hasCheckinCheckout && `for ${totalDay} day(s).`}
        </p>
        <PaymentForm loggedInUser={loggedInUser} hotelInfo={hotelInfo} checkin={checkin} checkout={checkout} totalCost={cost}/>
      </div>
    </section>
  )
}

export default PaymentPage