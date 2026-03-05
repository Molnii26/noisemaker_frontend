import '../css/App.css'

function Body() {
  return (
    <div className="body">
      <div className="container">
        <div className="left-part">
          
        </div>

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