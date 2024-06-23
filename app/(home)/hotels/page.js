import HotelList from "@/_components/hotel/HotelList";
import Filter from "@/_components/search/filter/Filter";
import Search from "@/_components/search/Search";

const refineCategory = (category) => {
    const decodedCategory = decodeURI(category);

    if(decodedCategory === 'undefined') {
        return "";
    }
    return decodedCategory.split('|');
}


const HotelListPage = async({searchParams: {destination, checkin, checkout, category, amenities, sortBy, priceRange}}) => {

    // console.log(amenities);

    return (
        <>
            <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
                <div className="container items-center py-12 ">
                    <Search fromHotelList={true} distination={destination} checkin={checkin} checkout={checkout} />
                </div>
            </section>
            <section className="py-12">
                <div className="container grid grid-cols-12">
                    <Filter />
                    <HotelList category={refineCategory(category)} destination={destination} checkin={checkin} checkout={checkout} amenities={refineCategory(amenities)} sortBy={sortBy} priceRange={priceRange} />
                </div>
            </section>
        </>
    );
};

export default HotelListPage;
