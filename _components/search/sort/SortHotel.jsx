"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SortHotel = () => {
  const [sortByPrice, setSortByPrice] = useState("")

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const handleInputs = (e) => {
    setSortByPrice(e.target.value)
  }
    

  // after first mount if search term has category params
  useEffect(() => {
    const sorting = params.get("sortBy")

    if (sorting) {
      const decodedSort = decodeURI(sorting)
      setSortByPrice(decodedSort)
    }
  }, [])

  // immediate fire after input change
  useEffect(() => {
    if (sortByPrice.length > 0) {
      params.set("sortBy", encodeURI(sortByPrice))
    } else {
      params.delete("sortBy")
    }

    replace(`${pathName}?${params.toString()}`)
  }, [sortByPrice])


  return (
    <div>
      <h3 className="font-bold text-lg">Sort By</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="highToLow">
          <input
            type="radio"
            name="priceSorting"
            value="highToLow"
            checked={sortByPrice === "highToLow"}
            id="highToLow"
            onChange={handleInputs}
          /> {" "}
          Price High to Low
        </label>

        <label htmlFor="lowToHigh">
          <input
            type="radio"
            name="priceSorting"
            value="lowToHigh"
            checked={sortByPrice === "lowToHigh"}
            id="lowToHigh"
            onChange={handleInputs} />{" "}
          Price Low to high
        </label>
      </form>
    </div>
  )
}

export default SortHotel
