import Image from "next/image"

const Gallery = ({ gallery }) => {
  // console.log(gallery)
  const newGallery = [...gallery]
  newGallery.shift()
  return (
    <section className="container">
      <div className="grid grid-cols-2 imageshowCase">
        <Image
          src={gallery[0]}
          width={624}
          height={400}
          className="h-[400px]"
          alt="Gallery image 1"
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px]">
          {newGallery.map((img, i) => (
            <Image
              key={img}
              src={img}
              alt={`Gallery Image ${i}`}
              width={312}
              height={200}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
