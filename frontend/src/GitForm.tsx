import React from 'react';
import './GitForm.css';
import {AiFillGithub} from "react-icons/ai";
import {Link} from "react-router-dom";

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
                            <h1 className="display-5 fw-bolder text-white mb-2">Find IT jobs in Spain 🇪🇸</h1>
                            <p className="lead text-white-50 mb-4">
                                Quickly find software development job postings based in Spain that are relevant to your
                                experience and skills!
                            </p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                <a href={authenticateUrl} className="btn btn-primary btn-lg px-4 me-sm-3">
                                    <AiFillGithub/> Get started
                                </a>
                                <Link to="learn-more" className="btn btn-outline-light btn-lg px-4" href="#!">Learn
                                    More</Link>
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
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    <div className="col-lg-4">
                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"></div>
                        <h2 className="h4 fw-bolder">Featured title</h2>
                        <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another
                            sentence and probably just keep going until we run out of words.</p>
                        <a className="text-decoration-none" href="#!">
                            Call to action
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
