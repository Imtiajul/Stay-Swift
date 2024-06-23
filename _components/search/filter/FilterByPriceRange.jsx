"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


const FilterByPriceRange = () => {
  const [query, setQuery] = useState([])

  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  const handleInputs = (event) => {
    event.preventDefault()

    const name = event.target.name
    const checked = event.target.checked

    if (checked) {
      setQuery((prev) => [...prev, name])
    } else {
      const filtered = query.filter((item) => item !== name)
      setQuery(filtered)
    }
  }
  // after first mount if search term has category params
  useEffect(() => {
    const category = params.get("priceRange")

    if (category) {
      const decodedCategory = decodeURI(category)
      const queryInCategory = decodedCategory.split("|")

      setQuery(queryInCategory)
    }
  }, [])

  // immediate fire after input change
  useEffect(() => {
    if (query.length > 0) {
      params.set("priceRange", encodeURI(query.join("|")))
    } else {
      params.delete("priceRange")
    }
    
    replace(`${pathName}?${params.toString()}`)
  }, [query])

  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="1">
          <input type="checkbox" name="1" id="1" checked={query.includes("1")} onChange={handleInputs} />$ 250 - $ 350
        </label>

        <label htmlFor="2">
          <input type="checkbox" name="2" id="2" checked={query.includes("2")} onChange={handleInputs} />$ 350 - $ 450
        </label>

        <label htmlFor="3">
          <input type="checkbox" name="3" id="3"  checked={query.includes("3")} onChange={handleInputs}/>$ 450 - $ 550
        </label>

        <label htmlFor="4">
          <input type="checkbox" name="4" id="4" checked={query.includes("4")} onChange={handleInputs}/>$ 550 - $ 650
        </label>

        <label htmlFor="5">
          <input type="checkbox" name="5" id="5" checked={query.includes("5")} onChange={handleInputs} />$ 650 - $ 750
        </label>

        <label htmlFor="6">
          <input type="checkbox" name="6" id="6" checked={query.includes("6")} onChange={handleInputs} />$ 750+
        </label>
      </form>
    </div>
  )
}

export default FilterByPriceRange
