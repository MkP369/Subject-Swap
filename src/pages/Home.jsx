import '../styles/Home.css'
import {useNavigate} from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            {/* Hero */}
            <section id="hero" className="home-section hero-section">
                <div className="hero-content">
                    <h1 className="hero-tagline">
                        Swap Your Strengths, <br/> Master Your Subjects
                    </h1>
                    <p className="hero-subtagline">
                        Stuck on calculus but a pro at physics? Find your perfect study partner and trade skills for
                        free. The ultimate peer-to-peer learning community is here.
                    </p>
                    <div className="hero-cta-buttons">
                        <button className="cta-button primary" onClick={() => navigate('/signup')}>Find Your Swap
                        </button>
                        <button className="cta-button secondary" onClick={() => navigate('/how-it-works')}>Learn How
                        </button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="../../public/heroImage.jpg" alt="2 students studying with each other"></img>
                </div>
            </section>

            {/* How to get started*/}
            <section id="how-it-works" className="home-section">
                <h2 className="section-title">A Smarter Way to Learn</h2>
                <p className="section-subtitle">Get started in just a few simple steps.</p>
                <div className="how-it-works-grid">
                    <div className="how-it-works-card">
                        <div className="card-number">1</div>
                        <h3>Create Your Profile</h3>
                        <p>List the subjects you excel at and set your availability and
                            preferences.</p>
                    </div>
                    <div className="how-it-works-card">
                        <div className="card-number">2</div>
                        <h3>Get Perfectly Matched</h3>
                        <p>Our smart algorithm connects you with users who have the skills you need and need the skills
                            you have.</p>
                    </div>
                    <div className="how-it-works-card">
                        <div className="card-number">3</div>
                        <h3>Connect & Collaborate</h3>
                        <p>Use our secure, real-time chat to discuss, schedule, and solve doubts. Share files and images
                            seamlessly.</p>
                    </div>
                    <div className="how-it-works-card">
                        <div className="card-number">4</div>
                        <h3>Rate & Grow</h3>
                        <p>After each swap, rate your partner and build your Karma Score. The more you help, the more
                            credible you become!</p>
                    </div>
                </div>
            </section>

            {/*Testimonials*/}
            <section id="testimonials" className="home-section testimonials-section">
                <div className="testimonial-content">
                    <h2 className="section-title">Don't Just Take Our Word For It</h2>
                    <p className="section-subtitle">See how SubjectSwap is changing the game for students.</p>
                    <div className="testimonial-card">
                        <blockquote>
                            "I was struggling with understanding C, but I'm great at Python. I found a cs student who
                            was into low level dev. It was a perfect match! 10/10 would recommend."
                        </blockquote>
                        <cite>— Ragini M., Swapped C for Python</cite>
                    </div>
                    <div className="testimonial-card">
                        <blockquote>
                            "The Karma Score is a genius feature. It makes you trust the person on the other end. I
                            helped someone with Chemistry and my score went up, felt really rewarding."
                        </blockquote>
                        <cite>— Rahul R., Swapped Chemistry for History</cite>
                    </div>
                </div>
            </section>

            ` {/*faq*/}
            <section id="faq" className="home-section">
                <h2 className="section-title">Have Questions? We Have Answers.</h2>
                <div className="faq-container">
                    <div className="faq-item">
                        <div className="faq-question">
                            <h4>Is SubjectSwap completely free to use?</h4>
                        </div>
                        <div className="faq-answer">
                            <p>Absolutely! The core principle of SubjectSwap is the free exchange of knowledge. You
                                "pay" for help with your own expertise. No hidden fees, no subscriptions.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <h4>How do I know if a user is reliable or helpful?</h4>
                        </div>
                        <div className="faq-answer">
                            <p>Two words: Karma Score. Every successful and well-rated swap boosts a user's score. Check
                                their profile for their score and read reviews from past swaps to ensure a good
                                match.</p>
                        </div>
                    </div>
                    <div className="faq-item">
                        <div className="faq-question">
                            <h4>How do I request a swap?</h4>
                        </div>
                        <div className="faq-answer">
                            <p>Easy! On your dashboard, just click on "Find a Swap" and select the subject you want to
                                master, and our smart algorithm will find a partner for you!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/*end*/}
            <section className="home-section final-cta-section">
                <h2 className="final-cta-title">Ready to Stop Struggling and Start Swapping?</h2>
                <p>Join thousands of students learning smarter, not harder.</p>
                <br/>
                <button className="cta-button primary large" onClick={() => navigate('/signup')}>Sign Up For Free
                </button>
            </section>
        </div>
    );
};
