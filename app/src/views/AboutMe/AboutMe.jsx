import React from 'react';
import './AboutMe.scss';

const AboutMeView = function (props) {
    return (
        <div id="aboutme-view">
            <section id="user-info">
                <div id="image"></div>
                <form>
                    <div id="pair1">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder={props.cookies.get("username")} disabled />
                    </div>
                    <div id="pair2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder={props.cookies.get("email")} disabled />
                    </div>
                </form>
            </section>
            <p>Weekly statistics</p>
            <section id="user-stats">
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
                <div id="item">
                    <p>Monday</p>
                    <p id="percentage">50%</p>
                    <div id="frame">
                        <div></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutMeView;