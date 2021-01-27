
import { Component } from 'react';
import Form from './component/Form';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { formData: null, limit: null, time: null, matrixArr: null, intervalSetVar:null, message:'' }
  }
  fromSubmitHandler = (data) => {
    this.setState({ formData: data, message:'' });
    this.setStateAndValues(data);
    let intervalSetVar = setInterval(() => this.setStateAndValues(data), (data.time * 1000));
    this.setState({intervalSetVar:intervalSetVar});

  }

  setStateAndValues = (data) => {
    let matrixRow = [];
    let limitArr = [];
    if (data.limit > 0) {
      for (let i = 0; i < data.limit; i++) {
        let randNum = (Math.floor(Math.random() * (data.matrix * data.matrix) + 1));
        // console.log(randNum);
        if (limitArr.includes(randNum)) {
          i--;
        } else {
          limitArr[i] = randNum;
        }
      }
      // console.log(limitArr);
    }
    if (data.matrix > 0) {
      let count = 1;
      for (let i = 0; i < data.matrix; i++) {
        let matrixCol = [];
        for (let j = 0; j < data.matrix; j++) {
          matrixCol[j] = { node: count, color: limitArr.includes(count) };
          // console.log(matrixCol)
          count += 1;
        }
        matrixRow[i] = matrixCol;
      }
      // console.log(matrixRow);
      this.setState({ matrixArr: matrixRow, time: data.time, limit: data.limit });
    }
  }

  removeBg = (nodVal, colorVal) => {
    if (colorVal) {
      // console.log(nodVal);
      let limitTemp = this.state.limit-1;
      let matrixCopy = this.state.matrixArr;
      let updateMatrix = matrixCopy.map((item) => {
        return item.map((colItem) => {
          if (colItem.node === nodVal) {
            // console.log('in')
            return { node: nodVal, color: false }
          } else {
            return colItem;
          }
        })
      });
      let message ='';
      console.log(limitTemp);
      if(limitTemp<1){
        console.log('inside');
        message ='You Won..!!';
        clearInterval(this.state.intervalSetVar);
      }
      this.setState({ matrixArr: updateMatrix, limit:limitTemp, message });
      // console.log(updateMatrix);
    }

  }

  generateMatrix = () => {
    return this.state.matrixArr ?
      this.state.matrixArr.map((item, rowIndex) => (
        <div className="row justify-content-md-center" key={rowIndex}>
          <div className="btn-group">
            {
              item.map((col) => (
                <button type="button" key={col.node} onClick={() => this.removeBg(col.node, col.color)} className={`btn btn-default col-md-3 border rounded-0 ${col.color ? 'bg-danger' : ''}`}>&nbsp;</button>

              ))
            }
          </div>
        </div>
      ))
      : null;
  }
  render() {
    return (
      <>
        <div className="container">
          <h1>My App</h1>
        </div>
        <Form fromSubmitHandler={this.fromSubmitHandler} intervalSet ={ this.state.intervalSetVar }/>
        <div className="container">
          <hr />
          {this.generateMatrix()}
          <hr />
          { this.state.message?this.state.message:null }

        </div>
      </>
    );
  }
}

export default App;
