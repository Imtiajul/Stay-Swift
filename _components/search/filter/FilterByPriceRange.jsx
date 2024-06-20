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
    const category = params.get("category")

    if (category) {
      const decodedCategory = decodeURI(category)
      const queryInCategory = decodedCategory.split("|")

      setQuery(queryInCategory)
    }
  }, [])

  // immediate fire after input change
  useEffect(() => {
    if (query.length > 0) {
      params.set("category", encodeURI(query.join("|")))
    } else {
      params.delete("category")
    }
    
    replace(`${pathName}?${params.toString()}`)
  }, [query])

  // console.log(query)
  return (
    <div>
      <h3 className="font-bold text-lg">Price Range</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="range1">
          <input type="checkbox" name="range1" id="range1" />$ 250 - $ 350
        </label>

        <label htmlFor="range2">
          <input type="checkbox" name="range2" id="range2" />$ 350 - $ 450
        </label>

        <label htmlFor="range3">
          <input type="checkbox" name="range3" id="range3" />$ 450 - $ 550
        </label>

        <label htmlFor="range3">
          <input type="checkbox" name="range4" id="range3" />$ 550 - $ 650
        </label>

        <label htmlFor="range4">
          <input type="checkbox" name="range5" id="range4" />$ 650 - $ 750
        </label>

        <label htmlFor="range5">
          <input type="checkbox" name="range6" id="range5" />$ 750+
        </label>
      </form>
    </div>
  )
}

export default FilterByPriceRange
