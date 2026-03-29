import '../css/App.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import Video from "../../video/background_video.mp4"

function Body() {
  return (
    <div className="body">
      <div className="container">
        <div className="fooldal">

          <video id="background-video" autoplay loop muted>
            <source src={Video} type="video/mp4"/>
          </video>

          <card>
            <a href="/termekek">
              <h2 style={{ textDecoration: "none" }}>TERMÉKEK</h2>
            </a>
          </card>
        </div>
      </div>
    </div>
  )
}

export default Body