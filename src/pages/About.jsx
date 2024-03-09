import React from "react";

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 item-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          We Love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        obcaecati, vitae ad magni perspiciatis et consequuntur fugit tenetur
        quod odio facilis dolore corporis harum expedita consectetur?
        Repellendus tempora ut corrupti blanditiis doloribus modi error quae
        doloremque fugiat corporis. Repellendus, optio.
      </p>
    </>
  );
};

export default About;
