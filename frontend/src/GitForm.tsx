import React from 'react';
import './GitForm.css';
import {AiFillGithub} from "react-icons/ai";
import {BiWorld} from "react-icons/bi";
import {MdAttachMoney} from "react-icons/md";
import {Image} from "react-bootstrap";
import bigLogo from './Images/fullLogo.png';

// Form for signing in to github
export default function GitForm() {
    const authenticateUrl = 'http://127.0.0.1:8080/githubUser/authenticate';

  return (
    <>
        <header className="bg-dark py-5">
            <div className="container px-5">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-6">
                        <div className="text-center my-5">
                        <Image height={300} src={bigLogo} style={{position: 'relative', left: '35px'}} alt="Home page"/> GitJobs

                            <h1 className="display-5 fw-bolder text-white mb-2">Find IT jobs in Spain 🇪🇸</h1>
                            <p className="lead text-white-50 mb-4">
                                Quickly find software development job postings based in Spain that are relevant to your
                                experience and skills!
                            </p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a href={authenticateUrl} className="btn btn-primary btn-lg px-4 me-sm-3">
                                    <AiFillGithub/> Get started
                                </a>
                                <a href="#learn-more" className="btn btn-outline-light btn-lg px-4">Learn
                                    More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section className="py-5 border-bottom" id="learn-more">
            <div className="container px-5 my-5">
                <div className="row gx-5">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                            <AiFillGithub/>
                        </div>
                        <h2 className="h4 fw-bolder">Ease of use</h2>
                        <p>Connect GitJobs to your GitHub account and instantly get jobs based on your main skills.</p>
                    </div>
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                            <BiWorld/>
                        </div>
                        <h2 className="h4 fw-bolder">Local and international</h2>
                        <p>Find the best Spain-based as well as other international job postings.</p>
                    </div>
                    <div className="col-lg-4">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                            <MdAttachMoney/>
                        </div>
                        <h2 className="h4 fw-bolder">Free</h2>
                        <p>GitJobs is and will always be free thanks to our integration the job finding portal <a
                            href="https://www.infojobs.net/">Infojobs</a>.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
