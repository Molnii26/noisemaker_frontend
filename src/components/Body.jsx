import '../css/App.css'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js"
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.js"

function Body() {
  return (
    <div className="body">
      <div className="container">
        <div className="fooldal">
          <a href='/termekek' id='fadeInUp-animation'>
            <card className="termekek-kartya">
              TERMÉKEK
            </card>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Body