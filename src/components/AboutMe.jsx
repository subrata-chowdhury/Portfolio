import React from 'react';
import '../style/AboutMe.css';
import SimpleArrow from '../Icons/SimpleArrow';

function AboutMe() {
    return (
        <div className="screen-container">
            <div className="heading" id="education">
                <div>About Me</div>
            </div>
            <div className='about-container'>
                <div className='sub-about-container'>
                    I am a final year Computer Science Engineering Student at Bengal College of Engineering and Technology.<br />
                    As a skilled web developer, I am proficient in HTML, CSS, JavaScript, and ReactJS.<br />
                    I've completed various projects, from AI-driven timetable creators to responsive web apps.<br /><br />
                    <div className='about-contact-details'>
                        <div>
                            <SimpleArrow /><span className='field'>Email:&nbsp;</span>subratachowdhury7000@gmail.com
                        </div>
                        <div>
                            <SimpleArrow /><span className='field'>Location:&nbsp;</span>West Bengal, India
                        </div>
                    </div><br />
                    <div className='points'>
                        - Adaptable quickly and organized well.<br />
                        - Interested in learning the latest web technologies quickly.<br />
                        - Able to Work well in teams as well as Individually<br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe;