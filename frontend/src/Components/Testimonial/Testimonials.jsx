import React, { useEffect, useState } from 'react';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('testimonials.json')
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error('Error fetching testimonials:', error));
  }, []);

  return (
    <section className="bg-gray-100/10 py-14">
      <h2 className="text-3xl font-bold mt-5 text-center mb-8">What Our Users Say</h2>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className=" bg-black/10 border-t-2 border-blue-400 shadow-xl rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <div className="ml-4">
                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                <p className="text-yellow-500 text-sm font-medium">
                  {'★'.repeat(Math.round(testimonial.rating)) + '☆'.repeat(5 - Math.round(testimonial.rating))}
                </p>
              </div>
            </div>
            <p className="">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
