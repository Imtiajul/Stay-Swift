"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const FilterByStarCategory = () => {
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
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        <label htmlFor="fiveStar">
          <input
            type="checkbox"
            id="fiveStar"
            name="5"
            checked={query.includes("5")}
            onChange={handleInputs}
          />
          5 Star
        </label>

        <label htmlFor="fourStar">
          <input
            type="checkbox"
            id="fourStar"
            name="4"
            checked={query.includes("4")}
            onChange={handleInputs}
          />
          4 Star
        </label>

        <label htmlFor="threeStar">
          <input
            type="checkbox"
            id="threeStar"
            name="3"
            checked={query.includes("3")}
            onChange={handleInputs}
          />
          3 Star
        </label>

        <label htmlFor="twoStar">
          <input
            type="checkbox"
            id="twoStar"
            name="2"
            checked={query.includes("2")}
            onChange={handleInputs}
          />
          2 Star
        </label>

        <label htmlFor="oneStar">
          <input
            type="checkbox"
            id="oneStar"
            name="1"
            checked={query.includes("1")}
            onChange={handleInputs}
          />
          1 Star
        </label>
      </form>
    </div>
  )
}

export default FilterByStarCategory
