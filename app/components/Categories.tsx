import Link from "next/link";

const Categories = () => {
  const categories = [
    {
      name: "Top Offers",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/698ba0cebe456aaf.jpg?q=100",
      link: "/products",
    },
    {
      name: "Electronics",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/4da1d0d19350cc84.jpg?q=100",
      link: "/products",
    },
    {
      name: "Fashion",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/9d4e9c605fc1d2d3.jpg?q=100",
      link: "/products",
    },
    {
      name: "Home & Kitchen",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/5b813b64a3179898.jpg?q=100",
      link: "/products",
    },
    {
      name: "Furniture",
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/128/128/image/7a5e96c10ada8a56.jpg?q=100",
      link: "/products",
    },
  ];

  return (
    <div className="py-8 bg-white shadow-md">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {categories.map((category) => (
          <Link
            href={category.link}
            key={category.name}
            className="flex flex-col items-center group"
          >
            <div className="w-16 h-16 mb-2">
              <picture>
                <img
                  src={category.image}
                  alt={category.name}
                  width={800}
                  height={500}
                />
              </picture>
            </div>
            <span className="text-center text-sm font-medium text-gray-700 group-hover:text-blue-600">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
