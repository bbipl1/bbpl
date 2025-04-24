import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import MainServices from "../pages/services/MainService";
import home1 from "../../src/assets/home/home1.jpg";
import home2 from "../../src/assets/home/home2.jpg";
import home3 from "../../src/assets/home/home3.jpg";

const Home = () => {
  let imageURL = [home1,home2,home3];

  return (
    <div className="min-h-screen  w-full">
      {/* Hero Section */}

      <section className="bg-white text-black text-center relative">
        <div className="container mx-auto">
          <ImageSlider styles={"w-screen h-screen"} urls={imageURL}/>
        </div>
      </section>

      <MainServices />


      {/* Testimonials Section */}
      {/* <section className="py-16 bg-blue-50 text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="flex justify-center gap-8">
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
              <p className="text-xl italic mb-4">
                "This company helped us take our business to the next level!
                Highly recommended."
              </p>
              <p className="font-semibold">John Doe</p>
              <p className="text-gray-600">CEO, Example Corp</p>
            </div>
            <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg">
              <p className="text-xl italic mb-4">
                "Professional and reliable service. A true pleasure to work
                with."
              </p>
              <p className="font-semibold">Jane Smith</p>
              <p className="text-gray-600">Marketing Director, Acme Ltd.</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
