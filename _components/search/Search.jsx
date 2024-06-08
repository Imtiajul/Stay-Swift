"use client"

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const Search = ({fromHotelList, destination, checkin, checkout}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();

  const [searchTerm, setSearchTerm] = useState({
    destination: destination || 'Puglia', 
    checkin: checkin,
    checkout: checkout, 
  });
  const [allowSearch, setAllowSearch] = useState(true);

  const handleInputs =(e)=> {
    const name = e.target.name;
    const value = e.target.value;

    const state = {...searchTerm, [name]: value};

    if(new Date(state.checkin).getTime() > new Date(state.checkout).getTime()) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }

    setSearchTerm(state);
  }

  const doSearch = (event) => {
    const params = new URLSearchParams(searchParams);

    params.set('destination', searchTerm?.destination || 'all');

    if(searchTerm?.checkin && searchTerm?.checkout) {
      params.set('checkin', searchTerm?.checkin);
      params.set('checkout', searchTerm?.checkout);
    }

    if(pathName.includes('hotels')) {
      replace(`${pathName}?${params.toString()}`);
    } else {
      replace(`${pathName}hotels?${params.toString()}`);
    }
  }

  return (
    <>
      <div className="lg:max-h-[250px] mt-6">
        <div id="searchParams" className={fromHotelList && "!shadow-none"}>
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select name="destination" defaultValue={searchTerm.destination} id="destination" onChange={handleInputs}>
                <option value="Puglia">Puglia</option>
                <option value="Catania">Catania</option>
                <option value="Palermo">Palermo</option>
                <option value="Frejus">Frejus</option>
                <option value="Paris">Paris</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input type="date" name="checkin" id="checkin" value={searchTerm.checkin} onChange={handleInputs} />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input type="date" name="checkout" id="checkout" value={searchTerm.checkout} onChange={handleInputs} />
            </h4>
          </div>
        </div>
      </div>

      <button className="search-btn disabled:bg-gray-500 disabled:cursor-default" disabled={!allowSearch} onClick={doSearch}>🔍️ {fromHotelList ? "Modify Search": "Search"}</button>
    </>
  );
};

export default Search;
