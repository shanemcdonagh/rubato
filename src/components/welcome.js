import React, { Component } from "react";

class Welcome extends Component {

    render() {
        return (
            <div className="welcome" style={{background: "linear-gradient(rgba(47, 23, 15, 0.65), rgba(47, 23, 15, 0.65)), url('assets/img/music-background.jpg')"}}>
                <br/>
                <h1 className="text-center text-white d-none d-lg-block site-heading"><span className="site-heading-upper mb-3" style={{ color: '#FF4700' }}>THE MUSIC APP FOR ALL YOUR LISTENING NEEDS</span><span className="site-heading-lower">RUBATO</span></h1>
                <section className="page-section clearfix" style={{backgroundColor: "#282c34"}}>
                    <div className="container">
                        <div className="intro"><img className="img-fluid intro-img mb-3 mb-lg-0 rounded" src="assets/img/simplelogo.png" width={972} height={972} />
                            <div className="text-center intro-text p-5 rounded bg-faded" style={{background: 'white', color: 'black'}}>
                                <h2 className="section-heading mb-4"><span className="section-heading-upper">MUSIC </span><span className="section-heading-lower">WORTH LISTENING TO</span></h2>
                                <p className="mb-3" style={{ fontFamily: 'Raleway, sans-serif' }}><br />Rubato is a <strong>web-based social networking service</strong> for users to <br />track, review, and share music. Rubato can be used as a diary, to track/review albums you've been listening to, or even as a way to list your favorite albums and artists. Either way, Rubato is the place for you!<br /><br /></p>
                                <div className="mx-auto intro-button">
                                <a className="btn btn-primary d-inline-block mx-auto btn-xl" role="button" href="/register" style={{ background: '#FF4700', fontFamily: 'Raleway, sans-serif' }}>Begin listening</a></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="cta" style={{ background: 'rgba(255,80,0,0.41)' }}>
                    <section className="py-4 py-xl-5">
                        <div className="container">
                            <div className="row mb-5">
                                <div className="col-md-8 col-xl-6 text-center mx-auto">
                                    <h2 style={{ color: 'var(--bs-white)' }}>DISCOVER NEW MUSIC</h2>
                                    <p style={{ color: 'var(--bs-white)', fontFamily: 'Raleway, sans-serif' }}>Whether discovering new music and artists, or re-visiting albums which you want to explore once more, keeping track of all your listening has never been easier</p>
                                </div>
                            </div>
                            <div className="row gx-2 gy-2 row-cols-1 row-cols-md-2 row-cols-xl-3" data-bss-baguettebox>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://upload.wikimedia.org/wikipedia/en/2/23/Phoebe_Bridgers_Punisher_%282020%29.png" width={346} height={346} /></a></div>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://media.pitchfork.com/photos/61649694110e7cd222907396/1:1/w_600/Black-Country-New-Road.jpg" width={346} height={346} /></a></div>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png" width={350} height={350} /></a></div>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://upload.wikimedia.org/wikipedia/en/3/3f/Katebushhoundsoflove.png" width={342} height={342} /></a></div>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://beatsperminute.com/wp-content/uploads/2020/11/ichiko-aoba-windswept-adan.jpg" width={346} height={346} /></a></div>
                                <div className="col"><a href="https://cdn.bootstrapstudio.io/placeholders/1400x800.png"><img className="img-fluid" src="https://media.pitchfork.com/photos/627c1023d3c744a67a846260/master/w_1280%2Cc_limit/Kendrick-Lamar-Mr-Morale-And-The-Big-Steppers.jpg" width={348} height={348} /></a></div>
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        );

    }
}

// Export for use in App.js
export default Welcome;
