import '../css/App.css'
import kep1 from '../../images/piano-bckgrnd.jpg'
import kep2 from '../../images/piano.jpg'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

function Body() {
  return (
    <div className="body">
      <div className="container">
        <div className="left-part">
          <div id="carouselExampleIndicators" className="carousel-slide" data-bs-ride="carousel">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="carousel-img" src={kep1} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="carousel-img" src={kep2} alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="carousel-img" src={kep1} alt="Third slide" />
              </div>
            </div>
          </div>
        </div>

        {/* *************************************************************************************************************************************************** */}

        <div className="right-part">

          <navbar className="navbar-right">
            <h1 className="navbar-cim">Hangszerek</h1>

            <card>
              <a href="/termekek">
                <h2>TERMÉKEK</h2>
              </a>
            </card>
          </navbar>
        </div>
      </div>
    </div>
  )
}

export default Body