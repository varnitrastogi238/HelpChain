import React, { Component } from 'react';
import Identicon from 'identicon.js';

const maintip=0

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
        <h3> &nbsp;&nbsp; Welcome to HelpChain. A blockchain based platform where users can upload Images along with description and asks &nbsp;&nbsp;for funding. Don't worry everything is decentralised even your imgaes YES! They are stored in ipfs and money is &nbsp;&nbsp; &nbsp;&nbsp;directly credited to your account without any centralize authority.  </h3>

          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
              <h4>If you want to FUND then enter the amount in Ethers and then click on FUND ME of any story.</h4>
              <input
                id="tip"
                type="text"
                ref={(input) => { this.tip= input}}
                className="form-control"
                placeholder="Enter Amount In Ethers "
                required />
                <h6>IF YOU DO NOT ENTER ANYTHING THEN 0.1 ETHER WILL BE FUNDED AS DEFAULT</h6>
            </div>
          </main>
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Your Story With Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                this.props.uploadImage(description)
              }} >
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                <div className="form-group mr-sm-2">
                  <br></br>
                  <input
                    id="imageDescription"
                    type="text"
                    ref={(input) => { this.imageDescription = input }}
                    className="form-control"
                    placeholder="Image description..."
                    required />
                </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
              <p>&nbsp;</p>
              {this.props.images.map((image, key) => {
                return (
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                      />
                      <small className="text-muted">{image.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p class="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px' }} /></p>
                        <p>{image.description}</p>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TOTAL FUND RAISED: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                        </small>
                          <br/>
                          <button className="btn btn-link btn-sm float-right pt-0"
                          name={image.id}
                          onClick={(event) => {
                            var tipp = document.getElementById("tip").value;
                            if(tipp==''){
                              tipp=0.1
                            }
                            let tipAmount = window.web3.utils.toWei(tipp.toString(), 'Ether')
                            console.log(tipp,"hiii")
                            console.log(event.target.name, tipAmount)
                            this.props.tipImageOwner(event.target.name, tipAmount)
                          }} 
                          class="btn btn-primary btn-block btn-lg">FUND ME</button>
                         
              
                       
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;