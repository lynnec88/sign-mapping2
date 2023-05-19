import React from 'react';

const About = () => {
  return (
    <div className="bg-about">
      <div className="container mt-5">
        <div className="about-p">
        <p className="fw-bold">About</p>
        <p>
        I learned full-stack web development to create a Sign Language website in future because I taught Chinese Sign Language to American deaf students and interpreters interested in Chinese culture on weekends. I couldn't continue due to a busy schedule. I noticed a lack of dedicated resources for American deaf students to learn Chinese Sign Language, so I decided to fill that gap. 
        </p>
        <p>
       The website includes a unique feature—a vocabulary chart—to expand vocabulary quickly. It also provides resources on both standard and regional variations of Sign Language to promote an understanding of the diversity of sign languages and communication with deaf people.
        </p>
        <p>
        Signs page shows signs of different categories and related signs. When you click one word Jump to detail, you will see a gif picture and a detailed explanation. Here you can also post and read reviews.If you wish to share this sign, click here for a link to share it. You can also post and read reviews here. 
        </p>
        <p>
        Additionally, included are quizzes. When you submit your answers. On the records page, you can see your quiz score and wrong answers. 
        </p>
        <p>
        Upon viewing the map page, you will see both common signs and regional signs displayed on the Google map. 
        </p>
        </div>
      </div>
    </div>
  );
};

export default About;
