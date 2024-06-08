"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const FilterByAmenities = () => {
  const [filterTerm, setFilterTerm] = useState([])

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const handleInputs = (event) => {
    event.preventDefault()

    const name = event.target.name
    const checked = event.target.checked

    if(checked) {
      setFilterTerm(prev => ([...prev, name]))
    } else {
      const filtered = filterTerm.filter(item => item !== name);
      setFilterTerm(filtered);
    }
  }

  // to catch amenities if searchParams has ame. term
  useEffect(() => {
    const amenities = params.get('amenities');

    if(amenities) {
      const decodedAmenities = decodeURI(amenities);
      const filterTermInAmenities = decodedAmenities.split('|');
      
      setFilterTerm(filterTermInAmenities);
    }
  }, [])

  // to fire input change
  useEffect(() => {
    if(filterTerm.length > 0) {
      params.set('amenities', encodeURI(filterTerm.join('|')))
    } else {
      params.delete('amenities');
    }

    replace(`${pathName}?${params.toString()}`);
  }, [filterTerm])

// console.log(filterTerm)
  return (
    <div>
      <h3 className="font-bold text-lg">Amenities</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="wifi">
          <input type="checkbox" name="wifi" id="wifi" checked={filterTerm.includes('wifi')} onChange={handleInputs} />
          Wi-fi
        </label>

        <label htmlFor="swimmingPool">
          <input type="checkbox" name="swimmingPool" id="swimmingPool" checked={filterTerm.includes('swimmingPool')} onChange={handleInputs}   />
          Swimming Pool
        </label>
        <label htmlFor="gym">
          <input type="checkbox" name="gym" id="gym" checked={filterTerm.includes('gym')} onChange={handleInputs} />
          Gym
        </label>
        <label htmlFor="golfClub">
          <input type="checkbox" name="golfClub" id="golfClub" checked={filterTerm.includes('golfClub')} onChange={handleInputs}  />
          Golf Club
        </label>
      </form>
    </div>
  )
}

export default FilterByAmenities
