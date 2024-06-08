import ProfileInfo from "@/_components/user/ProfileInfo";
import PastBooking from "@/_components/user/booking/PastBooking";
import UpcomingBooking from "@/_components/user/booking/UpcomingBooking";
import { getBookingByUserId, getUserByEmail } from "@/_models/queries";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const BookingsPage = async() => {
    const session = await auth();
    if(!session) {
      redirect('/login');
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);
    
    const bookings = await getBookingByUserId(loggedInUser.id);

    const pastBookings = bookings.filter(booking => {
        return (new Date().getTime() >= new Date(booking.checkin).getTime());
    })

    const upCommingBookings = bookings.filter(booking => {
        return (new Date().getTime() <= new Date(booking.checkin).getTime());
    })

    // console.log('pastBooking', pastBookings);
    // console.log('upcomming', upCommingBookings);

    return (
        <>
            <section className="mt-[100px]">
                <div className="container">
                    <ProfileInfo />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PastBooking bookings={pastBookings} />
                        <UpcomingBooking bookings={upCommingBookings} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookingsPage;
